window.SHOP_CONFIG = {
  // Посилання на Google Apps Script (таблиця "Elfbar"). Поки порожньо — демо-режим, перемикачі зберігаються лише в цьому браузері.
  API_URL: "https://script.google.com/macros/s/AKfycbyuvQ_xDCmBRTvwXckJdxxjnI9ykaRAyGgPSvv11nPgUhKImQrVJwq-9knSVOxlcmWPGA/exec",
  ORDER_USERNAME: "Elfbarfreiburgde"
};

window.Avail = {
  async load() {
    const api = SHOP_CONFIG.API_URL;
    if (!api) {
      try { return new Set(JSON.parse(localStorage.getItem("demo_off") || "[]")); } catch (e) { return new Set(); }
    }
    try {
      const r = await fetch(api + "?t=" + Date.now());
      const j = await r.json();
      return new Set(j.off || []);
    } catch (e) { return new Set(); }
  },
  async set(id, on, key) {
    const api = SHOP_CONFIG.API_URL;
    if (!api) {
      let off = new Set();
      try { off = new Set(JSON.parse(localStorage.getItem("demo_off") || "[]")); } catch (e) {}
      on ? off.delete(id) : off.add(id);
      try { localStorage.setItem("demo_off", JSON.stringify([...off])); } catch (e) {}
      return { ok: true };
    }
    const r = await fetch(api, { method: "POST", body: JSON.stringify({ key, id, on }) });
    return r.json();
  }
};
