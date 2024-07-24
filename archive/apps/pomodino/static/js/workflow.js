// Work History Handlers

function updateHistory() {
  let minutes = Math.floor(elapsedSeconds / 60);
  if (!minutes) return;
  workHistory["done"].push(currentIntervalType);
  workHistory["total-time"] += minutes;
  if (currentIntervalType === "work") {
    workHistory["work-sessions"]++;
    workHistory["work-time"] += minutes;
  }
}

function updateHistoryDisplay() {
  workSessionsSpan.textContent = workHistory["work-sessions"];
  workTimeSpan.textContent = formatMinutes(workHistory["work-time"]);
  totalTimeSpan.textContent = formatMinutes(workHistory["total-time"]);
}

// Work Cycle Handlers

function fetchOrCreateWorkCycle() {
  if (fetchUserWorkCycle()) return;
  createNewWorkCycle();
}

function fetchUserWorkCycle() {
  let data = localStorage.getItem("workCycle");
  if (data) {
    workCycle = JSON.parse(data);
    return true;
  }
}

function createNewWorkCycle() {
  workCycle.length = 0;
  let final = appSettings["long-break-interval"];
  for (i = 1; i <= final; i++) {
    workCycle.push("work", i < final ? "short-break" : "long-break");
  }
}

function shiftWorkCycle() {
  workCycle.push(workCycle.shift());
  selectIntervalType(workCycle[0]);
}

function readjustWorkCycle() {
  while (workCycle[0] !== currentIntervalType) {
    workCycle.push(workCycle.shift());
  }
}

function endCurrentInterval() {
  if (runningTimer) pauseTimer();
  playAudio();
  updateHistory();
  updateHistoryDisplay();
  shiftWorkCycle();
  resetCurrentInterval();
  if (appSettings["auto-start"]) startTimer();
}
