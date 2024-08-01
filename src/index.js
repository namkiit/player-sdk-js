import { 
  checkTypeLink, 
  destroyShaka, 
  detectIOS16Above, 
  mobileCheck, 
  safariCheck, 
  setStyles 
} from "./js/utils/helpers"
import "./css/index.css"
import onPlayerShaka from "./js/onPlayerShaka"
import onPlayerFairplay from "./js/onPlayerFairplay"
import { destroyAdsManager, initializeIMA, loadAds } from "./js/handleAds"
import { callFingerprintAPI } from "./js/handleFingerprint"
import { iconSkipAd } from "./assets/icons"
import { renderUIAndEventListeners } from "./js/renderUI"

export class PlayerSDK {
  constructor(container, options, cbError) {
    this.container = container
    this.options = options
    this.cbError = cbError
  }

  initialize() {
    let { isLive, allowTimeshift, isAdOn, adTagUrl, volume, contentId, name, startTime } = this.options
    let isMobile = mobileCheck()
    let isFullscreen = false
    let isIpad = /(iPad)/g.test(navigator.userAgent)
    let isSafari = safariCheck()
    let isLiveTime = true
    let isIOS16Above = detectIOS16Above()
    if (isIOS16Above) volume = 0 // fix player infinite loading when not set volume to 0 IOS 16 and above

    setStyles(container, {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "0.5rem",
      overflow: "hidden",
      aspectRatio: "16/9",
    })

    const {
      video,
      videoAd,
      adContainer,
      btnSkipAd,
      textSkipAd,
      fingerprints
    } = renderUIAndEventListeners(
      this.container, 
      volume, 
      isMobile, 
      name, 
      startTime, 
      isLive, 
      isSafari, 
      isLiveTime, 
      isFullscreen, 
      isIpad, 
      allowTimeshift,
    )

    window.isFocusVideo = false
    window.volume = volume
    window.showViews = this.showViews
    window.removeFocusVideo = this.removeFocusVideo
    window.focusVideo = this.focusVideo
    window.preloadInteractiveVideo = this.preloadInteractiveVideo
    window.showInteractiveVideo = this.showInteractiveVideo
    window.hideInteractiveVideo = this.hideInteractiveVideo
    window.options = this.options
    window.cbError = this.cbError

    const onError = (error) => {
      this.cbError(error)
    }

    const onReloadLinkPlayBackup = () => {
      // code handle reload link backup

      // if src === undefined
      onError({ errorCode: 400, errorMessage: 'link error!' })
    }

    // Initialize IMA sdk  
    if (isAdOn) {
      const loadAdsEvent = () => {
        if (video.readyState >= 3) loadAds(this.container, videoAd)
      }

      video.addEventListener('loadeddata', loadAdsEvent)
      window.loadAdsEvent = loadAdsEvent
      initializeIMA(video, videoAd, adContainer, btnSkipAd, textSkipAd, iconSkipAd, adTagUrl, onError)
    }

    const type = checkTypeLink(this.options.src)
    switch (type) {
      case "dash":
        onPlayerShaka(video, this.options, onError)
        break
      case "m3u8":
        (this.options.drm && isSafari) ? onPlayerFairplay(video, this.options, onError) : onPlayerShaka(video, this.options, onError)
        break
      default:
        onReloadLinkPlayBackup()
    }

    // Call API check fingerprint
    if (isLive && this.options.drm) {
      callFingerprintAPI(contentId, this.options.signKey, fingerprints, onError)
    }

    // Event listeners for interactive
    window.addEventListener('interactive', this.interactive)

    const verSdk = "ver.5.3.0"
    console.log(verSdk)
  }

  destroy() {
    window.videoWrapper.remove()
    window.fingerprints.forEach(fingerprint => {
      fingerprint.remove()
    })

    clearTimeout(window.fingerprintTimeout)
    destroyShaka()
    destroyAdsManager()
    window.adContainer.remove()
    document.querySelectorAll('.skip__ad')?.forEach((btn) => btn.remove())
    window.video.removeEventListener("loadeddata", window.loadAdsEvent)
    window.video.removeEventListener("timeupdate", window.handleTimeUpdateVideo)
    window.removeEventListener('interactive', this.interactive, false)
    document.removeEventListener('keydown', window.handleKeyBoard)
  }

  showViews(realViews, minViews) {
    window.videoWrapper.appendChild(window.viewCount)

    if (minViews || minViews == 0) window.views.innerText = realViews > minViews ? realViews.toString() : minViews.toString()

    if (realViews >= 1000) {
      const thousands = Math.floor(realViews / 1000)
      const remainder = Math.floor((realViews % 1000) / 100)
      const roundedDecimal = Math.floor((realViews % 100) / 10)

      if (roundedDecimal >= 5) {
        window.views.innerText = `${thousands}.${remainder + 1}K`
      } else {
        window.views.innerText = `${thousands}.${remainder}K`
      }
    } else {
      window.views.innerText = realViews > 100 ? realViews.toString() : '100'
    }
  }

  removeFocusVideo() {
    window.controllerWrapper.classList.add("hide")
    container.removeEventListener("mousemove", window.handleHideController)
    container.removeEventListener("mousedown", window.handleHideController)
    container.removeEventListener("mouseleave", window.handleHideController)
    window.video.removeEventListener("pause", window.handleShowController)
    window.isFocusVideo = false
    console.log('remove focus')
  }

  focusVideo() {
    window.controllerWrapper.classList.remove("hide")
    container.addEventListener("mousemove", window.handleHideController)
    container.addEventListener("mousedown", window.handleHideController)
    window.video.addEventListener("pause", window.handleShowController)
    this.container.addEventListener("mouseleave", window.handleHideController)
    window.isFocusVideo = true
    console.log('add focus')
  }

  isFocusVideo() {
    return window.isFocusVideo
  }

  toggleSeekbar() {
    window.progressBar.classList.toggle("hide")
  }
}