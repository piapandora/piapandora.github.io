let scoreBox = document.getElementById('scoreBox');
let timerBox = document.getElementById('timerBox');
let startScreen = document.getElementById('startScreen');
let gameScreen = document.getElementById('gameScreen');
let winScreen = document.getElementById('winScreen');
let loseScreen = document.getElementById('loseScreen');
let playButton = document.getElementById('play-btn');
let bigPlayButton = document.getElementById('big-play-btn');
let gameOver = false;
let playerScore = 0;
let timer = 0;
let limit = 100;

construct();

function randomMilliseconds() {
    return Math.floor(Math.random() * (5000)) + baseTime;
}

function construct() {
    refreshScores();

    setTimeout(function() {
        bigPlayButton.style.display = "block";
    }, 1000);
}

function beginPlay() {
    gameOver = false;
    playerScore = 0;
    timer = 0;
    refreshScores();
    
    startScreen.style.display = "none";
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
    playButton.style.display = "none";
    bigPlayButton.style.display = "none";

    gameScreen.style.display = "block";
    
    let intervalForTimer = setInterval(function() {
        if (!gameOver) {
            timer++;
            refreshScores();
        }
    
        if (playerScore >= limit) {
            clearInterval(intervalForTimer);
        }
        
        if (timer >= limit) {
            loseGame();
            clearInterval(intervalForTimer);
        }
    }, 1000);
}

function score(pathId) {
    if (!gameOver) {
        let path = document.getElementById(pathId);

        let originalOnClick = path.getAttribute("onclick");
        path.removeAttribute("onclick");

        path.classList.add(selectedAnim);
        
        setTimeout(function() {
            path.style.display = "none";
        }, 300);

        setTimeout(function() {
            path.classList.remove(selectedAnim);
        }, 500);
        
        playerScore++;
        refreshScores();
        
        if (playerScore >= limit) {
            winGame();
        }
        
        setTimeout(function() {
            path.setAttribute("onclick", originalOnClick);
            path.style.display = 'block';
        }, randomMilliseconds());
    }
}

function winGame() {
    gameOver = true;
    gameScreen.style.display = "none";
    winScreen.style.display = "block";
    setTimeout(function() {
        playButton.style.display = "block";
    }, 1000);
}

function loseGame() {
    gameOver = true;
    gameScreen.style.display = "none";
    loseScreen.style.display = "block";
    setTimeout(function() {
        playButton.style.display = "block";
    }, 1000);
}