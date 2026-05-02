/**
 * pandora.js
 * Clean pipe for piapandora.com Cloudflare KV storage
 */

const PANDORA_URL = "https://pandora-gateway.beyazkus.workers.dev";

const pandoraStorage = {
  /**
   * @param {string} key
   * @param {string} accessKey
   * @returns {Promise<string|null>}
   */
  getItem: async (key, accessKey) => {
    try {
      const res = await fetch(`${PANDORA_URL}?key=${encodeURIComponent(key)}`, {
        method: "GET",
        headers: { "Access-Key": accessKey }
      });
      if (!res.ok) return null;
      return await res.text();
    } catch (e) {
      console.error("Pandora GET Error:", e);
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
      const res = await fetch(`${PANDORA_URL}?key=${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { 
          "Access-Key": accessKey,
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ value })
      });
      return res.ok;
    } catch (e) {
      console.error("Pandora POST Error:", e);
      return false;
    }
  },
  
  /**
   * @param {string} key
   * @param {string} accessKey
   */
  removeItem: async (key, accessKey) => {
    try {
      const res = await fetch(`${PANDORA_URL}?key=${encodeURIComponent(key)}`, {
        method: "DELETE",
        headers: { "Access-Key": accessKey }
      });
      return res.ok;
    } catch (e) {
      console.error("Pandora DELETE Error:", e);
      return false;
    }
  }
};