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

// EmailJS – a böngészőben használt nyilvános azonosítók.
// A Private Key soha nem kerülhet a weboldal forráskódjába.
const EMAILJS_SERVICE_ID = 'service_lx4oy2r';
const EMAILJS_TEMPLATE_ID = 'template_il8ap3l';
const EMAILJS_PUBLIC_KEY = 'mIzsWJ6m0hoGdt7A2';

if (window.emailjs) {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
      id: 'horvath-karpit-ajanlatkeres',
      throttle: 10000
    }
  });
}

const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');
const consent = document.getElementById('privacyConsent');
const consentError = document.getElementById('consentError');
const submitButton = form?.querySelector('button[type="submit"]');
const originalButtonContent = submitButton?.innerHTML ?? '';
let isSending = false;

function updateConsentMessage() {
  if (!consent || !consentError) return;
  if (consent.checked) {
    consentError.hidden = true;
    consent.removeAttribute('aria-invalid');
  }
}
consent?.addEventListener('change', updateConsentMessage);

form?.addEventListener('submit', async event => {
  event.preventDefault();
  if (isSending) return;

  if (!consent?.checked) {
    if (consentError) consentError.hidden = false;
    consent?.setAttribute('aria-invalid', 'true');
    consent?.focus();
    if (formStatus) formStatus.textContent = '';
    return;
  }

  updateConsentMessage();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!window.emailjs) {
    if (formStatus) {
      formStatus.textContent = 'Az e-mail-küldő szolgáltatás jelenleg nem érhető el. Kérjük, próbálja újra később, vagy írjon a dombovarkarpit@gmail.com címre.';
    }
    return;
  }

  isSending = true;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Küldés folyamatban…';
  }
  if (formStatus) formStatus.textContent = 'Az ajánlatkérés küldése folyamatban van…';

  try {
    await window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    formStatus.textContent = 'Köszönjük! Az ajánlatkérést sikeresen továbbítottuk. Hamarosan felvesszük Önnel a kapcsolatot.';
    form.reset();
    if (consentError) consentError.hidden = true;
    consent?.removeAttribute('aria-invalid');
  } catch (error) {
    console.error('EmailJS küldési hiba:', error);
    formStatus.textContent = 'Az ajánlatkérés küldése nem sikerült. Kérjük, próbálja meg később, vagy írjon közvetlenül a dombovarkarpit@gmail.com címre.';
  } finally {
    isSending = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;
    }
  }
});
