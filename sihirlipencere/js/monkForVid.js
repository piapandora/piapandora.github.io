const monk = document.querySelector('.monk');
const shadow1 = document.getElementById('shadow1');
const shadow2 = document.getElementById('shadow2');
let wakeUp = false;
// let svgActive = false;
svg.style.cursor = "default";


monk.addEventListener('click', function() {
    if (!wakeUp){
        monk.classList.remove('paused');
        shadow1.classList.add('shadowAnim');
        shadow2.classList.add('shadowAnim');
        colorizeMonk(monkIds);
        svg.style.cursor = "default";
        monk.style.cursor = "default";
        wakeUp = true;
        // asagidakileri sonradan ekledim
        let intervalForTimer = setInterval(function() {
            colorizeWorld();
        }, 7000);
        setTimeout(function() {
            clearInterval(intervalForTimer);
            monk.classList.add('paused');
            shadow1.classList.remove('shadowAnim');
            shadow2.classList.remove('shadowAnim');
            decolorizeWorld();
            svg.style.cursor = "default";
            monk.style.cursor = "pointer";
            wakeUp = false;
        }, 28000);
    }
})

function colorizeMonk(monkIds) {
    monkIds.forEach(([id, color]) => {
        document.getElementById(id).style.fill = color;
    })
}

// svg.addEventListener('click', function() {
//     if (wakeUp){
//         if (!svgActive) {
//             svgActive = true;
//         } else {
//             colorizeWorld();
//         }
//     }
// })

function randomColor(){
    return "#" + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + "ff";
}

function colorizeWorld(){
    worldIds.forEach((id) => {
        document.getElementById(id).style.fill = randomColor();
    })
}

function decolorizeWorld(){
    'path24', 'path16', 'rect1', 'path131', 'path13', 'path2', 'path15'
    document.getElementById('path24').style.fill = "#cbcbcb";
    document.getElementById('path16').style.fill = "#dddddd";
    document.getElementById('rect1').style.fill = "#aaaaaa";
    document.getElementById('path131').style.fill = "#808080";
    document.getElementById('path13').style.fill = "#555555";
    document.getElementById('path2').style.fill = "#343434";
    document.getElementById('path15').style.fill = "#222222";
    document.getElementById('path114').style.fill = "#dddddd";
}