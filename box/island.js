document.addEventListener('DOMContentLoaded', () => {
    // Target the specific logo from your index.html
    const logo = document.getElementById('logo');
    
    if (logo) {
        logo.style.cursor = 'default'; // Keep it looking innocent
        logo.addEventListener('click', handleSecretClicks);
    }
});

let clickCount = 0;
let clickTimer;
const REQUIRED_CLICKS = 13;
const TIME_WINDOW = 5000; // 5 Seconds to complete the ritual

function handleSecretClicks() {
    // Clear the reset timer on every click
    clearTimeout(clickTimer);
    
    clickCount++;
    
    // Start a fresh reset timer
    // If they stop clicking for 2 seconds, reset the count
    clickTimer = setTimeout(() => {
        if (clickCount > 0) {
            console.log("Vault sequence timed out.");
            clickCount = 0;
        }
    }, 2000);

    // Check if the ritual is complete
    if (clickCount >= REQUIRED_CLICKS) {
        openTheIsland();
        clickCount = 0;
        clearTimeout(clickTimer);
    }
}

function openTheIsland() {
    // This is where you trigger your login overlay
    const auth = document.getElementById('auth');
    if (auth) {
        auth.style.display = 'flex';
        // If you have a password input, focus it immediately
        const passInput = document.getElementById('passInput');
        if (passInput) passInput.focus();
        
        console.log("Welcome to the Island.");
    } else {
        // Fallback for testing before you add the HTML overlay
        alert("The hidden gate is open, but the login UI is missing.");
    }
}
