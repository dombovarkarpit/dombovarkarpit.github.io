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
// A Public Key nyilvános kulcs; Private Key-t soha ne tegyünk a weboldalba.
const EMAILJS_SERVICE_ID = 'service_lx4oy2r';
const EMAILJS_TEMPLATE_ID = 'template_il8ap3l';
const EMAILJS_PUBLIC_KEY = 'mIzsWJ6m0hoGdt7A2';

const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');
const consent = document.getElementById('privacyConsent');
const consentError = document.getElementById('consentError');
const submitButton = form?.querySelector('button[type="submit"]');
const originalButtonContent = submitButton?.innerHTML ?? '';
let isSending = false;

// Az EmailJS SDK-t az index.html tölti be közvetlenül ez előtt a fájl előtt.
const emailJsAvailable = Boolean(
  window.emailjs && typeof window.emailjs.init === 'function' && typeof window.emailjs.send === 'function'
);

if (emailJsAvailable) {
  window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

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

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (!consent?.checked) {
    if (consentError) consentError.hidden = false;
    consent?.setAttribute('aria-invalid', 'true');
    consent?.focus();
    if (formStatus) formStatus.textContent = '';
    return;
  }

  updateConsentMessage();

  if (!emailJsAvailable) {
    if (formStatus) {
      formStatus.textContent = 'Az e-mail-küldő modul nem töltődött be. Frissítse az oldalt, vagy írjon közvetlenül a dombovarkarpit@gmail.com címre.';
    }
    return;
  }

  isSending = true;
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Küldés folyamatban…';
  }
  if (formStatus) formStatus.textContent = 'Az ajánlatkérés küldése folyamatban van…';

  // A sablonban szereplő {{...}} változónevekhez illesztett adatok.
  const templateParams = {
    name: form.elements.namedItem('name').value.trim(),
    email: form.elements.namedItem('email').value.trim(),
    phone: form.elements.namedItem('phone').value.trim(),
    city: form.elements.namedItem('city').value.trim(),
    address: form.elements.namedItem('address').value.trim(),
    furniture: form.elements.namedItem('furniture').value,
    details: form.elements.namedItem('details').value.trim()
  };

  try {
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
    if (formStatus) {
      formStatus.textContent = 'Köszönjük! Az ajánlatkérést sikeresen továbbítottuk. Hamarosan felvesszük Önnel a kapcsolatot.';
    }
    form.reset();
    if (consentError) consentError.hidden = true;
    consent?.removeAttribute('aria-invalid');
  } catch (error) {
    console.error('EmailJS küldési hiba:', error);
    const detail = typeof error?.text === 'string' ? ` (${error.text})` : '';
    if (formStatus) {
      formStatus.textContent = `Az ajánlatkérés küldése nem sikerült${detail}. Kérjük, próbálja meg később, vagy írjon közvetlenül a dombovarkarpit@gmail.com címre.`;
    }
  } finally {
    isSending = false;
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonContent;
    }
  }
});
