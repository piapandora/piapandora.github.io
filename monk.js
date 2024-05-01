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
    // colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
})

// colors.addEventListener("mouseenter", function() {
//     menu.style.opacity = 1;
//     colors.style.opacity = 1;
//     document.body.style.transition = 'background 1s ease';
// })

btnH.addEventListener('click', () => {  
    menu.style.opacity = 0
    // colors.style.opacity = 0
})

btnF.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});

const monk = document.querySelector('.monk')
const whitegray = document.querySelector('.whitegray')
const lightgray = document.querySelector('.lightgray')
const gray = document.querySelector('.gray')
const darkgray = document.querySelector('.darkgray')  
const blackgray = document.querySelector('.blackgray')

function standardWorld(){
    whitegray.style.fill = 'white';
    lightgray.style.fill = 'pink';
    gray.style.fill = 'orange';
    darkgray.style.fill = 'indigo';
    blackgray.style.fill = 'black';
};

function brightenWorld(){
    whitegray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
    lightgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
    gray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
    darkgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
    blackgray.style.fill = "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
};

function darkenWorld(){
    whitegray.style.fill = '#dddddd';
    lightgray.style.fill = '#aaaaaa';
    gray.style.fill = '#808080';
    darkgray.style.fill = '#555555';
    blackgray.style.fill = '#222222';
};

function transitionSpeed(n){
    monk.style.transitionDuration = n + 's';
    whitegray.style.transitionDuration = n + 's';
    lightgray.style.transitionDuration = n + 's';
    gray.style.transitionDuration = n + 's';
    darkgray.style.transitionDuration = n + 's';
    blackgray.style.transitionDuration = n + 's';
};

monk.addEventListener('click', function() {
    transitionSpeed(3);
    brightenWorld();
});

monk.addEventListener('mouseenter', function() {monk.classList.remove('paused'); transitionSpeed(3); standardWorld();});
monk.addEventListener('mouseleave', function() {monk.classList.add('paused'); transitionSpeed(1); darkenWorld();});