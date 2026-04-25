(function() {
    const s = window.location.search.substring(1);
    if (Vault.fingerprint(s) !== '706A') {
        document.documentElement.innerHTML = "";
        window.location.replace("https://piapandora.com");
    }
})();