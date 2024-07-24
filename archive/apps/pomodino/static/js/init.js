// Main Page HTML Elements & Event Listeners
// window.onbeforeunload = function () {
//   return "Your time count will be reset if you leave the page, are you sure?";
// };

document
  .getElementById("reset-button")
  .addEventListener("click", resetCurrentInterval);
document
  .getElementById("skip-button")
  .addEventListener("click", endCurrentInterval);

const favicon = document.getElementById("favicon");
const timer = document.getElementById("clock");
const startPauseButton = document.getElementById("start-pause-button");
const startIcon = startPauseButton.querySelector(".start-icon");
const pauseIcon = startPauseButton.querySelector(".pause-icon");
const progressBar = document.querySelector(".progress-bar");
const audioPlayer = document.getElementById("audioPlayer");
const intervalTypeButtons = document.querySelectorAll(
  ".interval-type-buttons button"
);
const header = document.getElementsByTagName("header")[0];
const stats = document.querySelectorAll(".stats > div");

startPauseButton.addEventListener("click", startOrPause);

intervalTypeButtons.forEach((button) => {
  button.addEventListener("click", () =>
    selectIntervalType(button.id.slice(0, -7))
  );
});

// Settings Modal HTML Elements & Event Listeners

document
  .querySelector(".open-settings-button")
  .addEventListener("click", openSettingsModal);
document
  .querySelector(".default-settings-button")
  .addEventListener("click", applyClassicSettings);
document
  .querySelector(".close-modal-icon")
  .addEventListener("click", closeSettingsModal);

const settingsModal = document.getElementById("settings-modal");
const inputFields = document.querySelectorAll("input");
const audioButtons = document.querySelectorAll("#audio-list button");

inputFields.forEach((input) => {
  if (input.type === "number") {
    input.addEventListener("change", () => validateAndSetNumberInput(input));
    if (input.id === "long-break-interval") {
      input.addEventListener("change", () => createNewWorkCycle());
    }
  } else if (input.type === "checkbox") {
    input.addEventListener("change", () => setCheckboxInput(input));
  }
});

audioButtons.forEach((button) => {
  button.addEventListener("click", () => setAudioInput(button.id));
});

// History Display HTML Elements

const workSessionsSpan = document.getElementById("work-sessions");
const workTimeSpan = document.getElementById("work-time");
const totalTimeSpan = document.getElementById("total-time");

// Settings & Process Objects

const appSettings = {
  work: null,
  "short-break": null,
  "long-break": null,
  "long-break-interval": null,
  "auto-start": null,
  audio: null,
};

const classicSettings = {
  work: 25,
  "short-break": 5,
  "long-break": 20,
  "long-break-interval": 4,
  "auto-start": false,
  audio: "triangle-dinner-bell",
};

const workCycle = [];

const workHistory = {
  done: [],
  "work-sessions": 0,
  "work-time": 0,
  "total-time": 0,
};

// Timer Variables

let currentIntervalType = "work";
let runningTimer = null;
let totalSeconds = appSettings[currentIntervalType] * 60;
let startSeconds;
let elapsedSeconds = 0;

// Progress Bar Circle Constants

const circle = document.querySelector("circle");
const radius = parseInt(circle.getAttribute("r"), 10);
const circumference = 2 * Math.PI * radius;

// Upon first loading the app

applyUserOrClassicSettings();
fetchOrCreateWorkCycle();
updateHistoryDisplay();
