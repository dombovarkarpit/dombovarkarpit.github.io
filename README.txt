HORVÁTH KÁRPIT – STATIKUS WEBOLDAL

FÁJLOK
- index.html: a főoldal tartalma és ajánlatkérő űrlap (jelenleg demó)
- referenciak.html: külön referenciaoldal előtte–utána elrendezésű illusztrációkkal
- adatkezeles.html: adatkezelési tájékoztató tervezet
- impresszum.html: impresszum, a hiányzó vállalkozói adatok helyőrzőivel
- sutik.html: süti tájékoztató tervezet
- styles.css: megjelenés és mobilnézet
- script.js: mobilmenü, képválasztás és böngészőoldali ellenőrzések
- favicon.svg: böngészőikon

FONTOS – JOGI OLDALAK
Az adatkezelési tájékoztató, az impresszum és a süti tájékoztató ELŐKÉSZÍTETT TERVEZET, nem végleges jogi dokumentum. Éles közzététel előtt töltsd ki és ellenőrizd az összes [KITÖLTENDŐ] / [ELLENŐRIZENDŐ] részt. Különösen szükséges:
1. Az egyéni vállalkozó nyilvántartás szerinti teljes neve.
2. A hivatalos székhely, és ha releváns, telephely/levelezési cím.
3. Az egyéni vállalkozói nyilvántartási szám és az alkalmazandó adószám-adatok.
4. Nyilvános telefonszám (ha lesz).
5. A tényleges tárhelyszolgáltató neve, címe és elérhetősége.
6. A végleges űrlap-, e-mail- és fájltároló szolgáltatók, adatfeldolgozók és az adatfolyamok.
7. Az ajánlatkérésekre vonatkozó konkrét adatmegőrzési idő és annak indoka.
8. A tényleges tárhelyen használt sütik, naplók és külső erőforrások ellenőrzése.
9. A jogi szövegek szakértői ellenőrzése és a véglegesítés dátuma.

A megadott e-mail-cím beépült: dombovarkarpit@gmail.com.
A vállalkozó egyéni vállalkozóként, az oldal pedig egyelőre kizárólag érdeklődés/árajánlatkérés céljából van előkészítve; online megrendelés és szerződéskötés nincs beállítva.

ŰRLAP – JELENLEGI ÁLLAPOT
Az ajánlatkérő űrlap DEMÓ. A kötelező mezők ellenőrzése és a képfájlok böngészőoldali szűrése működik, de az űrlap NEM küld e-mailt, és NEM tölt fel fájlokat. Az adatkezelési oldal ezt egyértelműen jelzi.

A böngészőoldali képellenőrzés jelenlegi korlátai:
- JPG, PNG és WEBP fájltípusok engedélyezettek;
- legfeljebb 5 kép választható;
- képenként legfeljebb 10 MB engedélyezett.
Ezek kényelmi korlátozások, nem biztonsági garanciák: a fájltípus és a méret manipulálható, a böngésző nem végez megbízható vírusellenőrzést.

ÉLES ŰRLAPHOZ SZÜKSÉGES BIZTONSÁG
1. Külső űrlapkezelő vagy saját szerveroldali végpont szükséges. A GitHub Pages önmagában statikus tárhely, nem futtat szerveroldali fájlfeltöltést vagy vírusellenőrzést.
2. A szerver ellenőrizze a fájl tényleges tartalmát (MIME és fájlszignatúra/magic bytes), méretét és darabszámát.
3. A feltöltött fájlok kerüljenek elkülönített tárhelyre/karanténba, kártevővizsgálatra; képfájloknál lehetőség szerint biztonságos újrakódolás és metaadat-eltávolítás is történjen.
4. A fájlok ne fussanak le, ne legyenek közvetlenül publikusak, és ne e-mail csatolmányként érkezzenek. E-mailben csak értesítés és hozzáférés-vezérelt letöltési link menjen.
5. Legyen spamvédelem/rate limit, és a szolgáltató dokumentációjából ellenőrizni kell a fájltárolás, vírusvizsgálat, hozzáférés és adatmegőrzés részleteit.
6. Az űrlap aktiválása előtt frissíteni kell az adatkezelési tájékoztatót a valós adatfeldolgozókkal, célokkal és megőrzési időkkel.

A DOMAIN ÉLESÍTÉSE UTÁNI MÓDOSÍTÁS
Ha a GitHub Pages szolgál tárhelyként, a módosított fájlokat töltsd fel a repositoryba, majd Commit changes. A GitHub Pages automatikusan közzéteszi az új verziót a meglévő domainen. A domain nem változik attól, hogy a weboldal fájljait frissíted.

SEO
- Domain megadása után készíts sitemap.xml fájlt, majd add hozzá a Google Search Console-hoz.
- Készíts Google Cégprofilt a tényleges vállalkozási adatokkal.
- A hangulatképeket később cseréld saját, optimalizált fotókra és leíró alt szövegekre.

A fotók jelenleg Unsplash URL-ről töltődnek be, a betűkészlet pedig Google Fonts szolgáltatásból; megjelenítésükhöz internetkapcsolat szükséges. Ezek külső erőforrások, ezért az adatkezelési és süti tájékoztatót a végleges konfigurációhoz kell igazítani.
