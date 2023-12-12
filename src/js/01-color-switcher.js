const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
let changeTimer = null;
stopBtn.disabled = true;
function onStart(event) {
  event.preventDefault();
  changeTimer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }, 1000);
}

function onStop(event) {
  clearInterval(changeTimer);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
