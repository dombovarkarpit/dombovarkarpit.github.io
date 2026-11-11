HORVÁTH KÁRPIT – STATIKUS WEBOLDAL

FÁJLOK
- index.html: főoldal és szöveges ajánlatkérő űrlap
- referenciak.html: referenciaoldal illusztrációkkal
- adatkezeles.html: adatkezelési tájékoztató
- impresszum.html: impresszum
- sutik.html: süti tájékoztató
- styles.css: megjelenés és mobilnézet
- script.js: mobilmenü, űrlapellenőrzés, EmailJS e-mail-küldés
- favicon.svg: böngészőikon

EMAILJS BEÁLLÍTÁS
- A weboldal az EmailJS böngészős SDK 5-ös verzióját tölti be a jsDelivr CDN-ről.
- A beküldés az EmailJS send() metódusával történik; a HTML-fájl cache-frissítő verzióparaméterrel tölti be a script.js fájlt.
- A Service ID, Template ID és Public Key be van állítva a script.js fájlban.
- Az űrlap mezőnevei: name, email, phone, city, address, furniture, details.
- Az EmailJS sablonban ezeknek megfelelő változókat kell használni: {{name}}, {{email}}, {{phone}}, {{city}}, {{address}}, {{furniture}}, {{details}}.
- Sikeres küldés esetén az űrlap visszajelzést ad és kiüríti a mezőket; sikertelen küldés esetén hibaüzenetet jelenít meg.
- A küldés dupla kattintás ellen védett; a böngészős SDK botvédelmi és 10 másodperces kliensoldali küldési korlátozást is használ.
- A Private Key nincs a weboldal kódjában. A Public Key böngészőben való használata az EmailJS normál működése.

EMAILJS-FIÓKBAN MÉG ELLENŐRIZENDŐ
1. Az Email Services résznél a Gmail-kapcsolat állapota legyen sikeres.
2. Az Email Templates résznél a címzett a dombovarkarpit@gmail.com legyen.
3. A sablon változónevei egyezzenek a fent felsoroltakkal; a Reply-To mező legyen {{email}}.
4. Az EmailJS szolgáltatásnál ellenőrizd a fiókhoz tartozó küldési és biztonsági beállításokat. Az ingyenes csomagban nem feltétlenül érhető el domain-whitelist.
5. A weboldal frissítése után valódi teszt-ajánlatkérést kell beküldeni, és ellenőrizni kell a beérkező leveleket és a Spam mappát is.

ŰRLAP ÉS ADATKEZELÉS
- Képfeltöltési lehetőség nincs; az űrlap csak szöveges adatokat kér.
- A beküldéshez az adatkezelési tájékoztató megismerését jelző négyzet bejelölése szükséges.
- Az adatkezelési tájékoztató, az impresszum és a süti tájékoztató továbbra is előkészített tervezet, nem végleges jogi dokumentum.
- Az EmailJS tényleges adatfeldolgozási feltételeit, a tárhelyszolgáltató adatait, az esetleges adattovábbításokat és a megőrzési időt az éles használat előtt ellenőrizni és a tájékoztatóban pontosítani kell.

VÁLLALKOZÓI ADATOK A DOKUMENTUMOKBAN
- Hivatalos név: Horváth József egyéni vállalkozó
- Székhely: 7252 Attala, Petőfi Sándor utca 24.
- Nyilvántartási szám: 60104241
- Adószám: 90769087-1-37
- Telefonszám: +36 70 266 2620
- E-mail: dombovarkarpit@gmail.com
- Külön telephely / eltérő levelezési cím: a megadott adatok szerint nincs.

MEGŐRZÉSI IDŐK
- Lezárt, meg nem valósult ajánlatkérés: legfeljebb 6 hónap.
- Teljesített megrendelés nem számviteli egyeztetési anyagai: legfeljebb 6 hónap a lezárástól.
- Számlák és könyvviteli elszámolást alátámasztó számviteli bizonylatok: legalább 8 év a számviteli törvény 169. § (2) bekezdése alapján.
- A weboldal önmagában nem törli automatikusan a Gmail leveleket; a törlést az adatkezelőnek a levelezési fiókban is végre kell hajtania.

JOGI ÉS TECHNIKAI MEGJEGYZÉSEK
- Nyilvántartó hatóság: Nemzeti Adó- és Vámhivatal (NAV).
- Tárhely: GitHub Pages / GitHub, Inc.
- Űrlaptovábbítás: EmailJS Pte. Ltd.; a kézbesítés Gmail-postafiókba történik.
- Nincs Google Analytics, Facebook Pixel vagy Google Maps beágyazás.
- A Google Fonts, Unsplash és jsDelivr külső erőforrásként szerepel.
- A három jogi dokumentumot éles közzététel előtt a tényleges működéssel össze kell vetni, és jogi szakértővel ellenőriztetni javasolt.

KAPCSOLATI E-MAIL
 dombovarkarpit@gmail.com

PUBLIKÁLÁS
A ZIP közvetlenül a fájlokat tartalmazza. Kicsomagolás után az index.html, script.js, styles.css és a többi fájl tartalmát töltsd fel a GitHub repository gyökérkönyvtárába. Ne hozz létre új horvath-karpit almappát a repositoryban. Ha a GitHub rákérdez, engedélyezd az azonos nevű fájlok felülírását, majd Commit changes. Az index.html-nek közvetlenül a repository gyökerében kell lennie. Ezután nyisd meg a https://dombovarkarpit.github.io/ oldalt, és nyomj Ctrl+F5-öt.


KAPCSOLATI GOMBOK
A főoldalon az e-mail-cím és a telefonszám kiemelt, kattintható kapcsolatfelvételi elemként jelenik meg az űrlap mellett.
