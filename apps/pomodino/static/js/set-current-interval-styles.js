function setActiveIntervalTypeButton() {
  intervalTypeButtons.forEach((button) => {
    button.classList.toggle(
      "active",
      button.id.startsWith(currentIntervalType)
    );
  });
}

function setStylesForIntervalType(type) {
  document.body.style.background = `var(--color-${type}-1)`;
  header.style.background = `var(--color-${type}-1)`;
  progressBar.style.stroke = `var(--color-${type}-3)`;
  progressBar.style.fill = `var(--color-${type}-2)`;
  startIcon.style.fill = `var(--color-${type}-4)`;
  pauseIcon.style.fill = `var(--color-${type}-4)`;
  stats.forEach((stat) => (stat.style.background = `var(--color-${type}-2)`));
}

function setCurrentIntervalStyles() {
  setActiveIntervalTypeButton();
  setStylesForIntervalType(currentIntervalType);
}

function toggleStartPauseIcon(timer) {
  startIcon.style.display = timer ? "block" : "none";
  pauseIcon.style.display = timer ? "none" : "block";
}
