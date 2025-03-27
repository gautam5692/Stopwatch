// The time numbers
const miliSec = document.getElementById("mili-sec");
const sec = document.getElementById("sec");
const min = document.getElementById("min");
const hr = document.getElementById("hr");

// Buttons
const btnContainer = document.getElementById("btn-container");
const startBtn = document.getElementById("start");

startBtn.addEventListener("click", startTimer);

let startTime;
let timerInterval;
let elapsedTime;

function startTimer() {
  startTime = performance.now();
  timerInterval = requestAnimationFrame(updateTimer);
  addBtns();
}

function updateTimer() {
  const currentTime = performance.now();
  elapsedTime = currentTime - startTime;

  const totalMilliseconds = Math.floor(elapsedTime);

  const miliValue = Math.floor((totalMilliseconds % 1000) / 10);
  const secValue = Math.floor((totalMilliseconds % 60000) / 1000);
  const minValue = Math.floor((totalMilliseconds % 3600000) / 60000);
  const hrValue = Math.floor(totalMilliseconds / 3600000);

  miliSec.innerHTML = String(miliValue).padStart(2, "0");
  sec.innerHTML = String(secValue).padStart(2, "0");
  min.innerHTML = String(minValue).padStart(2, "0");
  hr.innerHTML = String(hrValue).padStart(2, "0");

  timerInterval = requestAnimationFrame(updateTimer);
}

function addBtns() {
  const stopBtn = document.createElement("button");
  const countBtn = document.createElement("button");
  const resetBtn = document.createElement("button");

  stopBtn.setAttribute("id", "stop");
  countBtn.setAttribute("id", "count");
  resetBtn.setAttribute("id", "reset");

  stopBtn.innerHTML = "Stop";
  countBtn.innerHTML = "Count";
  resetBtn.innerHTML = "Reset";

  countBtn.classList.add("btn-hidden");
  resetBtn.classList.add("btn-hidden");

  resetBtn.addEventListener("click", resetTimer);
  stopBtn.addEventListener("click", stopTimer);
  countBtn.addEventListener("click", countTimer);

  // fragment is an imaginary document object like a div but it doesn't appear in the inspect element
  const fragment = document.createDocumentFragment();
  fragment.appendChild(resetBtn);
  fragment.appendChild(stopBtn);
  fragment.appendChild(countBtn);

  btnContainer.innerHTML = "";
  btnContainer.appendChild(fragment);

  setTimeout(() => {
    resetBtn.classList.remove("btn-hidden");
    resetBtn.classList.add("slide-in-left");

    countBtn.classList.remove("btn-hidden");
    countBtn.classList.add("slide-in-right");
  }, 100);
}

function stopTimer() {
  cancelAnimationFrame(timerInterval);

  const stopBtn = document.getElementById("stop");
  const continueBtn = document.createElement("button");
  continueBtn.setAttribute("id", "continue");
  continueBtn.innerHTML = "Continue";
  stopBtn.parentNode.replaceChild(continueBtn, stopBtn);

  continueBtn.addEventListener("click", () => {
    startTime = performance.now() - elapsedTime;
    timerInterval = requestAnimationFrame(updateTimer);
    continueBtn.parentNode.replaceChild(stopBtn, continueBtn);
  });
}

function resetTimer() {
  cancelAnimationFrame(timerInterval);
  miliSec.innerHTML = "00";
  sec.innerHTML = "00";
  min.innerHTML = "00";
  hr.innerHTML = "00";

  btnContainer.innerHTML = "";
  const newStartBtn = document.createElement("button");
  newStartBtn.setAttribute("id", "start");
  newStartBtn.innerHTML = "Start";

  newStartBtn.addEventListener("click", startTimer);

  btnContainer.appendChild(newStartBtn);

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
  const btns = document.getElementsByTagName("button");
  let counterTimeContainer = document.getElementById("counter-time-container");
  animate();
  if (!counterTimeContainer) {
    counterTimeContainer = document.createElement("div");
    counterTimeContainer.setAttribute("id", "counter-time-container");
    mainContainer.appendChild(counterTimeContainer);
  }

  const counterTime = document.createElement("div");
  counterTime.classList.add("counter-time");
  counterNo++;
  counterTime.innerHTML = `Counter${counterNo} => ${hr.innerHTML} : ${min.innerHTML} : ${sec.innerHTML}: ${miliSec.innerHTML}`;

  counterTimeContainer.appendChild(counterTime);

  function animate() {
    stopWatchContainer.classList.add("stopwatch-animation");

    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.add("btn-animation");
    }
    btnContainer.style.columnGap = "20px";
  }
}
