let scoreBox = document.getElementById('scoreBox');
let timerBox = document.getElementById('timerBox');
let backScreen = document.getElementById('backScreen');
let startScreen = document.getElementById('startScreen');
let gameScreen = document.getElementById('gameScreen');
let winScreen = document.getElementById('winScreen');
let loseScreen = document.getElementById('loseScreen');
let winCurtain = document.getElementById('winCurtain');
let loseCurtain = document.getElementById('loseCurtain');
let playButton = document.getElementById('play-btn');
let bigPlayButton = document.getElementById('big-play-btn');
let ding = document.getElementById('myAudio');
let gameOver = false;
let playerScore = 0;
let timer = 0;
let limit = 50;

construct();

function randomMilliseconds() {
    return Math.floor(Math.random() * (randomTime)) + baseTime;
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
    backScreen.style.filter = "grayscale(100%) sepia(100%) saturate(200%) brightness(66%) hue-rotate(250deg)";
    refreshScores();
    hideAll();

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
    }, timerSpeed);
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
        
        playerScore % 5 == 0 ? ding.play() : null;

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
    winCurtain.style.display = "block";
    winScreen.style.display = "flex";
    setTimeout(function() {
        playButton.style.display = "block";
    }, 1000);
}

function loseGame() {
    gameOver = true;
    gameScreen.style.display = "none";
    loseCurtain.style.display = "block";
    loseScreen.style.display = "flex";
    setTimeout(function() {
        playButton.style.display = "block";
    }, 1000);
}

function hideAll() {
    winCurtain.style.display = "none";
    loseCurtain.style.display = "none";
    startScreen.style.display = "none";
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
    playButton.style.display = "none";
    bigPlayButton.style.display = "none";
}

// function hideAllTargets() {
//     for (let i = 0; i < targets.length; i++) {
//         document.getElementById(targets[i]).display = "none";
//     }
// }

// document.getElementById('winCurtain') !== null ? winCurtain.style.display = "none" : null;

// document.getElementById(`myAudio-${pathId}`).play();