btnR.addEventListener('click', () => {  
    location.reload();
})

// let selectedColor = '#dddddd'
  
// function selectColor(color) {
//     selectedColor = color;
//     }

// function colorPath(pathId) {
//     const path = document.getElementById(pathId);
//     path.style.fill = selectedColor;
//     }

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

// function transitionSpeed(n){
//     monk.style.transitionDuration = n + 's';
//     colorize.style.transitionDuration = n + 's';
//     whitegray.style.transitionDuration = n + 's';
//     lightgray.style.transitionDuration = n + 's';
//     gray.style.transitionDuration = n + 's';
//     darkgray.style.transitionDuration = n + 's';
//     blackgray.style.transitionDuration = n + 's';
// };

monk.addEventListener('click', function() {
    brightenWorld();
});

let executed = false;
monk.addEventListener('mouseenter', function() {
    if (!executed) {
        monk.classList.remove('paused');
        colorizeMonk();
        executed = true;
    }
});