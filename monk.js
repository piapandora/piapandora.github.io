btnR.addEventListener('click', () => {  
    location.reload();
})

menu.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
})

colors.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
})

btnH.addEventListener('click', () => {  
    menu.style.opacity = 0
    colors.style.opacity = 0
})

btnF.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

const monk = document.querySelector('.monk')
const colorize = document.querySelector('.colorize')
const whitegray = document.querySelector('.whitegray')
const lightergray = document.querySelector('.lightergray')
const lightgray = document.querySelector('.lightgray')
const gray = document.querySelector('.gray')
const darkgray = document.querySelector('.darkgray')  
const darkergray = document.querySelector('.darkergray')  
const blackgray = document.querySelector('.blackgray')

function brightenWorld(){
    whitegray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    lightergray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    lightgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    gray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    darkgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    darkergray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
    blackgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + 'ff';
};

function colorizeMonk(){
    colorize.style.fill = "#ffc3aaff";
    gray.style.fill = "#ffa500ff";
    
}

let wakeUp = false;
let svgActive = false;
let clickNo = 0;

monk.addEventListener('click', function() {
    if (!wakeUp){
        monk.classList.remove('paused');
        colorizeMonk();
        clickNo++;
        svg.style.cursor = "pointer";
        wakeUp = true;
    }
});

svg.addEventListener('click', function() {
    if (wakeUp){
        clickNo++;
    }
    
    if (clickNo > 2){
        brightenWorld();
    }
});