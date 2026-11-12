/*
 * Horváth Kárpit – publikus űrlapkonfiguráció
 * A Google Apps Script WEB APP URL-je és a Turnstile SITE KEY kerül ide.
 * Titkos kulcsot (Turnstile Secret Key, Google-jelszó stb.) TILOS ide írni.
 */
window.HK_FORM_CONFIG = {
  appsScriptUrl: 'https://script.google.com/macros/s/AKfycbzlZ1Bjm91QY4C2xIMAjImYXhbpqrJWWPmADr3mZLkyDzJd9WhZ2_Qz002iTgElBd9YdQ/exec',       // Példa: https://script.google.com/macros/s/....../exec
  turnstileSiteKey: '0x4AAAAAAF96bv7J2ames_vC'     // Cloudflare Turnstile publikus Site Key
};
