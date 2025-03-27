// Time Elements
const miliSec = document.getElementById("mili-sec");
const sec = document.getElementById("sec");
const min = document.getElementById("min");
const hr = document.getElementById("hr");

// Buttons
const btnContainer = document.getElementById("btn-container");
const startBtn = document.getElementById("start");

startBtn.addEventListener("click", startTimer);

let startTime, timerInterval, elapsedTime;

function startTimer() {
  startTime = performance.now();
  timerInterval = requestAnimationFrame(updateTimer);
  createButtons();
}

function updateTimer() {
  elapsedTime = performance.now() - startTime;
  const totalMilliseconds = Math.floor(elapsedTime);

  miliSec.innerHTML = formatValue((totalMilliseconds % 1000) / 10);
  sec.innerHTML = formatValue((totalMilliseconds % 60000) / 1000);
  min.innerHTML = formatValue((totalMilliseconds % 3600000) / 60000);
  hr.innerHTML = formatValue(totalMilliseconds / 3600000);

  timerInterval = requestAnimationFrame(updateTimer);
}

function formatValue(value) {
  return String(Math.floor(value)).padStart(2, "0");
}

function createButtons() {
  const buttons = {
    stop: createButton("Stop", stopTimer),
    reset: createButton("Reset", resetTimer, ["btn-hidden", "slide-in-left"]),
    count: createButton("Count", countTimer, ["btn-hidden", "slide-in-right"]),
  };

  const fragment = document.createDocumentFragment();
  fragment.appendChild(buttons.reset);
  fragment.appendChild(buttons.stop);
  fragment.appendChild(buttons.count);

  btnContainer.innerHTML = "";
  btnContainer.appendChild(fragment);

  setTimeout(() => {
    toggleButtonVisibility(buttons.reset, true);
    toggleButtonVisibility(buttons.count, true);
  }, 100);
}

function createButton(label, clickHandler, classList = []) {
  const button = document.createElement("button");
  button.innerHTML = label;
  button.addEventListener("click", clickHandler);
  classList.forEach((cls) => button.classList.add(cls));
  return button;
}

function toggleButtonVisibility(button, isVisible) {
  button.classList.toggle("btn-hidden", !isVisible);
}

function stopTimer() {
  cancelAnimationFrame(timerInterval);

  const stopBtn = document.getElementById("stop");
  const continueBtn = createButton("Continue", continueTimer);

  stopBtn.parentNode.replaceChild(continueBtn, stopBtn);

  function continueTimer() {
    startTime = performance.now() - elapsedTime;
    timerInterval = requestAnimationFrame(updateTimer);
    continueBtn.parentNode.replaceChild(stopBtn, continueBtn);
  }
}

function resetTimer() {
  cancelAnimationFrame(timerInterval);
  [miliSec, sec, min, hr].forEach((el) => (el.innerHTML = "00"));

  btnContainer.innerHTML = "";
  btnContainer.appendChild(createButton("Start", startTimer));

  const counterTimeContainer = document.getElementById(
    "counter-time-container"
  );
  if (counterTimeContainer) {
    const mainContainer = document.getElementById("main-container");
    mainContainer.removeChild(counterTimeContainer);

    const stopWatchContainer = document.getElementById("stopwatch-container");
    stopWatchContainer.classList.remove("stopwatch-animation");
  }
}

let counterNo = 0;

function countTimer() {
  const mainContainer = document.getElementById("main-container");
  const stopWatchContainer = document.getElementById("stopwatch-container");
  let counterTimeContainer = document.getElementById("counter-time-container");

  if (!counterTimeContainer) {
    counterTimeContainer = document.createElement("div");
    counterTimeContainer.id = "counter-time-container";
    mainContainer.appendChild(counterTimeContainer);
  }

  const counterTime = document.createElement("div");
  counterTime.classList.add("counter-time");
  counterTime.innerHTML = `Counter ${++counterNo} => ${hr.innerHTML}:${
    min.innerHTML
  }:${sec.innerHTML}:${miliSec.innerHTML}`;

  counterTimeContainer.appendChild(counterTime);

  animateButtons(stopWatchContainer);
}

function animateButtons(stopWatchContainer) {
  stopWatchContainer.classList.add("stopwatch-animation");

  const buttons = document.querySelectorAll("#btn-container button");
  buttons.forEach((btn) => btn.classList.add("btn-animation"));

  btnContainer.style.columnGap = "20px";
}
