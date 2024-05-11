// Utils

function playAudio() {
  audioPlayer.play();
}

function formatSeconds(seconds) {
  let minutes = Math.floor(seconds / 60);
  minutes = minutes.toString().padStart(2, "0");
  seconds = Math.floor(seconds % 60);
  seconds = seconds.toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatMinutes(minutes) {
  let hours = Math.floor(minutes / 60);
  hours = hours.toString();
  minutes = Math.floor(minutes % 60);
  minutes = minutes.toString();
  return `${hours}h ${minutes}m`;
}

function now() {
  return new Date() / 1000;
}
