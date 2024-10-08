let adsLoaded = false
let adDisplayContainer
let adsLoader
let adsManager
let timeLeftAds = 6
window.timeLeftAds = timeLeftAds
let intervalId // Add this line to store the interval ID

export function initializeIMA(video, videoAd, adContainer, btnSkipAd, textSkipAd, iconSkipAd, adTagUrl, onError) {
  if(!window.google?.ima) {
    onError({ errorCode: 410, errorMessage: 'user using adblock!' })
    return
  }
  console.log("initializing IMA")

  adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoAd)
  adsLoader = new google.ima.AdsLoader(adDisplayContainer)

  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  )
  adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false
  )

  video.addEventListener("ended", function () {
    adsLoader?.contentComplete()
  })

  let adsRequest = new google.ima.AdsRequest()
  adsRequest.adTagUrl = adTagUrl

  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = video.clientWidth
  adsRequest.linearAdSlotHeight = video.clientHeight
  adsRequest.nonLinearAdSlotWidth = video.clientWidth
  adsRequest.nonLinearAdSlotHeight = video.clientHeight / 3

  // Pass the request to the adsLoader to request ads
  adsLoader.requestAds(adsRequest)

  function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Instantiate the AdsManager from the adsLoader response and pass it the video element
    adsManager = adsManagerLoadedEvent.getAdsManager(videoAd)
    adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError
    )

    adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested
    )
    adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested
    )
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdLoaded)
  }

  function onAdError(adErrorEvent) {
    // Handle the error logging.
    let error = adErrorEvent.getError()
    console.log(error)
    
    if (error.j?.errorCode == 1005) {
        onError({ errorCode: 410, errorMessage: 'user using adblock!' })
    }

    destroyAdsManager()
  }

  function onContentPauseRequested() {
    adContainer.classList.remove("hide")
    videoAd.classList.remove("hide")

    clearInterval(intervalId) // Clear the previous interval if it exists
    intervalId = setInterval(() => { // Store the new interval ID
      window.timeLeftAds = window.timeLeftAds - 1
      textSkipAd.innerText = window.timeLeftAds
        ? `Bỏ qua quảng cáo trong (${window.timeLeftAds}s)`
        : `Bỏ qua quảng cáo`

      btnSkipAd.classList.remove("hide")

      if (window.timeLeftAds <= 0) {
        window.timeLeftAds = 0
        clearInterval(intervalId) // Clear the interval when it reaches 0
        btnSkipAd.addEventListener("click", onContentResumeRequested)
        btnSkipAd.style.cursor = "pointer"
        btnSkipAd.classList.add("active")
        iconSkipAd.classList.remove("hide")
      }
    }, 1000)

    video.pause()
  }

  function onContentResumeRequested() {
    console.log("end ads")
    adsManager?.destroy()
    adContainer.classList.add("hide")
    videoAd.classList.add("hide")
    btnSkipAd.classList.add("hide")
    btnSkipAd.classList.remove("active")
    iconSkipAd.classList.add("hide")
    video.play()
  }

  function onAdLoaded(adEvent) {
    let ad = adEvent.getAd()
    if (!ad.isLinear()) {
      video.play()
    }
  }
}

export function loadAds(videoContainer, videoAd) {
  if(!window.google?.ima) return
  // Prevent this function from running on if there are already ads loaded
  if (adsLoaded) {
    return
  }
  adsLoaded = true

  // Prevent triggering immediate playback when ads are loading
  // event.preventDefault()

  console.log("loading ads")

  videoAd.load()
  adDisplayContainer?.initialize()

  let width = video.clientWidth
  let height = video.clientHeight
  try {
    adsManager.init(width, height, google.ima.ViewMode.NORMAL)
    adsManager.start()
  } catch (adError) {
    // Play the video without ads, if an error occurs
    console.log("AdsManager could not be started")
  }
}

export function destroyAdsManager() {
  console.log('destroy ad manager')
  clearInterval(intervalId) // Clear the interval when destroying the ads manager
  adsManager?.destroy()
  adsManager = null
  adsLoaded = false
  adDisplayContainer = null
  adsLoader = null
  adsManager = null
  window.timeLeftAds = 6
  window.adContainer.remove()
}