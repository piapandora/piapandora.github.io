let scoreBox = document.getElementById('scoreBox');
let timerBox = document.getElementById('timerBox');
let scoreLabel = document.getElementById('scoreLabel');
let timerLabel = document.getElementById('timerLabel');
let backScreen = document.getElementById('backScreenSea');
let startScreen = document.getElementById('startScreen');
let gameScreen = document.getElementById('gameScreen');
let winScreen = document.getElementById('winScreen');
let loseScreen = document.getElementById('loseScreen');
let winCurtain = document.getElementById('winCurtainSea');
let loseCurtain = document.getElementById('loseCurtainSea');
let playButton = document.getElementById('play-btn');
let bigPlayButton = document.getElementById('big-play-btn');
let ding = document.getElementById('myAudio');
let gameOver = false;
let playerScore = 0;
// let yaramazScore = 0;
let timer = 0;
let limit = 50;
let baseTime = 1000;
let randomTime = 1000;
let timerSpeed = 2200;
let selectedAnim = 'fadeOut';
// const targets = ['image1-15', 'image1-88', 'image1-39' ,'image1-433', 'image1-9'];
const targets = ['img1', 'img2', 'img3' ,'img4', 'img5'];
let forbiddenFruit;

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
    backScreen.style.filter = "grayscale(100%) sepia(100%) saturate(200%) brightness(66%) hue-rotate(100deg)";
    refreshScores();
    hideAllButGame();

    let intervalForTimer = setInterval(function() {
        if (!gameOver) {
            timer++;
            refreshScores();
        }
    
        if (playerScore >= limit) {
            clearInterval(intervalForTimer);
            clearInterval(intervalForChooser);
        }
        
        if (timer >= limit) {
            clearInterval(intervalForTimer);
            clearInterval(intervalForChooser);
            loseGame();
        }
    }, timerSpeed);

    let intervalForChooser = setInterval(function() {
        let randomTarget = Math.floor(Math.random() * targets.length);

        for (let i = 0; i < targets.length; i++) {
            if (i == randomTarget && targets[i] != forbiddenFruit){
                document.getElementById(targets[i]).style.display = "block";
            }
            else {
                document.getElementById(targets[i]).style.display = "none";
            }
        }
    }, randomMilliseconds());
}

function score(pathId) {
    if (!gameOver) {
        let path = document.getElementById(pathId);
        
        let originalOnClick = path.getAttribute("onclick");
        path.removeAttribute("onclick");
        
        path.classList.add(selectedAnim);

        setTimeout(function() {
            path.style.transform = "translateY(-2000px)";
            forbiddenFruit = pathId;
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
            path.style.transform = "translateY(0)";
        }, timerSpeed - 100);
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

function hideAllButGame() {
    winCurtain.style.display = "none";
    loseCurtain.style.display = "none";
    startScreen.style.display = "none";
    winScreen.style.display = "none";
    loseScreen.style.display = "none";
    playButton.style.display = "none";
    bigPlayButton.style.display = "none";

    for (let i = 0; i < targets.length; i++) {
        document.getElementById(targets[i]).style.display = "none";
    }

    gameScreen.style.display = "block";
}

function refreshScores() {
    scoreLabel.innerHTML = "<span class='message-label-yellow'>Puan</span>";
    scoreBox.innerHTML = "<span class='message-value'>" + playerScore + "</span>";
    timerBox.innerHTML = "<span class='message-value'>" + timer + "</span>";
    timerLabel.innerHTML = "<span class='message-label-yellow'>Zaman</span>";
}

// function hideAllTargets() {
//     let randomTarget = Math.floor(Math.random() * 4);
//     for (let i = 0; i < targets.length; i++) {
//         document.getElementById(targets[i]).style.display = "none";
//     }
//     document.getElementById(targets[randomTarget]).style.display = "block";
// }

// document.getElementById('winCurtain') !== null ? winCurtain.style.display = "none" : null;

// document.getElementById(`myAudio-${pathId}`).play();