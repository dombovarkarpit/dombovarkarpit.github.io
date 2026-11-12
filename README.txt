HORVÁTH KÁRPIT – FOTÓFELTÖLTÉSES AJÁNLATKÉRŐ
Verzió: 2026. november 12.

A CSOMAG TARTALMA
- index.html: főoldal, a fotófeltöltős ajánlatkérő helye és a kiemelt elérhetőségek
- referenciak.html: referenciaoldal
- adatkezeles.html: frissített adatkezelési tájékoztató-tervezet
- impresszum.html: impresszum
- sutik.html: süti tájékoztató-tervezet
- styles.css: megjelenés és mobilnézet
- script.js: navigáció, Google Apps Script iframe és Cloudflare Turnstile összekötése
- form-config.js: az Apps Script webalkalmazás URL-je és a Turnstile publikus Site Key
- favicon.svg: böngészőikon
- AppsScript/Code.gs: Google Apps Script háttérkód
- AppsScript/Form.html: az Apps Scriptben megjelenő, fotófeltöltős űrlap
- AppsScript/TELEPITESI_UTMUTATO.txt: részletes telepítési útmutató

FONTOS – MÉG NINCS AKTIVÁLVA
A fotófeltöltős űrlap addig nem fog működni, amíg a Google Apps Script webalkalmazást nem telepíted, a Cloudflare Turnstile widgetet létre nem hozod, és a form-config.js fájlban meg nem adod a két publikus beállítást.
A beállítások elvégzéséig a főoldalon az e-mailes és telefonos kapcsolatfelvétel látható. A ZIP GitHubra történő feltöltése önmagában nem aktiválja a háttérszolgáltatást.

FÉNYKÉPFELTÖLTÉSI KORLÁTOK
- Legfeljebb 5 fénykép.
- Egy eredeti kép legfeljebb 10 MB lehet.
- Az eredeti képek együttes mérete legfeljebb 25 MB lehet.
- A böngésző a képeket legfeljebb 2200 pixel hosszú oldalra méretezi, JPEG-be alakítja és újrakódolja; ezzel az EXIF-metaadatok eltávolításra kerülnek.
- A továbbított e-mail-mellékletek összmérete legfeljebb 18 MB lehet. Ha a tömörített képek ennél nagyobbak, a rendszer kéri a képek számának vagy méretének csökkentését.
- Csak fényképek (JPG/JPEG, PNG, WebP) választhatók ki. A háttérrendszer a továbbított adatot is ellenőrzi.
- A képek nem kerülnek Google Drive-ba vagy más külön fájltárhelyre; közvetlenül a vállalkozó Gmail-postafiókjába küldött levél mellékletei lesznek.

BIZTONSÁGI ELEMEK
- Cloudflare Turnstile kliensoldali widget és kötelező szerveroldali tokenellenőrzés.
- A Turnstile titkos kulcsa kizárólag az Apps Script Script Properties tárhelyén tárolható.
- A háttérrendszer ellenőrzi a kötelező mezőket, az e-mail címet, az adatkezelési jelölőnégyzetet, a képek JPEG-aláírását és méretét.
- Rejtett honeypot mező, e-mail-cím szerinti rövid időkorlát, valamint napi 70 üzenetes kódoldali korlát.
- A napi MailApp kvóta ellenőrzése is megtörténik.
- A script nem menti a képeket Drive-ba. A Gmail-postafiókban érkező e-mailek törlését a weboldal nem végzi automatikusan.

RÉSZLETES BEÁLLÍTÁS
Lásd: AppsScript/TELEPITESI_UTMUTATO.txt.

EMAILJS
Az új fotófeltöltős megoldás nem használja az EmailJS-t. A korábbi EmailJS-fiók és sablon nem szükséges az új rendszerhez; csak akkor kapcsold ki vagy töröld, amikor az új folyamatot már sikeresen letesztelted.
