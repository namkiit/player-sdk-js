import {
    iconEye,
    iconForward,
    iconFullscreen,
    iconLive,
    iconMinimize,
    iconMultiAudio,
    iconMultiQuality,
    iconMuted,
    iconPause,
    iconPlay,
    iconPlay2,
    iconReplay,
    iconReplayBig,
    iconRewind,
    iconSkipAd,
    iconVolume,
    iconGoToLive,
    iconPlayBig,
    iconPauseBig,
} from "../assets/icons"
import {
    createElement,
    debounce,
    preventDefaultForSpace,
    setStyles
} from "./utils/helpers"
import { formatTimeVideo, convertPercentageToTimeSeeked, formatTimeEvents } from "./formatTime"
import { handleVolumeSliderUpdate, togglePlay, handleForwardVideo, handleRewindVideo, handleProgress } from "./handlePlayer"

let oldSeekValue = null
let timeoutController
window.timeoutController = timeoutController

export function renderUIAndEventListeners(
    container, volume, isMobile, name, startTime, isLive, isSafari, 
    isLiveTime, isFullscreen, isIpad, allowTimeshift
) {
    const videoWrapper = createElement("div", "video__wrapper");
    const video = createElement("video", "main__video", {
        playsinline: true,
        volume,
        muted: volume === 0
    });
    const videoAd = createElement("video", "ads__video hide");

    const titleWrapper = createElement("div", "title__wrapper hide")
    const titleInner = createElement("div", `title__inner ${isMobile ? "mobile" : ""}`)
    const title = createElement("div", `title ${isMobile ? "mobile" : ""}`)
    title.innerText = name
    const date = createElement("div", `date ${isMobile ? "mobile" : ""}`)
    date.innerText = formatTimeEvents(startTime)
    titleInner.append(title, date)
    titleWrapper.appendChild(titleInner)

    const controllerWrapper = createElement('div', "controls__wrapper hide")
    const controller = createElement('div', "controls")
    controllerWrapper.appendChild(controller)

    const iconWrapper = createElement("div", `icon__wrapper ${isMobile ? "mobile" : ""}`)
    const iconInner = createElement("div", `icon__inner ${isMobile ? "mobile" : ""}`)
    iconWrapper.appendChild(iconInner)

    const mask = createElement("div", "mask hide")
    mask.appendChild(iconReplayBig)

    const loadingMask = createElement("div", "loading__mask hide")
    const loadingSpinner = createElement("div", `loading__spinner ${isMobile ? "mobile" : ""}`)
    loadingMask.appendChild(loadingSpinner)

    const progressWrapper = createElement("div", "progress__wrapper")

    const progressBar = createElement("input", `progress__bar ${isLive ? "live" : ""} ${isLive ? (allowTimeshift ? "" : "disable_mouse") : ""}`, {
        type: "range",
        name: "volume",
        min: "0",
        max: "100",
        step: "any",
        value: `${isLive ? 100 : 0}`,
    })
    progressWrapper.appendChild(progressBar)

    const tooltip = createElement('div', 'tooltip')
    videoWrapper.appendChild(tooltip)

    const controllerBtns = createElement("div", "control__btns")
    const leftSideBtns = createElement("div", `control__btns__leftside ${isLive ? "live" : ""} ${isMobile ? "mobile" : ""}`)
    const rightSideBtns = createElement("div", "control__btns__rightside")

    const btnPlay = createElement('div', `button ${isMobile ? "mobile" : ""}`)
    iconPause.setAttribute("class", "hide")
    iconReplay.setAttribute("class", "hide")
    btnPlay.append(iconPlay, iconPause, iconReplay)

    const btnRewind = createElement('div', `button ${isLive ? 'hide' : ''} ${isMobile ? "mobile" : ""}`)
    btnRewind.appendChild(iconRewind)

    const btnForward = createElement('div', `button ${isLive ? 'hide' : ''} ${isMobile ? "mobile" : ""}`)
    btnForward.appendChild(iconForward)

    const clonedIconRewind = iconRewind.cloneNode(true)
    const clonedIconForward = iconForward.cloneNode(true)
    clonedIconRewind.setAttribute('class', `icon__rewind ${isMobile ? "mobile" : ""} hide`)
    clonedIconForward.setAttribute('class', `icon__forward ${isMobile ? "mobile" : ""} hide`)
    videoWrapper.append(clonedIconRewind, clonedIconForward)

    const volumeWrapper = createElement("div", "volume__wrapper")

    const btnVolume = createElement('div', `button toggle__volume ${isMobile ? "mobile" : ""}`)
    btnVolume.append(iconVolume, iconMuted)
    iconVolume.setAttribute("class", `${video.muted ? 'hide' : ''} `)
    iconMuted.setAttribute("class", `${video.muted ? '' : 'hide'}`)
    volumeWrapper.appendChild(btnVolume)

    const sliderVolume = createElement('input', `control__volume__slider ${isLive ? 'live' : ''}`, {
        type: "range",
        name: "volume",
        min: "0",
        max: "1",
        step: "0.05",
        value: `${volume}`,
    })
    sliderVolume.style.setProperty("--volume", volume)
    volumeWrapper.appendChild(sliderVolume)

    const timerVideo = createElement("div", `video__timer ${isLive ? "hide" : ""} ${isMobile ? "mobile" : ""}`)
    const btnLive = createElement("div", `button__live disable_mouse ${isLive ? "" : "hide"}`)
    const textGoToLive = createElement("div", "go__live")
    textGoToLive.innerText = "Tới trực tiếp"
    btnLive.append(iconLive, iconGoToLive, textGoToLive)

    const btnMultiAudio = createElement("div", "button switch__track hide")
    btnMultiAudio.appendChild(iconMultiAudio)
    rightSideBtns.appendChild(btnMultiAudio)

    const divSwitchTrack = createElement("div", "div__track hide")
    const titleSwitchTrack = createElement("div", "title__switch_track")
    titleSwitchTrack.innerText = "Lựa chọn âm thanh"
    divSwitchTrack.appendChild(titleSwitchTrack)
    rightSideBtns.appendChild(divSwitchTrack)

    const btnMultiQuality = createElement("div", "button switch__quality hide")
    btnMultiQuality.appendChild(iconMultiQuality)
    rightSideBtns.appendChild(btnMultiQuality)

    const divSwitchQuality = createElement("div", "div__quality hide")
    const titleSwitchQuality = createElement("div", "title__switch_quality")
    titleSwitchTrack.innerText = "Lựa chọn chất lượng"
    divSwitchQuality.appendChild(titleSwitchQuality)
    rightSideBtns.appendChild(divSwitchQuality)

    const btnFullscreen = createElement("div", `button toggle ${isMobile ? "mobile" : ""}`)
    iconMinimize.setAttribute("class", "hide")
    btnFullscreen.append(iconFullscreen, iconMinimize)

    const viewCount = createElement("div", "view__count")
    const views = createElement("div", "views")
    viewCount.append(iconEye, views)

    const adContainer = createElement("div", "ad__container")

    const playCenterMask = createElement("div", "play__mask")
    const btnPlayCenter = createElement("div", "button play__center")
    btnPlayCenter.appendChild(iconPlay2)
    playCenterMask.appendChild(btnPlayCenter)

    const btnSkipAd = createElement("div", "skip__ad hide")
    const textSkipAd = createElement("p", "skip__text")
    iconSkipAd.setAttribute("class", "hide")
    btnSkipAd.append(textSkipAd, iconSkipAd)
    container.appendChild(btnSkipAd)

    leftSideBtns.append(btnPlay, btnRewind, btnForward, volumeWrapper, timerVideo, btnLive)
    rightSideBtns.appendChild(btnFullscreen)
    controllerBtns.append(leftSideBtns, rightSideBtns)
    controller.append(progressWrapper, controllerBtns)
    videoWrapper.append(video, videoAd, controllerWrapper, iconWrapper, titleWrapper, mask, loadingMask, playCenterMask)
    container.append(videoWrapper, adContainer)

    let fpPos1, fpPos2, fpPos3, fpPos4, fpPos5, fpPos6, fpPos7, fpPos8, fpPos9
    let fingerprints = [fpPos1, fpPos2, fpPos3, fpPos4, fpPos5, fpPos6, fpPos7, fpPos8, fpPos9]
    fingerprints = fingerprints.map((fingerprint, index) => {
        fingerprint = createElement('div', `fingerprint pos-${index + 1} hide`)
        container.appendChild(fingerprint)
        return fingerprint
    })

    /* Event listeners */
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

    const handleHideController = (event) => {
        if (event.type === 'mousedown' && (video.paused || isMobile)) return
        controllerWrapper.classList.remove("hide")
        if (isLive) window.viewCount.classList.add("hide")
        if (document.fullscreenElement || document.webkitFullScreenElement) titleWrapper.classList.remove("hide")

        clearTimeout(timeoutController)
        timeoutController = setTimeout(() => {
            controllerWrapper.classList.add("hide")
            divSwitchTrack.classList.add("hide")
            divSwitchQuality.classList.add("hide")
            if (isLive) window.viewCount.classList.remove("hide")
            if (document.fullscreenElement || document.webkitFullscreenElement) titleWrapper.classList.add("hide")
        }, 3000)
    }

    container.addEventListener("mousemove", handleHideController)
    container.addEventListener("mousedown", handleHideController)
    container.addEventListener("mouseleave", handleHideController)

    const handleShowController = () => {
        if (isMobile) return
        clearTimeout(timeoutController)
        controllerWrapper.classList.remove("hide")
        if (isLive) window.viewCount.classList.add("hide")
        if (document.fullscreenElement || document.webkitFullScreenElement) titleWrapper.classList.remove("hide")
    }

    video.addEventListener("pause", handleShowController)

    iconReplayBig.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        video.play()
    })

    // handle seek video and livestream timeshift / playback
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

    btnPlay.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        togglePlay(video, isLive, iconWrapper, iconInner, iconPlayBig, iconPauseBig)
    })

    btnRewind.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        video.currentTime = video.currentTime - 10
    })

    btnForward.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        video.currentTime = video.currentTime + 10
    })

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

    //handle go to live time
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

    btnMultiAudio.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        divSwitchTrack.classList.toggle("hide")
    })

    btnMultiQuality.addEventListener("mousedown", (e) => {
        e.stopPropagation()
        e.preventDefault()
        divSwitchQuality.classList.toggle("hide")
    })

    btnFullscreen.addEventListener("mousedown", (e) => {
        let noHLS = video.getAttribute('playsinline')
        e.stopPropagation()

        if (noHLS) {
            isFullscreen ? exitFakeFullScreen() : fakeFullScreen()
        } else {
            if (document.fullscreenElement) document.exitFullscreen()
            else if (document.webkitFullscreenElement) document.webkitExitFullscreen()
            else {
                isSafari ? isIpad ? container.webkitEnterFullscreen() : video.webkitEnterFullscreen() : container.requestFullscreen()
            }
        }
    })

    btnPlayCenter.addEventListener("click", () => {
        playCenterMask.classList.add("hide")
        video.currentTime = 0
        video.play()
    })

    // handle fullscreen change
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

    window.video = video
    window.mask = mask
    window.videoWrapper = videoWrapper
    window.controllerWrapper = controllerWrapper
    window.progressBar = progressBar
    window.viewCount = viewCount
    window.views = views
    window.adContainer = adContainer
    window.fingerprints = fingerprints
    window.playCenterMask = playCenterMask
    window.btnMultiAudio = btnMultiAudio
    window.divSwitchTrack = divSwitchTrack
    window.btnMultiQuality = btnMultiQuality
    window.divSwitchQuality = divSwitchQuality
    window.handleKeyBoard = handleKeyBoard
    window.handleHideController = handleHideController
    window.handleShowController = handleShowController
    window.handleTimeUpdateVideo = handleTimeUpdateVideo

    return {
        video,
        videoAd,
        adContainer,
        btnSkipAd,
        textSkipAd,
        fingerprints
    };
}