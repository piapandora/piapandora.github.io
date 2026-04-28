const friday = (s, p) => {
    try {
        return p === "robinsoncruso" ? 
            [...Array((1 << 3) | (1 << 2) | 1)].reduce(d => atob(d), s.replace(/[a-zA-Z]/g, c => 
                String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= 'M' ? p.length : -p.length))
            ) + "=".repeat((4 - s.length) & 3)) : undefined;
    } catch (e) {
        return null;
    }
};
