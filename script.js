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

const photoInput = document.getElementById('photos');
const fileList = document.getElementById('fileList');
const form = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function validatePhotos(files) {
  if (files.length > MAX_FILES) return `Legfeljebb ${MAX_FILES} képet választhat ki.`;
  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `A(z) „${file.name}” fájl nem támogatott. Csak JPG, PNG vagy WEBP kép választható.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `A(z) „${file.name}” fájl nagyobb 10 MB-nál. Kérjük, válasszon kisebb képet.`;
    }
  }
  return '';
}

photoInput?.addEventListener('change', () => {
  const files = [...photoInput.files];
  const error = validatePhotos(files);
  if (error) {
    photoInput.value = '';
    fileList.textContent = error;
    fileList.classList.add('file-list-error');
    return;
  }
  fileList.classList.remove('file-list-error');
  fileList.textContent = files.length
    ? files.map(file => `${file.name} (${(file.size / 1024 / 1024).toFixed(1)} MB)`).join(' · ')
    : 'Még nincs kiválasztott kép.';
});

form?.addEventListener('submit', event => {
  event.preventDefault();
  const photoError = validatePhotos([...(photoInput?.files || [])]);
  if (photoError) {
    formStatus.textContent = photoError;
    return;
  }
  formStatus.textContent = 'A bemutató űrlap ellenőrzése sikeres, de az adatok és a képek még nem kerülnek elküldésre. Az e-mailes küldés és a biztonságos fájlfeltöltés szerveroldali szolgáltatás beállítása után aktiválható.';
});
