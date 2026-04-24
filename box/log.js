document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log');
    
    if (log) {
        log.style.cursor = 'default';
        log.addEventListener('click', handle);
    }
});

let count = 0;
let timer;
const reqs = 13;
const interval = 3000;

function handle() {
    clearTimeout(timer);
    count++;
    timer = setTimeout(() => {
        if (count > 0) {
            console.log("zzz");
            count = 0;
        }
    }, interval);

    if (count >= reqs) {
        openLog();
        count = 0;
        clearTimeout(timer);
    }
}

function openLog() {
	alert("Loggy log.");
}