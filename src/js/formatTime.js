export const formatTimeVideo = (video, timerVideo) => {
    let currentTime = Math.floor(video.currentTime);
    let currentSecond = currentTime % 60;
    let currentMinute = Math.floor(currentTime / 60);
  
    let durationTime = Math.floor(video.duration);
    let durationSecond = durationTime % 60;
    let durationMinute = Math.floor(durationTime / 60);

    if (currentMinute < 10) currentMinute = "0" + currentMinute;
    if (currentSecond < 10) currentSecond = "0" + currentSecond;
    if (durationMinute < 10) durationMinute = "0" + durationMinute;
    if (durationSecond < 10) durationSecond = "0" + durationSecond;
  
    timerVideo.textContent = currentMinute + ":" + currentSecond + " / " + durationMinute + ":" + durationSecond;
}

export const formatTimeEvents = (time) => {
    if (!time) return "";
    const offsetTimeZoneVN = 7;
    const dateTimeZoneVN = new Date( new Date(time).getTime() + offsetTimeZoneVN * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
    const date = new Date(dateTimeZoneVN)
    let day = '' + date.getDate();
    let month = '' + (date.getMonth() + 1);
    let hours = '' + date.getHours();
    let minutes = '' + date.getMinutes();
    if (day.length < 2) day = '0' + day;
    if (month.length < 2) month = '0' + month;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    return hours + ':' + minutes + ' | ' + day + '/' + month;
}

export const convertPercentageToTimeSeeked = (percentage) => {
    const totalSeconds = Math.round((3600 * percentage) / 100) - 3600

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = - (totalSeconds % 60)

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    return formattedTime
}