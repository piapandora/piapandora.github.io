svg.style.cursor = "pointer";

function randomColor(){
    return "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + "ff";
}

function colorizeBackground(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor;
    document.getElementById(pathId + "2").style.fill = thisColor;
    document.getElementById(pathId + "3").style.fill = thisColor;

    }

function colorizeDoggo(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor; 
    document.getElementById(pathId + "2").style.fill = thisColor; 
    document.getElementById(pathId + "3").style.fill = thisColor; 

    }

function colorizeBall(pathId) {
    let thisColor = randomColor();
    document.getElementById(pathId + "0").style.fill = thisColor;
    document.getElementById(pathId + "1").style.fill = thisColor;
    document.getElementById(pathId + "2").style.fill = thisColor;
    document.getElementById(pathId + "3").style.fill = thisColor;
    
    }