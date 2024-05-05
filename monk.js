const monk = document.querySelector('.monk');
let wakeUp = false;
let svgActive = false;

monk.addEventListener('click', function() {
    if (!wakeUp){
        monk.classList.remove('paused');
        colorizeMonk(monkIds);
        svg.style.cursor = "pointer";
        wakeUp = true;
    }
})

function colorizeMonk(monkIds) {
    monkIds.forEach(([id, color]) => {
        document.getElementById(id).style.fill = color;
        document.getElementById(id).style.fill = color;
    })
}

svg.addEventListener('click', function() {
    if (wakeUp){
        if (!svgActive) {
            svgActive = true;
        } else {
            colorizeWorld();
        }
    }
})

function randomColor(){
    return "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + "ff";
}

function colorizeWorld(){
    worldIds.forEach((id) => {
        document.getElementById(id).style.fill = randomColor();
    })
}