/**
 * forty.js
 * Clean pipe for piapandora.com Cloudflare KV storage
 */

const FORTY_URL = "https://forty-gateway.beyazkus.workers.dev";

const fortyStorage = {
  /**
   * @param {string} key
   * @param {string} accessKey
   * @returns {Promise<string|null>}
   */
  getItem: async (key, accessKey) => {
    try {
      const res = await fetch(`${FORTY_URL}?key=${encodeURIComponent(key)}`, {
        method: "GET",
        headers: { "Access-Key": accessKey }
      });
      if (!res.ok) return null;
      return await res.text();
    } catch (e) {
      console.error("Forty GET Error:", e);
      return null;
    }
  },
  
  /**
   * @param {string} key
   * @param {any} value
   * @param {string} accessKey
   */
  setItem: async (key, value, accessKey) => {
    try {
      const res = await fetch(`${FORTY_URL}?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { 
          "Access-Key": accessKey,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ value })
      });
      return res.ok;
    } catch (e) {
      console.error("Forty POST Error:", e);
      return false;
    }
  },
  
  /**
   * @param {string} key
   * @param {string} accessKey
   */
  removeItem: async (key, accessKey) => {
    try {
      const res = await fetch(`${FORTY_URL}?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
        headers: { "Access-Key": accessKey }
      });
      return res.ok;
    } catch (e) {
      console.error("Forty DELETE Error:", e);
      return false;
    }
  }
};
