const Reshift = (() => {
    const CHUNK_SIZE = 64 * 1024;
    const TAG_SIZE = 16;
    const HEADER_SIZE = 128;
    const VERSION_BYTE = 0x34;
    const enc = new TextEncoder();

    const buildNonce = (m, i) => { 
        const n = new Uint8Array(12); 
        n.set(m.slice(0, 8)); 
        new DataView(n.buffer).setUint32(8, i, false); 
        return n; 
    };

    const buildAAD = (i, f) => { 
        const b = new Uint8Array(5); 
        const d = new DataView(b.buffer); 
        d.setUint32(0, i, false); 
        d.setUint8(4, f ? 1 : 0); 
        return b; 
    };

    const getMarker = (s) => [0xAA, 0xBB, 0xCC, 0xDD].map((b, i) => b ^ s[i]);

    const deriveKey = async (pw, salt) => {
        const base = await crypto.subtle.importKey(
            "raw", 
            enc.encode(pw.normalize("NFKC")), 
            { name: "PBKDF2" }, 
            false, 
            ["deriveKey"]
        );
        return crypto.subtle.deriveKey(
            { name: "PBKDF2", salt, iterations: 300000, hash: "SHA-512" }, 
            base, 
            { name: "AES-GCM", length: 256 }, 
            false, 
            ["decrypt"]
        );
    };

    return {
        reconstruct: async (blob, key) => {
            const headerBuf = new Uint8Array(await blob.slice(0, HEADER_SIZE).arrayBuffer());
            if (headerBuf[48] !== VERSION_BYTE) throw new Error("VERSION_MISMATCH");

            const salt = headerBuf.slice(0, 32);
            const masterNonce = headerBuf.slice(32, 44);
            const marker = headerBuf.slice(44, 48);

            const expectedMarker = getMarker(salt);
            if (marker.some((b, i) => b !== expectedMarker[i])) throw new Error("AUTH_FAIL");

            const cryptoKey = await deriveKey(key, salt);
            let chunks = [];
            let index = 0, offset = HEADER_SIZE;

            while (offset < blob.size) {
                const isFinal = (offset + CHUNK_SIZE + TAG_SIZE >= blob.size);
                const sliceSize = isFinal ? (blob.size - offset) : (CHUNK_SIZE + TAG_SIZE);
                const encryptedBuf = await blob.slice(offset, offset + sliceSize).arrayBuffer();
                index++;

                const dec = await crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: buildNonce(masterNonce, index), additionalData: buildAAD(index, isFinal) }, 
                    cryptoKey, 
                    encryptedBuf
                );
                chunks.push(new Uint8Array(dec));
                offset += encryptedBuf.byteLength;
            }

            const finalBlob = new Blob(chunks);
            const arrayBuf = await finalBlob.arrayBuffer();
            let view = new Uint8Array(arrayBuf);
            if (!(view[0] === 80 && view[1] === 75 && view[2] === 3 && view[3] === 4)) {
                view[0] = 80; view[1] = 75; view[2] = 3; view[3] = 4;
            }
            
            return new Blob([view], { type: "application/zip" });
        }
    };
})();