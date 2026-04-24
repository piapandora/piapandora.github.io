document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log');
    if (log) {
        log.style.cursor = 'default';
        log.addEventListener('click', handle);
    }
});

let count = 0;
let timerStart = false;
let timer;
const reqs = 13;
const interval = 2666;

function handle() {
    if (!timerStart) {
        timerStart = true;
        timer = setTimeout(() => {
            count = 0;
            timerStart = false;
        }, interval);
    }

    count++;

    if (count >= reqs) {
        clearTimeout(timer);
        count = 0;
        timerStart = false;
        window.location.href = "https://piapandora.com/enter/"; 
    }
}
