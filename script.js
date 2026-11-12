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

  let widgetId = null;
  let currentToken = '';
  let frameReady = false;

  // Az Apps Script HTML Service a webalkalmazáson belül saját sandbox iframe-et is létrehozhat.
  // A helper megkeresi az Apps Script iframe-en belüli leszármazott kereteket is.
  function getEmbeddedWindows() {
    const found = [];
    const queue = [{ win: frame.contentWindow, depth: 0 }];
    const seen = new Set();
    while (queue.length) {
      const current = queue.shift();
      if (!current.win || seen.has(current.win) || current.depth > 5) continue;
      seen.add(current.win);
      let count = 0;
      try { count = Math.min(20, current.win.frames.length); } catch (_) { count = 0; }
      for (let i = 0; i < count; i++) {
        try {
          const child = current.win.frames[i];
          if (child && !seen.has(child)) {
            found.push(child);
            queue.push({ win: child, depth: current.depth + 1 });
          }
        } catch (_) { /* egy másik, nem hozzáférhető keret kihagyható */ }
      }
    }
    return [frame.contentWindow, ...found];
  }

  function postToEmbeddedForm(message) {
    getEmbeddedWindows().forEach(target => {
      try { target.postMessage(message, '*'); } catch (_) { /* a többi belső keretnek még küldhetünk */ }
    });
  }

  function isEmbeddedFormSource(source) {
    return getEmbeddedWindows().some(target => target === source);
  }

  function sendTokenToFrame() {
    if (frameReady && currentToken) {
      postToEmbeddedForm({ type: 'hk-turnstile-token', token: currentToken });
    }
  }

  function resetTurnstile() {
    currentToken = '';
    if (window.turnstile && widgetId !== null) {
      try { window.turnstile.reset(widgetId); } catch (_) { /* a következő frissítés újra renderelhető */ }
    }
    postToEmbeddedForm({ type: 'hk-turnstile-expired' });
  }

  window.addEventListener('message', event => {
    // Az Apps Script belső sandbox iframe-jéből is érkezhet üzenet, nem feltétlenül a külső keretből.
    if (!event.data || typeof event.data !== 'object' || !isEmbeddedFormSource(event.source)) return;
    let originIsGoogle = false;
    try {
      const originUrl = new URL(event.origin);
      originIsGoogle = originUrl.protocol === 'https:' &&
        (originUrl.hostname === 'script.google.com' || originUrl.hostname.endsWith('googleusercontent.com'));
    } catch (_) { originIsGoogle = false; }
    if (!originIsGoogle) return;
    const data = event.data;
    if (data.type === 'hk-form-ready') {
      frameReady = true;
      sendTokenToFrame();
    } else if (data.type === 'hk-form-resize') {
      const height = Number(data.height);
      if (Number.isFinite(height)) frame.style.height = Math.min(2600, Math.max(700, height + 12)) + 'px';
    } else if (data.type === 'hk-request-turnstile') {
      if (currentToken) sendTokenToFrame();
      else {
        turnstileNotice.textContent = 'Kérjük, végezze el a Cloudflare biztonsági ellenőrzését az űrlap elküldése előtt.';
        turnstileShell.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (data.type === 'hk-form-sent' || data.type === 'hk-form-finished') {
      resetTurnstile();
      turnstileNotice.textContent = 'Az ellenőrzés a következő ajánlatkéréshez újra elvégzendő.';
    }
  });

  frame.addEventListener('load', () => {
    frameReady = false;
    // Többször kérünk kézfogást, így a későn létrejövő belső sandbox iframe sem marad ki.
    const pingForm = () => postToEmbeddedForm({ type: 'hk-parent-ping' });
    pingForm();
    setTimeout(pingForm, 350);
    setTimeout(pingForm, 1000);
    setTimeout(pingForm, 1800);
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

  frame.src = appUrl;
  loadTurnstile();
})();
