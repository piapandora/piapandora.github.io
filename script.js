btnR.addEventListener('click', () => {  
    path1.style.fill = '#dddddd'
    path2.style.fill = '#dddddd'
    path3.style.fill = '#dddddd'
    path4.style.fill = '#dddddd'
    path5.style.fill = '#dddddd'
    path6.style.fill = '#dddddd'
    path7.style.fill = '#dddddd'
    path8.style.fill = '#dddddd'
    path9.style.fill = '#dddddd'
    path10.style.fill = '#dddddd'

    selectedColor = '#dddddd'
})

let selectedColor = '#dddddd'
  
function selectColor(color) {
    selectedColor = color;
    }

function colorPath(pathId) {
    const path = document.getElementById(pathId);
    path.style.fill = selectedColor;
    }

/* setTimeout(delayedCodeForMenu, 5000)
function delayedCodeForMenu() {
    menu.style.opacity = 0;}
    
setTimeout(delayedCodeForColors, 5000)
function delayedCodeForColors() {
    colors.style.opacity = 0;} */

menu.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = '#3c3c3c'
})

colors.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
    document.body.style.background = '#3c3c3c'
})

btnH.addEventListener('click', () => {  
    menu.style.opacity = 0
    colors.style.opacity = 0
    document.body.style.background = '#222222'
})

/* const btnF = document.getElementById('btnF'); ??? */

btnF.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});