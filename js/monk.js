const monk = document.querySelector('.monk');
const shadow1 = document.getElementById('shadow1');
const shadow2 = document.getElementById('shadow2');
let wakeUp = false;
let svgActive = false;
svg.style.cursor = "default";


monk.addEventListener('click', function() {
    if (!wakeUp){
        monk.classList.remove('paused');
        shadow1.classList.add('shadowAnim');
        shadow2.classList.add('shadowAnim');
        colorizeMonk(monkIds);
        svg.style.cursor = "crosshair";
        monk.style.cursor = "crosshair";
        wakeUp = true;
    }
})

function colorizeMonk(monkIds) {
    monkIds.forEach(([id, color]) => {
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