function randomColor(){
    return "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + "ff";
}

function colorizeBackground(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor;
    document.getElementById(pathId + "2").style.fill = thisColor;
    document.getElementById(pathId + "3").style.fill = thisColor;
    document.getElementById(pathId + "4").style.fill = thisColor;
    document.getElementById(pathId + "5").style.fill = thisColor;
    document.getElementById(pathId + "6").style.fill = thisColor;
    document.getElementById(pathId + "7").style.fill = thisColor;
    }

function colorizeDoggo(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor; 
    document.getElementById(pathId + "2").style.fill = thisColor; 
    document.getElementById(pathId + "3").style.fill = thisColor; 
    document.getElementById(pathId + "4").style.fill = thisColor; 
    document.getElementById(pathId + "5").style.fill = thisColor; 
    document.getElementById(pathId + "6").style.fill = thisColor; 
    document.getElementById(pathId + "7").style.fill = thisColor; 
    }

function colorizeBall(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor;
    document.getElementById(pathId + "2").style.fill = thisColor;
    document.getElementById(pathId + "3").style.fill = thisColor;
    document.getElementById(pathId + "4").style.fill = thisColor;
    document.getElementById(pathId + "5").style.fill = thisColor;
    document.getElementById(pathId + "6").style.fill = thisColor;
    }