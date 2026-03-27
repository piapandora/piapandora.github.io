const Vault = (() => {
    class SeededRandom {
        constructor(seedString) {
            // djb2: Initial bit distribution
            let h = 5381;
            for (let i = 0; i < seedString.length; i++) {
                h = ((h << 5) + h) + seedString.charCodeAt(i);
                h |= 0; 
            }

            // THE STRETCH: 10,000 rounds of Xorshift to stall brute-force
            for (let i = 0; i < 10000; i++) {
                h ^= (h << 13);
                h ^= (h >>> 17);
                h ^= (h << 5);
                h |= 0;
            }
            this.seed = h;
        }

        next() {
            // LCG: Numerical Recipes constants for 31-bit integers
            this.seed = (1103515245 * this.seed + 12345) & 0x7FFFFFFF;
            return this.seed / 2147483648;
        }
    }

    const getTable = (pass) => {
        let table = Array.from({length: 256}, (_, i) => i);
        let rng = new SeededRandom(pass);
        for (let i = table.length - 1; i > 0; i--) {
            const j = Math.floor(rng.next() * (i + 1));
            [table[i], table[j]] = [table[j], table[i]];
        }
        return table;
    };

    return {
        // Returns a 4-char hex ID to verify password accuracy
        fingerprint: (pass) => {
            if (!pass) return "----";
            const rng = new SeededRandom(pass);
            return (rng.seed >>> 0).toString(16).substring(0, 4).toUpperCase();
        },

        // API Key -> Map String (CSV)
        generate: (key, pass) => {
            if (!key || !pass) return "";
            const table = getTable(pass);
            return key.split('').map((char, i) => {
                const charCode = char.charCodeAt(0) & 0xFF;
                const keyCharIndex = table.indexOf(charCode);
                const passCharValue = pass.charCodeAt(i % pass.length);
                let shift = (keyCharIndex - passCharValue - i) % 256;
                return shift < 0 ? shift + 256 : shift;
            }).join(',');
        },

        // Map String (CSV) -> API Key
        reconstruct: (mapStr, pass) => {
            if (!mapStr || !pass) return "";
            const table = getTable(pass);
            const map = mapStr.split(',').map(Number);
            return map.map((shift, i) => {
                const passCharValue = pass.charCodeAt(i % pass.length);
                let targetIndex = (shift + passCharValue + i) % 256;
                if (targetIndex < 0) targetIndex += 256;
                return String.fromCharCode(table[targetIndex % 256]);
            }).join('');
        }
    };
})();