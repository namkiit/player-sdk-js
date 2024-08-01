import { checkTypeLink, debounce, destroyShaka, detectIOS16Above, getCurrentTimeAndDate, mobileCheck, preventDefaultForSpace, safariCheck, setAttributes, setClass, setStyles } from "./js/utils/helpers"
import "./css/index.css"
import onPlayerShaka from "./js/onPlayerShaka"
import onPlayerFairplay from "./js/onPlayerFairplay"
import { handleVolumeSliderUpdate, togglePlay, handleProgress, handleForwardVideo, handleRewindVideo } from "./js/handlePlayer"
import { formatTimeVideo, formatTimeEvents, convertPercentageToTimeSeeked } from "./js/formatTime"
import { destroyAdsManager, initializeIMA, loadAds } from "./js/handleAds"
import { callFingerprintAPI } from "./js/handleFingerprint"
import { iconEye, iconForward, iconFullscreen, iconLive, iconMinimize, iconMultiAudio, iconMultiQuality, iconMuted, iconPause, iconPauseBig, iconPlay, iconPlay2, iconPlayBig, iconReplay, iconReplayBig, iconRewind, iconSkipAd, iconVolume, iconGoToLive } from "./assets/icons"

export class PlayerSDK {
  constructor(container, options, cbError, cbFs, cbExitFs) {
    this.container = container
    this.options = options
    this.cbError = cbError
    this.cbFs = cbFs
    this.cbExitFs = cbExitFs
  }

  initialize() {
    window.options = this.options
    window.cbError = this.cbError
    let { isLive, allowTimeshift, isAdOn, adTagUrl, volume, contentId } = this.options
    let isMobile = mobileCheck()
    let isFullscreen = false
    let isIpad = /(iPad)/g.test(navigator.userAgent)
    let isSafari = safariCheck()
    let isLiveTime = true
    let oldSeekValue = null


    let isIOS16Above = detectIOS16Above()
    if (isIOS16Above) volume = 0 //fix player infinite loading when not set volume to 0 IOS 16 and above

    setStyles(container, {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderRadius: "0.5rem",
      overflow: "hidden",
      aspectRatio: "16/9",
    })

    const videoWrapper = document.createElement("div")
    setClass(videoWrapper, "video__wrapper")
    const video = document.createElement("video")
    setClass(video, "main__video")
    const video2 = document.createElement("video")
    setClass(video2, "ads__video hide")
    window.volume = volume
    video.volume = volume
    volume === 0 ? video.muted = true : video.muted = false
    video.setAttribute("playsinline", true)

    video.addEventListener("click", () => {
      if (isMobile) {
        controllerWrapper.classList.toggle("hide")
        window.viewCount.classList.toggle("hide")
        if (document.fullscreenElement || document.webkitFullscreenElement) titleWrapper.classList.toggle("hide")
      } else togglePlay(video, isLive, iconWrapper, iconInner, iconPlayBig, iconPauseBig)
    })

    const handleTimeUpdateVideo = () => {
      handleProgress(video, progressBar, iconPlay, iconPause, iconReplay, iconLive, iconGoToLive, textGoToLive, mask, isLive, isLiveTime, isMobile)
      formatTimeVideo(video, timerVideo)
      loadingMask.classList.add("hide")
      btnPlayCenter.classList.remove("hide")
    }
    video.addEventListener('timeupdate', handleTimeUpdateVideo)

    video.addEventListener("waiting", () => {
      loadingMask.classList.remove("hide")
      btnPlayCenter.classList.add("hide")
    })

    video.addEventListener("seeking", () => {
      loadingMask.classList.remove("hide")
      btnPlayCenter.classList.add("hide")
    })

    video.addEventListener("seeked", () => {
      loadingMask.classList.add("hide")
      btnPlayCenter.classList.remove("hide")
    })

    video.addEventListener('playing', () => {
      loadingMask.classList.add("hide")
      loadingMask.classList.add("transparent")
      mask.classList.add("hide")
      btnPlayCenter.classList.remove("hide")
      playCenterMask.classList.add("hide")
    })

    let timeout
    window.timeout = timeout

    const handleHideController = (event) => {
      if (event.type === 'mousedown' && (video.paused || isMobile)) return
      controllerWrapper.classList.remove("hide")
      if (isLive) window.viewCount.classList.add("hide")
      if (document.fullscreenElement || document.webkitFullScreenElement) titleWrapper.classList.remove("hide")

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        controllerWrapper.classList.add("hide")
        divSwitchTrack.classList.add("hide")
        divSwitchQuality.classList.add("hide")
        tooltip.style.visibility = "hidden"
        if (isLive) window.viewCount.classList.remove("hide")
        if (document.fullscreenElement || document.webkitFullscreenElement) titleWrapper.classList.add("hide")
      }, 3000)
    }

    this.container.addEventListener("mousemove", handleHideController)
    this.container.addEventListener("mousedown", handleHideController)
    this.container.addEventListener("mouseleave", handleHideController)

    const handleShowController = () => {
      if (isMobile) return
      clearTimeout(timeout)
      controllerWrapper.classList.remove("hide")
      if (isLive) window.viewCount.classList.add("hide")
      if (document.fullscreenElement || document.webkitFullScreenElement) titleWrapper.classList.remove("hide")
    }

    video.addEventListener("pause", handleShowController)

    const titleWrapper = document.createElement("div")
    setClass(titleWrapper, "title__wrapper hide")
    const titleInner = document.createElement("div")
    setClass(titleInner, `title__inner ${isMobile ? "mobile" : ""}`)
    const title = document.createElement("div")
    setClass(title, `title ${isMobile ? "mobile" : ""}`)
    title.innerHTML = this.options.name
    const date = document.createElement("div")
    setClass(date, `date ${isMobile ? "mobile" : ""}`)
    date.innerHTML = formatTimeEvents(this.options.startTime)

    titleInner.append(title, date)
    titleWrapper.appendChild(titleInner)

    const controllerWrapper = document.createElement('div')
    setClass(controllerWrapper, "controls__wrapper hide")
    const controller = document.createElement('div')
    setClass(controller, "controls")
    controllerWrapper.appendChild(controller)

    const iconWrapper = document.createElement("div")
    setClass(iconWrapper, `icon__wrapper ${isMobile ? "mobile" : ""}`)
    const iconInner = document.createElement("div")
    setClass(iconInner, `icon__inner ${isMobile ? "mobile" : ""}`)
    iconWrapper.appendChild(iconInner)

    const mask = document.createElement("div")
    setClass(mask, "mask hide")
    mask.appendChild(iconReplayBig)

    const loadingMask = document.createElement("div")
    setClass(loadingMask, "loading__mask hide")
    const loadingSpinner = document.createElement("div")
    setClass(loadingSpinner, `loading__spinner ${isMobile ? "mobile" : ""}`)
    loadingMask.appendChild(loadingSpinner)

    iconReplayBig.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      video.play()
    })

    const progressWrapper = document.createElement("div")
    setClass(progressWrapper, "progress__wrapper")

    const progressBar = document.createElement("input")
    setClass(progressBar, `progress__bar ${isLive ? "live" : ""} ${isLive ? (allowTimeshift ? "" : "disable_mouse") : ""}`)
    setAttributes(progressBar, {
      type: "range",
      name: "volume",
      min: "0",
      max: "100",
      step: "any",
      value: `${isLive ? 100 : 0}`,
    })
    progressWrapper.appendChild(progressBar)

    progressBar.addEventListener("input", (e) => {
      const durationTimeshiftTotal = 1 // 1 hour

      e.stopPropagation()
      e.preventDefault()

      let min = progressBar.min
      let max = progressBar.max
      let val = progressBar.value

      if (isLive && allowTimeshift) {
        //handle timeshift livevideo
        progressBar.style.setProperty("--progress-percent", (100 - ((val - min) * 100) / (max - min)))
        const shiftedTime = oldSeekValue ? (val > oldSeekValue ? video.currentTime + ((val - oldSeekValue) * durationTimeshiftTotal * 3600 / 100) : video.currentTime - ((oldSeekValue - val) * durationTimeshiftTotal * 3600 / 100)) : video.currentTime - ((100 - val) * durationTimeshiftTotal * 3600 / 100)
        video.currentTime = shiftedTime > 0 ? shiftedTime : 0
        isLiveTime = val == 100
        isLiveTime ? btnLive.classList.add("disable_mouse") : btnLive.classList.remove("disable_mouse")
        handleProgress(video, progressBar, iconPlay, iconPause, iconReplay, iconLive, iconGoToLive, textGoToLive, mask, isLive, isLiveTime, isMobile)
      } else {
        progressBar.style.setProperty("--progress-percent", ((val - min) * 100) / (max - min))
        video.currentTime = (val * video.duration) / 100
      }

      oldSeekValue = val
    })
    progressBar.setAttribute('tabindex', '-1')
    progressBar.addEventListener('keydown', (e) => e.preventDefault())
    progressBar.addEventListener('focus', (e) => progressBar.blur())

    const tooltip = document.createElement('div')
    setClass(tooltip, 'tooltip')
    videoWrapper.appendChild(tooltip)

    if (isLive && allowTimeshift) {
      progressBar.addEventListener("mousemove", (e) => {
        let valueHover = ((e.offsetX / e.target.clientWidth) * parseInt(e.target.getAttribute('max'), 10))
        valueHover = convertPercentageToTimeSeeked(valueHover)

        tooltip.style.visibility = "visible"
        tooltip.style.top = progressBar.getBoundingClientRect().top - 45 + "px";
        tooltip.style.left = e.clientX + "px";
        tooltip.innerHTML = valueHover
      })

      progressBar.addEventListener("mouseout", (e) => {
        tooltip.style.visibility = "hidden"
      })
    }

    const controllerBtns = document.createElement("div")
    setClass(controllerBtns, "control__btns")
    const leftSideBtns = document.createElement("div")
    setClass(leftSideBtns, `control__btns__leftside ${isLive ? "live" : ""} ${isMobile ? "mobile" : ""}`)
    const rightSideBtns = document.createElement("div")
    setClass(rightSideBtns, "control__btns__rightside")

    const btnPlay = document.createElement('div')
    setClass(btnPlay, `button ${isMobile ? "mobile" : ""}`)
    iconPause.setAttribute("class", "hide")
    iconReplay.setAttribute("class", "hide")
    btnPlay.append(iconPlay, iconPause, iconReplay)

    btnPlay.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      togglePlay(video, isLive, iconWrapper, iconInner, iconPlayBig, iconPauseBig)
    })

    const btnRewind = document.createElement('div')
    setClass(btnRewind, `button ${isLive ? 'hide' : ''} ${isMobile ? "mobile" : ""}`)
    btnRewind.appendChild(iconRewind)

    btnRewind.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      video.currentTime = video.currentTime - 10
    })

    const btnForward = document.createElement('div')
    setClass(btnForward, `button ${isLive ? 'hide' : ''} ${isMobile ? "mobile" : ""}`)
    btnForward.appendChild(iconForward)

    btnForward.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      video.currentTime = video.currentTime + 10
    })

    const clonedIconRewind = iconRewind.cloneNode(true)
    const clonedIconForward = iconForward.cloneNode(true)
    clonedIconRewind.setAttribute('class', `icon__rewind ${isMobile ? "mobile" : ""} hide`)
    clonedIconForward.setAttribute('class', `icon__forward ${isMobile ? "mobile" : ""} hide`)
    videoWrapper.append(clonedIconRewind, clonedIconForward)
    const handleKeyBoard = debounce((e) => {
      e.preventDefault()
      switch (e.keyCode) {
        case 32: // spacebar
          togglePlay(video, isLive, iconWrapper, iconInner, iconPlayBig, iconPauseBig)
          break
        case 37: // left arrow
          handleRewindVideo(video, clonedIconRewind)
          break
        case 39: // right arrow
          handleForwardVideo(video, clonedIconForward)
          break
        default:
      }
    }, 100)

    if (!isLive) {
      document.addEventListener("keydown", handleKeyBoard)
      document.addEventListener("keydown", preventDefaultForSpace)
      document.addEventListener("keypress", preventDefaultForSpace)
      document.addEventListener("keyup", preventDefaultForSpace)
    }

    const volumeWrapper = document.createElement("div")
    setClass(volumeWrapper, "volume__wrapper")

    const btnVolume = document.createElement('div')
    setClass(btnVolume, `button toggle__volume ${isMobile ? "mobile" : ""}`)
    btnVolume.append(iconVolume, iconMuted)
    iconVolume.setAttribute("class", `${video.muted ? 'hide' : ''} `)
    iconMuted.setAttribute("class", `${video.muted ? '' : 'hide'}`)
    volumeWrapper.appendChild(btnVolume)

    const sliderVolume = document.createElement('input')
    setClass(sliderVolume, `control__volume__slider ${isLive ? 'live' : ''}`)
    setAttributes(sliderVolume, {
      type: "range",
      name: "volume",
      min: "0",
      max: "1",
      step: "0.05",
      value: `${volume}`,
    })
    sliderVolume.style.setProperty("--volume", volume)
    volumeWrapper.appendChild(sliderVolume)

    sliderVolume.addEventListener("input", (e) => {
      let min = sliderVolume.min
      let max = sliderVolume.max
      let val = sliderVolume.value

      sliderVolume.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'

      video.muted = false
      handleVolumeSliderUpdate(e, video, iconVolume, iconMuted)
    })

    volumeWrapper.addEventListener("mouseover", () => {
      setStyles(sliderVolume, {
        width: "5rem",
        transform: "scaleX(1)"
      })
    })
    volumeWrapper.addEventListener("mouseout", () => {
      setStyles(sliderVolume, {
        width: "0.0001px",
        transform: "scaleX(0)"
      })
    })

    btnVolume.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      let oldVolume = video.volume

      if (video.muted === true) {
        if (oldVolume == 0) {
          sliderVolume.value = 0.4
          video.volume = 0.4
        } else sliderVolume.value = oldVolume
        sliderVolume.style.backgroundSize = sliderVolume.value * 100 + '% 100%'
        video.muted = false
        window.volume = sliderVolume.value
        iconVolume.classList.remove("hide")
        iconMuted.classList.add("hide")
      } else {
        sliderVolume.value = 0
        sliderVolume.style.backgroundSize = "0% 100%"
        video.muted = true
        window.volume = 0
        iconVolume.classList.add("hide")
        iconMuted.classList.remove("hide")
      }
    })

    const timerVideo = document.createElement("div")
    setClass(timerVideo, `video__timer ${isLive ? "hide" : ""} ${isMobile ? "mobile" : ""}`)

    const btnLive = document.createElement("div")
    setClass(btnLive, `button__live disable_mouse ${isLive ? "" : "hide"}`)
    const textGoToLive = document.createElement("div")
    textGoToLive.innerText = "Tới trực tiếp"
    btnLive.append(iconLive, iconGoToLive, textGoToLive)

    // handle go to live time
    btnLive.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      e.preventDefault()

      if (!isLiveTime && allowTimeshift) {
        if (video.duration - video.currentTime > 20) video.currentTime = video.duration
        progressBar.style.setProperty("--progress-percent", 0)
        progressBar.value = 100
        isLiveTime = true
        btnLive.classList.add("disable_mouse")
      }
    })

    const btnMultiAudio = document.createElement("div")
    setClass(btnMultiAudio, "button switch__track hide")
    btnMultiAudio.appendChild(iconMultiAudio)
    rightSideBtns.appendChild(btnMultiAudio)

    const divSwitchTrack = document.createElement("div")
    const titleSwitchTrack = document.createElement("div")
    setClass(titleSwitchTrack, "title__switch_track")
    titleSwitchTrack.innerText = "Lựa chọn âm thanh"
    divSwitchTrack.appendChild(titleSwitchTrack)
    setClass(divSwitchTrack, "div__track hide")
    rightSideBtns.appendChild(divSwitchTrack)

    btnMultiAudio.addEventListener("click", (e) => {
      e.stopPropagation()
      e.preventDefault()
      divSwitchTrack.classList.toggle("hide")
    })

    const btnMultiQuality = document.createElement("div")
    setClass(btnMultiQuality, "button switch__quality hide")
    btnMultiQuality.appendChild(iconMultiQuality)
    rightSideBtns.appendChild(btnMultiQuality) 

    const divSwitchQuality = document.createElement("div")
    const titleSwitchQuality = document.createElement("div")
    setClass(titleSwitchQuality, "title__switch_quality")
    titleSwitchQuality.innerText = "Lựa chọn chất lượng"
    divSwitchQuality.appendChild(titleSwitchQuality)
    setClass(divSwitchQuality, "div__quality hide")
    rightSideBtns.appendChild(divSwitchQuality) 

    btnMultiQuality.addEventListener("mousedown", (e) => {
      e.stopPropagation()
      e.preventDefault()
      divSwitchQuality.classList.toggle("hide")
    })

    const btnFullscreen = document.createElement("div")
    setClass(btnFullscreen, `button toggle ${isMobile ? "mobile" : ""}`)
    iconMinimize.setAttribute("class", "hide")
    btnFullscreen.append(iconFullscreen, iconMinimize)
    rightSideBtns.appendChild(btnFullscreen)

    btnFullscreen.addEventListener("mousedown", (e) => {
      let noHLS = video.getAttribute('playsinline')
      e.stopPropagation()

      if (noHLS && this.cbFs) {
        isFullscreen ? exitFakeFullScreen() : fakeFullScreen()
      } else {
        if (document.fullscreenElement) document.exitFullscreen()
        else if (document.webkitFullscreenElement) document.webkitExitFullscreen()
        else {
          isSafari ? isIpad ? this.container.webkitEnterFullscreen() : video.webkitEnterFullscreen() : this.container.requestFullscreen()
        }
      }
    })

    if (isSafari) {
      document.onwebkitfullscreenchange = () => {
        document.webkitFullScreenElement ? isFullscreen = true : isFullscreen = false
        iconMinimize.classList.toggle("hide", !document.webkitFullscreenElement)
        iconFullscreen.classList.toggle("hide", document.webkitFullscreenElement)
        titleWrapper.classList.toggle("hide", !document.webkitFullscreenElement)
      }
    } else {
      document.onfullscreenchange = () => {
        document.fullscreenElement ? isFullscreen = true : isFullscreen = false
        iconMinimize.classList.toggle("hide", !document.fullscreenElement)
        iconFullscreen.classList.toggle("hide", document.fullscreenElement)
        titleWrapper.classList.toggle("hide", !document.fullscreenElement)
      }
    }

    const viewCount = document.createElement("div")
    setClass(viewCount, "view__count")
    const views = document.createElement("div")
    setClass(views, "views")
    viewCount.append(iconEye, views)

    const adContainer = document.createElement("div")
    setClass(adContainer, "ad__container")

    const playCenterMask = document.createElement("div")
    setClass(playCenterMask, "play__mask")
    const btnPlayCenter = document.createElement("div")
    setClass(btnPlayCenter, "button play__center")
    btnPlayCenter.appendChild(iconPlay2)
    btnPlayCenter.onclick = () => {
      playCenterMask.classList.add("hide")
      video.currentTime = 0
      video.play()
    }
    playCenterMask.appendChild(btnPlayCenter)

    const btnSkipAd = document.createElement("div")
    setClass(btnSkipAd, "skip__ad hide")
    const textSkipAd = document.createElement("p")
    setClass(textSkipAd, "skip__text")
    iconSkipAd.setAttribute("class", "hide")
    btnSkipAd.append(textSkipAd, iconSkipAd)
    this.container.appendChild(btnSkipAd)

    let fpPos1, fpPos2, fpPos3, fpPos4, fpPos5, fpPos6, fpPos7, fpPos8, fpPos9
    let fingerprints = [fpPos1, fpPos2, fpPos3, fpPos4, fpPos5, fpPos6, fpPos7, fpPos8, fpPos9]
    fingerprints = fingerprints.map((fingerprint, index) => {
      fingerprint = document.createElement('div')
      setClass(fingerprint, `fingerprint pos-${index + 1} hide`)
      this.container.appendChild(fingerprint)
      return fingerprint
    })

    leftSideBtns.append(btnPlay, btnRewind, btnForward, volumeWrapper, timerVideo, btnLive)
    controllerBtns.append(leftSideBtns, rightSideBtns)
    controller.append(progressWrapper, controllerBtns)
    videoWrapper.append(video, video2, controllerWrapper, iconWrapper, titleWrapper, mask, loadingMask, playCenterMask)
    this.container.append(videoWrapper, adContainer)

    window.video = video
    window.mask = mask
    window.videoWrapper = videoWrapper
    window.controllerWrapper = controllerWrapper
    window.progressBar = progressBar
    window.viewCount = viewCount
    window.views = views
    window.adContainer = adContainer
    window.tooltip = tooltip
    window.isFocusVideo = false
    window.handleHideController = handleHideController
    window.handleShowController = handleShowController
    window.handleTimeUpdateVideo = handleTimeUpdateVideo
    window.handleKeyBoard = handleKeyBoard
    window.fingerprints = fingerprints
    window.playCenterMask = playCenterMask
    window.btnMultiAudio = btnMultiAudio
    window.divSwitchTrack = divSwitchTrack
    window.btnMultiQuality = btnMultiQuality
    window.divSwitchQuality = divSwitchQuality

    window.showViews = this.showViews

    const onError = (error) => {
      this.cbError(error)
    }

    const fakeFullScreen = () => {
      this.cbFs()
      isFullscreen = true
      iconMinimize.classList.remove("hide")
      iconFullscreen.classList.add("hide")
      console.log('fake fullscreen')
    }

    const exitFakeFullScreen = () => {
      this.cbExitFs()
      isFullscreen = false
      iconMinimize.classList.add("hide")
      iconFullscreen.classList.remove("hide")
      console.log('exit fake fullscreen')
    }

    const onReloadLinkPlayBackup = () => {
      // code handle reload link backup

      // if src === undefined
      onError({ errorCode: 400, errorMessage: 'link error!' })
    }

    // Initialize IMA sdk  
    if (isAdOn) {
      const loadAdsEvent = () => {
        if (video.readyState >= 3) loadAds(this.container, video2)
      }

      video.addEventListener('loadeddata', loadAdsEvent)
      window.loadAdsEvent = loadAdsEvent
      initializeIMA(video, video2, adContainer, btnSkipAd, textSkipAd, iconSkipAd, adTagUrl, onError)
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

    let processedData = window.processedData
    if (!processedData || !window.options.trackingUrl) return
    processedData.ended_at = getCurrentTimeAndDate()
    fetch(window.options.trackingUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([processedData])
    })
    window.removeEventListener('beforeunload', window.handleCloseTab)
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