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

async function handle() {
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

        try {
            const response = await fetch('https://piapandora.com/jason/data.json');
            const json = await response.json();
            
            let data = json.data;

            for (let i = 0; i < reqs; i++) {
                data = atob(data);
            }

            window.location.href = data;
        } catch (error) {}
    }
}
