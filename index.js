function timeToString(time) {
    let diffInHrs = time / 3600000; // В 1 часе 3600000 миллисекунд. Разделив наше время на это число мы получим значение в часах.
    let hh = Math.floor(diffInHrs); // Округляем значение
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

let startTime;
let lastTime = 0;
let interval;
const value = document.querySelector('.value');

function startSec() {
  startTime = Date.now() - lastTime; // Текущее времмя в мс минус последнее
  interval = setInterval(() => {
    lastTime = Date.now() - startTime; // текущее время минус время старта
    value.innerHTML = timeToString(lastTime);
  }, 10);
}

const buttonStarts = document.querySelectorAll('.button--start');
const panelActive = document.querySelector('.controls-active');
const buttonPause = document.querySelector('.button--pause');
const panelPause = document.querySelector('.controls-paused');
const buttonReset = document.querySelector('.button--reset');
const circleButton = document.querySelector('.button--lap');
const panelInitial = document.querySelector('.controls-initial')

for (let startButton of buttonStarts){
    startButton.addEventListener('click', startSec);
    startButton.addEventListener('click', ()=>{
        panelActive.classList.remove('hidden');
        panelPause.classList.add('hidden');
        panelInitial.classList.add('hidden');
    });
}

let arr = []; 
const table = document.querySelector('.table');
function checkTime(){
    let currentTime = timeToString(lastTime); 
    arr.push(currentTime);
    table.insertAdjacentHTML('beforeend', ` 
    <div class="table-row">
        <div class="table-cell">Круг${arr.length}</div>
        <div class="table-cell">${currentTime}</div>
    </div>
    `)
}
circleButton.addEventListener('click', checkTime);

buttonPause.addEventListener('click', ()=>{
    panelActive.classList.add('hidden');
    panelPause.classList.remove('hidden');
    clearInterval(interval);
})

function clearArrTable(){
    table.remove();
    arr = [];
    lastTime = 0;
    value.innerHTML = timeToString(lastTime);
    panelActive.classList.add('hidden');
    panelInitial.classList.remove('hidden');
    panelPause.classList.add('hidden');
}
buttonReset.addEventListener('click', clearArrTable);
