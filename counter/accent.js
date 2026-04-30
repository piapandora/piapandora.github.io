(async () => {
    try {
        const res = await fetch("https://codex-vault.beyazkus.workers.dev?key=pandoraToggle", { 
            headers: { 'X-Vault-Key': typeof pass !== 'undefined' ? pass : '' } 
        });

        if (res.ok && (await res.text()).trim() === "1") {
            document.documentElement.style.setProperty('--accent', "#26f280");
        }
    } catch (e) {
        // Fail silently
    }
})();