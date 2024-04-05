btnR.addEventListener('click', () => {  
    location.reload();
})

let selectedColor = '#dddddd'
  
function selectColor(color) {
    selectedColor = color;
    }

function colorPath(pathId) {
    const path = document.getElementById(pathId);
    path.style.fill = selectedColor;
    }

menu.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
    // document.body.style.background = '#222222'
})

colors.addEventListener("mouseenter", function() {
    menu.style.opacity = 1;
    colors.style.opacity = 1;
    document.body.style.transition = 'background 1s ease';
    // document.body.style.background = '#222222'
})

btnH.addEventListener('click', () => {  
    menu.style.opacity = 0
    colors.style.opacity = 0
    // document.body.style.background = '#222222'
})

btnF.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
});