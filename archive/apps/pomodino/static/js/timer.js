// Interval Type Handlers

function selectIntervalType(newType) {
  if (currentIntervalType === newType) return;
  currentIntervalType = newType;
  setCurrentIntervalStyles();
  resetCurrentInterval();
  readjustWorkCycle();
  updateFavicon();
}

// Timer Function Handlers

function startOrPause() {
  runningTimer ? pauseTimer() : startTimer();
}

function startTimer() {
  toggleStartPauseIcon(runningTimer);
  startSeconds = now();
  let end = totalSeconds - elapsedSeconds + startSeconds;
  runningTimer = setInterval(() => {
    let remaining = end - now();
    if (remaining <= 0) return endCurrentInterval();
    updateTimer(remaining);
    updateProgressBar(remaining / totalSeconds);
  }, 100);
}

function pauseTimer() {
  toggleStartPauseIcon(runningTimer);
  clearInterval(runningTimer);
  runningTimer = null;
  elapsedSeconds += now() - startSeconds;
}

function resetCurrentInterval() {
  if (runningTimer) pauseTimer();
  totalSeconds = appSettings[currentIntervalType] * 60;
  elapsedSeconds = 0;
  updateTimer(totalSeconds);
  updateProgressBar(1);
}

// Timer UI Handlers

function updateTimer(seconds) {
  seconds = formatSeconds(seconds);
  timer.textContent = seconds;
  document.title = `${seconds} — PomoDino`;
}

function updateProgressBar(percent) {
  progressBar.style.strokeDashoffset = (percent - 1) * circumference;
}

function updateFavicon() {
  favicon.href = `static/images/dino-${currentIntervalType}.svg`
}