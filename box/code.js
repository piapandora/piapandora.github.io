const WORKER_URL = "https://codex-vault.beyazkus.workers.dev";
const reqs       = (1 << 3) | (1 << 2) | 1;
let count      = 0;
let isBusy     = false;
let timerStart = false;
let timer;

async function handle() {
    if (!timerStart) {
        timerStart = true;
        timer = setTimeout(() => { count = 0; timerStart = false; }, 2666);
    }
    if (++count < reqs) return;
    clearTimeout(timer);
    count = 0;
    timerStart = false;
    if (isBusy) return;
    isBusy = true;
    try {
        const status = document.getElementById('code');
        const getRes = await fetch(`${WORKER_URL}?key=pandoraToggle`, { headers: { 'X-Vault-Key': pass } });
        let currentState = getRes.ok ? (await getRes.text()).trim() : "0";
        const newState = currentState === "1" ? "0" : "1";
        const postRes = await fetch(`${WORKER_URL}?key=pandoraToggle`, { 
            method: 'POST', 
            headers: { 'X-Vault-Key': pass }, 
            body: newState 
        });
        if (postRes.ok) {
            !!+newState ? console.log("✔") : console.log("✖");
        }
    } catch (e) {
        console.error("SYNC ERROR");
    } finally {
        isBusy = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const code = document.getElementById('code');
    if (code) {
        code.addEventListener('click', handle);
    }
});
