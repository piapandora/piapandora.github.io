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
let playButton = document.getElementById('play-btn');
let bigPlayButton = document.getElementById('big-play-btn');
let gameOver = false;
let playerScore = 0;
let timer = 0;
let limit = 100;

construct();

function randomMilliseconds() {
    return Math.floor(Math.random() * (5000)) + 2500;
}

function construct() {
    scoreBox.innerHTML = "<span class='message-label'>Senin Puanın:</span> <span class='message-value'>" + playerScore + "</span>";
    timerBox.innerHTML = "<span class='message-label'>Rakibinin Puanı:</span> <span class='message-value'>" + timer + "</span>";

    setTimeout(function() {
        bigPlayButton.style.display = "block";
    }, 1000);
}

function beginPlay() {
    gameOver = false;
    playerScore = 0;
    timer = 0;
    scoreBox.innerHTML = "<span class='message-label'>Senin Puanın:</span> <span class='message-value'>" + playerScore + "</span>";
    timerBox.innerHTML = "<span class='message-label'>Rakibinin Puanı:</span> <span class='message-value'>" + timer + "</span>";
    
    startScreen.style.display = "none";
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
    playButton.style.display = "none";
    bigPlayButton.style.display = "none";

    gameScreen.style.display = "block";
    
    let intervalForTimer = setInterval(function() {
        if (!gameOver) {
            timer++;
            timerBox.innerHTML = "<span class='message-label'>Rakibinin Puanı:</span> <span class='message-value'>" + timer + "</span>";
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
        path.classList.add('fadeOut');
        
        setTimeout(function() {
            path.style.display = "none";
        }, 500);

        setTimeout(function() {
            path.classList.remove('fadeOut');
        }, 700);
        
        playerScore++;
        scoreBox.innerHTML = "<span class='message-label'>Senin Puanın:</span> <span class='message-value'>" + playerScore + "</span>";
        
        if (playerScore >= limit) {
            winGame();
        }
        
        setTimeout(function() {
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