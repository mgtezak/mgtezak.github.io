// UI Handlers

function openSettingsModal() {
  settingsModal.showModal();
}

function closeSettingsModal() {
  storeUserSettings();
  resetCurrentInterval();
  settingsModal.close();
}

function updateSettingsModal() {
  updateInputFields();
  setActiveAudioButton();
}

function updateInputFields() {
  inputFields.forEach((input) => {
    if (input.type === "number") {
      input.value = appSettings[input.id];
    } else if (input.type === "checkbox") {
      input.checked = appSettings[input.id];
    }
  });
}

function setActiveAudioButton() {
  audioButtons.forEach((button) => {
    button.classList.remove("active");
    if (button.id === appSettings["audio"]) {
      button.classList.add("active");
    }
  });
}

// User Input Handlers

function validateAndSetNumberInput(input) {
  if (validateNumberInput(input)) {
    setNumberInput(input);
  }
  input.value = appSettings[input.id];
}

function validateNumberInput(input) {
  return !isNaN(parseInt(input.value));
}

function setNumberInput(input) {
  appSettings[input.id] = Math.min(120, Math.max(1, input.value));
}

function setCheckboxInput(input) {
  console.log('going from ', appSettings[input.id])
  appSettings[input.id] = input.checked;
  console.log('to ', appSettings[input.id])

}

function setAudioInput(input) {
  appSettings["audio"] = input;
  updateAudioPlayer();
  setActiveAudioButton();
  playAudio();
}

// Data Handlers

function applyUserOrClassicSettings() {
  let userSettings = fetchUserSettings();
  if (userSettings) {
    applyUserSettings(userSettings);
  } else {
    applyClassicSettings();
  }
}

function applyUserSettings(userSettings) {
  Object.assign(appSettings, userSettings);
  implementSettings();
}

function applyClassicSettings() {
  Object.assign(appSettings, classicSettings);
  implementSettings();
}

function implementSettings() {
  resetCurrentInterval();
  updateAudioPlayer();
  updateSettingsModal();
}

function updateAudioPlayer() {
  audioPlayer.src = "static/audio/" + appSettings["audio"] + ".mp3";
}

// Local Storage Handlers

function fetchUserSettings() {
  let data = localStorage.getItem("userSettings");
  if (data) {
    return JSON.parse(data);
  }
}

function storeUserSettings() {
  localStorage.setItem("userSettings", JSON.stringify(appSettings));
}
