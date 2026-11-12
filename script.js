const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Google Apps Script + Cloudflare Turnstile fotófeltöltéses ajánlatkérő.
(function initializeQuoteForm() {
  const config = window.HK_FORM_CONFIG || {};
  const shell = document.getElementById('quoteFormShell');
  const notice = document.getElementById('formSetupNotice');
  const frame = document.getElementById('quoteFormFrame');
  const turnstileShell = document.getElementById('turnstileShell');
  const turnstileWidget = document.getElementById('turnstileWidget');
  const turnstileNotice = document.getElementById('turnstileNotice');

  if (!shell || !frame || !notice) return;

  const appUrl = String(config.appsScriptUrl || '').trim();
  const siteKey = String(config.turnstileSiteKey || '').trim();
  if (!appUrl || !siteKey) {
    notice.hidden = false;
    shell.hidden = true;
    return;
  }

  let parsedAppUrl;
  try { parsedAppUrl = new URL(appUrl); } catch (_) { parsedAppUrl = null; }
  if (!parsedAppUrl || parsedAppUrl.origin !== 'https://script.google.com' ||
      !parsedAppUrl.pathname.startsWith('/macros/s/') || !parsedAppUrl.pathname.endsWith('/exec')) {
    notice.textContent = 'Az ajánlatkérő háttérszolgáltatás címe hibás. Kérjük, vegye fel velünk a kapcsolatot e-mailben vagy telefonon.';
    notice.hidden = false;
    shell.hidden = true;
    return;
  }

  notice.hidden = true;
  shell.hidden = false;
  turnstileShell.hidden = false;
  frame.hidden = false;
  frame.src = appUrl;

  let widgetId = null;
  let currentToken = '';
  let frameLoaded = false;

  function sendTokenToFrame() {
    if (frameLoaded && currentToken) {
      frame.contentWindow.postMessage({ type: 'hk-turnstile-token', token: currentToken }, '*');
    }
  }

  function resetTurnstile() {
    currentToken = '';
    if (window.turnstile && widgetId !== null) {
      try { window.turnstile.reset(widgetId); } catch (_) { /* a következő frissítés újra renderelhető */ }
    }
    frame.contentWindow?.postMessage({ type: 'hk-turnstile-expired' }, '*');
  }

  window.addEventListener('message', event => {
    // Az iframe forrását pontosan ellenőrizzük; más ablakból nem fogadunk üzenetet.
    if (event.source !== frame.contentWindow || !event.data || typeof event.data !== 'object') return;
    const data = event.data;
    if (data.type === 'hk-form-resize') {
      const height = Number(data.height);
      if (Number.isFinite(height)) frame.style.height = Math.min(2600, Math.max(700, height + 12)) + 'px';
    } else if (data.type === 'hk-request-turnstile') {
      if (currentToken) sendTokenToFrame();
      else {
        turnstileNotice.textContent = 'Kérjük, jelölje be a Cloudflare biztonsági ellenőrzését, majd küldje el újra az űrlapot.';
        turnstileShell.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (data.type === 'hk-form-sent' || data.type === 'hk-form-finished') {
      resetTurnstile();
      turnstileNotice.textContent = 'Az ellenőrzés a következő ajánlatkéréshez újra elvégzendő.';
    }
  });

  frame.addEventListener('load', () => {
    frameLoaded = true;
    sendTokenToFrame();
  });

  function renderTurnstile() {
    if (!window.turnstile || widgetId !== null) return;
    widgetId = window.turnstile.render(turnstileWidget, {
      sitekey: siteKey,
      action: 'quote_submit',
      theme: 'light',
      size: 'flexible',
      callback: token => {
        currentToken = String(token || '');
        turnstileNotice.textContent = 'Biztonsági ellenőrzés sikeres. Az űrlap elküldhető.';
        sendTokenToFrame();
      },
      'expired-callback': () => {
        currentToken = '';
        frame.contentWindow?.postMessage({ type: 'hk-turnstile-expired' }, '*');
        turnstileNotice.textContent = 'A biztonsági ellenőrzés lejárt. Kérjük, végezze el újra.';
      },
      'error-callback': () => {
        currentToken = '';
        turnstileNotice.textContent = 'A biztonsági ellenőrzés nem tölthető be. Kérjük, frissítse az oldalt.';
      }
    });
  }

  function loadTurnstile() {
    if (window.turnstile) { renderTurnstile(); return; }
    const existing = document.querySelector('script[data-hk-turnstile]');
    if (existing) {
      existing.addEventListener('load', renderTurnstile, { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    script.dataset.hkTurnstile = 'true';
    script.onload = renderTurnstile;
    script.onerror = () => {
      turnstileNotice.textContent = 'A biztonsági ellenőrzés nem tölthető be. Kérjük, próbálja meg később.';
    };
    document.head.appendChild(script);
  }

  loadTurnstile();
})();
