let target1 = document.getElementById('target1');
let target2 = document.getElementById('target2');
let target3 = document.getElementById('target3');
let target4 = document.getElementById('target4');
let target5 = document.getElementById('target5');
let target6 = document.getElementById('target6');
let scoreBox = document.getElementById('scoreBox');
let timerBox = document.getElementById('timerBox');
let startScreen = document.getElementById('startScreen');
let gameScreen = document.getElementById('gameScreen');
let winScreen = document.getElementById('winScreen');
let loseScreen = document.getElementById('loseScreen');

let playerScore = 0;
let timer = 0;
scoreBox.textContent = "Senin Puanın: " + playerScore;
timerBox.textContent = "Rakibinin Puanı: " + timer;

function randomMilliseconds() {
    return Math.floor(Math.random() * (5000)) + 2500;
}

function beginPlay() {
    playerScore = 0;
    timer = 0;
    scoreBox.textContent = "Senin Puanın: " + playerScore;
    timerBox.textContent = "Rakibinin Puanı: " + timer;
    
    startScreen.style.display = "none";
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
    gameScreen.style.display = "block";
    
    let intervalForTimer = setInterval(function() {
        timer++;
        timerBox.textContent = "Rakibinin Puanı: " + timer;
        if (playerScore >= 100) {
            clearInterval(intervalForTimer);
            }
        if (timer >= 100) {
            loseGame()
            clearInterval(intervalForTimer);
            }
    }, 1000)
}

function score(pathId) {
    let path = document.getElementById(pathId);
    path.style.display = "none";
    
    playerScore++;
    scoreBox.textContent = "Senin Puanın: " + playerScore;
    if (playerScore >= 100) {
        winGame()
        }
    
    setTimeout(function() {
        path.style.display = 'block';
    }, randomMilliseconds());
}

function winGame() {
    gameScreen.style.display = "none";
    winScreen.style.display = "block";
}

function loseGame() {
    gameScreen.style.display = "none";
    loseScreen.style.display = "block";
}