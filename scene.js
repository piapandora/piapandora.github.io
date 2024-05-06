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

  }
  else {
    document.getElementById("prev-btn").classList.add('footer-btn-active');
    document.getElementById("prev-btn").classList.remove('footer-btn-inactive');
  }
  
  if (currentScene == (totalScenes - 1)){
    document.getElementById("next-btn").classList.add('footer-btn-inactive');
    document.getElementById("next-btn").classList.remove('footer-btn-active');
    document.getElementById("next-btn").classList.remove('footer-btn-focus');

  }
  else {
    document.getElementById("next-btn").classList.add('footer-btn-active');
    document.getElementById("next-btn").classList.add('footer-btn-focus');
    document.getElementById("next-btn").classList.remove('footer-btn-inactive');
  }
}  