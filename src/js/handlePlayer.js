export const handleVolumeSliderUpdate = (e, video, iconVolume, iconMuted) => {
  video["volume"] = e.target.value;
  window.volume = e.target.value;
  if(e.target.value == 0) {
    video.muted = true;
    iconVolume.classList.add("hide");
    iconMuted.classList.remove("hide");
  } else {
    video.muted = false;
    iconVolume.classList.remove("hide");
    iconMuted.classList.add("hide");
  }
}
  
export const togglePlay = (video, isLive, iconWrapper, iconInner, iconPlayBig, iconPauseBig) => {
  if (video.paused || video.ended) {
    if (isLive && video.buffered.length > 0) {
      video.currentTime = video.buffered.end(0);
    }
    video.play();
    renderPlayIcon(iconWrapper, iconInner, iconPlayBig);
  } else {
    video.pause();
    renderPauseIcon(iconWrapper, iconInner, iconPauseBig);
  }
}
  
const renderPlayIcon = (iconWrapper, iconInner, iconPlayBig) => {
  if (iconInner.hasChildNodes()) {
    iconInner.removeChild(iconInner.firstChild);
  }

  iconInner.appendChild(iconPlayBig);
  iconWrapper.style.display = 'flex';

  setTimeout(() => {
    iconWrapper.style.display = 'none';
  }, 500)
}
  
const renderPauseIcon = (iconWrapper, iconInner, iconPauseBig) => {
  if (iconInner.hasChildNodes()) {
    iconInner.removeChild(iconInner.firstChild);
  }
  iconInner.appendChild(iconPauseBig);
  iconWrapper.style.display = 'flex';

  setTimeout(() => {
    iconWrapper.style.display = 'none';
  }, 500)
}
  
export const handleRewindVideo = (video, iconRewind) => {
  if(video.currentTime === 0) return

  video.currentTime = video.currentTime - 10 <= 0 ? 0 : video.currentTime - 10
  iconRewind.classList.remove('hide')

  setTimeout(() => {
    iconRewind.classList.add('hide')
  }, 300)
}
  
export const handleForwardVideo = (video, iconForward) => {
  if (video.currentTime >= video.duration) return

  console.log("time before: ", video.currentTime)
  video.currentTime = video.currentTime + 10 >= video.duration ? video.duration : video.currentTime + 10
  console.log("time after: ", video.currentTime)
  iconForward.classList.remove('hide')

  setTimeout(() => {
    iconForward.classList.add('hide')
  }, 300)
}

export const handleProgress = (video, progressBar, iconPlay, iconPause, iconReplay, iconLive, iconGoToLive, textGoToLive, mask, isLive, isLiveTime, isMobile) => {
  if(video.currentTime < 0) return;
  if (isLive) {
    iconPlay.classList.toggle("hide", !video.paused);
    iconPause.classList.toggle("hide", video.paused);
    iconReplay.classList.add("hide");
    iconLive.setAttribute("class", `${isLiveTime ? '' : 'hide'} `)
    iconGoToLive.setAttribute("class", `${isLiveTime ? 'hide' : ''}`)
    textGoToLive.setAttribute("class", `${isLiveTime ? 'hide' : ''}`)
    return;
  }
  const duration = Math.round(video.duration) || 0;
  const currentTime = Math.round(video.currentTime);
  const progressPercentage = (currentTime / duration) * 100;
  progressBar.style.setProperty("--progress-percent", progressPercentage);
  progressBar.value = progressPercentage;
  
  for (let i = 0; i < video.buffered.length; i++) {
    if (video.buffered.start(video.buffered.length - 1 - i) < currentTime) {
        let bufferedPercentage = (video.buffered.end(video.buffered.length - 1 - i) * 100) / duration
        progressBar.style.setProperty("--buffered-percent", bufferedPercentage);
        break;
    }
  }
    
  if (currentTime === duration) {
    iconPlay.classList.add("hide");
    iconPause.classList.add("hide");
    iconReplay.classList.remove("hide");
    mask.classList.remove("hide");

    if (isMobile) controllerWrapper.classList.add("hide")
  } else {
    iconPlay.classList.toggle("hide", !video.paused);
    iconPause.classList.toggle("hide", video.paused);
    iconReplay.classList.add("hide");
    mask.classList.add("hide");
  }
}