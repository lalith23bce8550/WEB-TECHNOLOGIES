function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if (sec < 10) sec = '0' + sec;
    return min + ":" + sec;
}

const video = document.getElementById('myVideo');
const audio = document.getElementById('myAudio');
const videoTimeDisplay = document.getElementById('videoTime');
const audioTimeDisplay = document.getElementById('audioTime');

video.addEventListener('timeupdate', () => {
    videoTimeDisplay.innerText = formatTime(video.currentTime);
});

audio.addEventListener('timeupdate', () => {
    audioTimeDisplay.innerText = formatTime(audio.currentTime);
});