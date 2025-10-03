let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 0;

// Elements
const display = {
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds'),
  milliseconds: document.getElementById('milliseconds'),
};

const buttons = {
  start: document.getElementById('start'),
  stop: document.getElementById('stop'),
  reset: document.getElementById('reset'),
  lap: document.getElementById('lap'),
  themeToggle: document.getElementById('theme-toggle'),
};

const lapList = document.getElementById('lap-list');

// Update Display
function updateDisplay(time) {
  const hrs = Math.floor(time / 3600000);
  const mins = Math.floor((time % 3600000) / 60000);
  const secs = Math.floor((time % 60000) / 1000);
  const ms = time % 1000;

  display.hours.textContent = String(hrs).padStart(2, '0');
  display.minutes.textContent = String(mins).padStart(2, '0');
  display.seconds.textContent = String(secs).padStart(2, '0');
  display.milliseconds.textContent = String(ms).padStart(3, '0');
}

// Start Timer
function startTimer() {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);
    }, 10);
  }
}

// Stop Timer
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// Reset Timer
function resetTimer() {
  stopTimer();
  elapsedTime = 0;
  updateDisplay(elapsedTime);
  lapList.innerHTML = '';
  lapCount = 0;
}

// Record Lap
function recordLap() {
  lapCount++;
  const li = document.createElement('li');
  li.textContent = `Lap ${lapCount}: ${display.hours.textContent}:${display.minutes.textContent}:${display.seconds.textContent}.${display.milliseconds.textContent}`;
  lapList.appendChild(li);
}

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle('dark');
  buttons.themeToggle.textContent = document.body.classList.contains('dark') ? '☀️Light Mode' : '🌙Dark Mode';
}

// Event Listeners
buttons.start.addEventListener('click', startTimer);
buttons.stop.addEventListener('click', stopTimer);
buttons.reset.addEventListener('click', resetTimer);
buttons.lap.addEventListener('click', recordLap);
buttons.themeToggle.addEventListener('click', toggleTheme);
