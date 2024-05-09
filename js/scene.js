let currentScene = 0;
const totalScenes = document.getElementById("svg").children.length;
refreshFooter();

function nextScene() {
  if (currentScene < (totalScenes - 1)){
  document.getElementById(`scene${currentScene}`).style.display = "none";
  currentScene++
  document.getElementById(`scene${currentScene}`).style.display = "block";
  refreshFooter();
  }
}

function prevScene() {
  if (currentScene > 0){
  document.getElementById(`scene${currentScene}`).style.display = "none";
  currentScene--
  document.getElementById(`scene${currentScene}`).style.display = "block";
  refreshFooter();
  }
}

function refreshFooter(){
  document.getElementById('message').textContent = sceneMessages[currentScene];

  if (currentScene == 0){
    document.getElementById("prev-btn").classList.add('footer-btn-inactive');
    document.getElementById("prev-btn").classList.remove('footer-btn-active');
    document.getElementById("special-prev-btn").style.display = "none";

  }
  else {
    document.getElementById("prev-btn").classList.add('footer-btn-active');
    document.getElementById("prev-btn").classList.remove('footer-btn-inactive');
    document.getElementById("special-prev-btn").style.display = "block";
  }

  if (currentScene == (totalScenes - 1)){
    document.getElementById("next-btn").classList.add('footer-btn-inactive');
    document.getElementById("next-btn").classList.remove('footer-btn-active');
    document.getElementById("next-btn").classList.remove('footer-btn-focus');
    document.getElementById("special-next-btn").style.display = "none";
  }
  else {
    document.getElementById("next-btn").classList.add('footer-btn-active');
    document.getElementById("next-btn").classList.add('footer-btn-focus');
    document.getElementById("next-btn").classList.remove('footer-btn-inactive');
    document.getElementById("special-next-btn").style.display = "block";
  }

  if (currentScene == 0 || currentScene == (totalScenes - 1)){
    document.getElementById("special-color-btn").style.width = "1010px";
  }
  else {
    document.getElementById("special-color-btn").style.width = "740px";
  }  
}

function changeHue() {
  let randomHue = Math.floor(Math.random() * 360);
  for (let i = 0; i < totalScenes; i++) {
    document.getElementById(`scene${i}`).style.filter = "sepia(100%) saturate(200%) brightness(80%) hue-rotate(" + randomHue + "deg)";
    }
}