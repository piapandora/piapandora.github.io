const pass = ((s, p) => {
    try {
        return p === "pandoraisland" ? 
            [...Array((1 << 3) | (1 << 2) | 1)].reduce(d => atob(d), s.replace(/[a-zA-Z]/g, c => 
                String.fromCharCode(c.charCodeAt(0) + (c.toUpperCase() <= 'M' ? p.length : -p.length))
            ) + "=".repeat((4 - s.length) & 3)) : undefined;
    } catch (e) {
        return null;
    }
})("Iz0jq2DlHKyIJTkKLGWbI1LjMT9JIyy3Jxp5JSWfoQAKn2Z1IwSXp2WRGyuuZHcHIzcTF2ZlFxIHoTubGIIjIIMgpRgGZHy5H2gJIJWUnT9HIyM3IyMnqTASMSEAoRcWIz10n1qUFxqwFRWKLGSjnScJJzgJZKOWL0q4H2WUqmOJZaEiHwSJqSAeMSuvE2uuJIETLH0kJaAKoHMeHyETJyxjMQEIZxcKH2gjI2WHEKqMrxcULmSBqIIgnSAyoKuKIz1jG1DjZUuwEycLLyuFJSEJnRAFoScLMHMBIJWIpRqMZSM3IwWXIIWLMScyn3OVJKcTG2EJIaAKoJufLyubo1LkMQEvZxy4ITgxIzWTJyEMoSMuL1MfpycRDx9vE3uKIwW4G1MKFxqwEycKLyuFZ1MdFxgGEyMMJxMxnTRkpTuKoScuIQWBp2ASMTuFZauHISpko2VkJKuKoR5GGJkTZ1EInT9uIx5TI2kFJzWTJzuMZIcGIwSjE1EeAIAvEz93I2kJn01TJyuGn2EdHxInI1MdGz9xoSckHzg0nx1eAHuMIIceLHqSrySeoSqJEHcbI1MxH1LkGaIHoSWcHwSXIIMTHxWxZQSFHSDjCD",atob("cGFuZG9yYWlzbGFuZA=="));
