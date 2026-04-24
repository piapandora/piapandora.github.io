document.addEventListener('DOMContentLoaded', () => {
    const log = document.getElementById('log');
    
    if (log) {
        log.style.cursor = 'default';
        log.addEventListener('click', handleSecretClicks);
    }
});

let clickCount = 0;
let clickTimer;
const REQUIRED_CLICKS = 13;
const TIME_WINDOW = 3000;

function handleSecretClicks() {
    clearTimeout(clickTimer);
    clickCount++;
    clickTimer = setTimeout(() => {
        if (clickCount > 0) {
            console.log("Vault sequence timed out.");
            clickCount = 0;
        }
    }, 2000);

    if (clickCount >= REQUIRED_CLICKS) {
        openLog();
        clickCount = 0;
        clearTimeout(clickTimer);
    }
}

function openLog() {
	alert.log("Loggy log.");
}
