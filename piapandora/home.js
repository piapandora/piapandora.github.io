const s = window.location.search.substring(1);

if (s) {
    window.history.replaceState({}, '', window.location.pathname);
}

(function() {
    if (Vault.fingerprint(s) !== '706A') {
        document.documentElement.innerHTML = "";
        window.location.replace("https://www.piapandora.com/");
    }
})();
