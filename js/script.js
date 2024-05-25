btnR.addEventListener('click', () => {  
    location.reload();
})

let selectedColor = '#dddddd';
  
function selectColor(color) {
    selectedColor = color;
    }

function colorPath(pathId) {
    document.getElementById(pathId).style.fill = selectedColor;
    }

menu.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    // document.body.style.transition = 'background 1s ease';
})

colors.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    // document.body.style.transition = 'background 1s ease';
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
})