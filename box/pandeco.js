const PangeaDecoder = (() => {
    const _K = atob("amFzb25zLXBhbmdlYQ==");
    const _xor = (text) => {
        let res = "";
        for (let i = 0; i < text.length; i++) {
            res += String.fromCharCode(text.charCodeAt(i) ^ _K.charCodeAt(i % _K.length));
        }
        return res;
    };
    return {
        decode: (input) => {
            try {
                const obj = typeof input === "string" ? JSON.parse(input) : input;
                const manifest = JSON.parse(_xor(atob(obj.m)));
                const rawBase64 = _xor(atob(obj.b));
                return `data:${manifest.t};base64,${rawBase64}`;
            } catch (e) {
                console.error("Pangea Error: Invalid format or key mismatch.");
                return null;
            }
        }
    };
})();