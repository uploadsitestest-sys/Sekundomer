const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

// Функція для форматування часу (додає нуль попереду, якщо число < 10)
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10); // Двозначні мілісекунди

    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}<span class="ms">.${pad(milliseconds)}</span>`;
}

// Оновлення екрану
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    display.innerHTML = formatTime(elapsedTime);
}

// Кнопка "Почати"
startBtn.addEventListener('click', () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10); // Оновлення кожні 10 мс
    
    startBtn.disabled = true;
    pauseBtn.disabled = false;
});

// Кнопка "Пауза"
pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

// Кнопка "Скинути"
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    display.innerHTML = '00:00:00<span class="ms">.00</span>';
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});
