# Permis Atestat — redesign

Proiect local React 19 + TypeScript + Vite 6 + Tailwind CSS 4, realizat după [permisatestat.ro](https://permisatestat.ro/). Interfață în limba română, adaptată pentru telefon, tabletă și desktop.

## Pornire

Necesită Node.js 22.12+ și npm.

```sh
npm install
npm run dev
```

Deschide adresa afișată de Vite, în mod normal `http://localhost:5173`.

```sh
npm run check
npm run build
npm run preview
```

Build-ul este generat în `dist/`. Navigarea folosește adrese fără hash, precum `/contact`. Fișierul `public/.htaccess`, copiat automat în `dist/`, permite accesarea directă și reîncărcarea paginilor pe Apache/cPanel. Încarcă și acest fișier ascuns pe hosting.

Pentru verificarea codului și regenerarea folderului `dist/`, rulează `npm run deploy`. Comanda pregătește fișierele local; pentru actualizarea site-ului public, încarcă apoi conținutul folderului `dist/` pe hosting prin FileZilla.

## Conținut și funcționalități

- Acasă: servicii, abordare, etape de pregătire, întrebări frecvente.
- Despre noi: textul integral al prezentării originale.
- Școala de șoferi: conduită preventivă și toate recomandările din pagina originală.
- Atestate: 16 specializări, căutare fără diferențierea diacriticelor, filtre cu stare în URL, pagini de ghid, toate cele 16 documente DOCX descărcabile, tarife și text integral din secțiunile expandabile originale.
- Consultanță: toate serviciile originale, reorganizate în șase grupuri.
- Contact: telefon, e-mail, WhatsApp și formular cu trimitere prin PHP + Resend.
- Confidențialitate, pagină 404, navigare mobilă, focus vizibil, link de salt la conținut și suport pentru reducerea mișcării.

## Date și limitări

Conținutul a fost preluat la 19 octombrie 2026. `src/data/original.json` păstrează textele și sursele; `src/data/documents.json` conține paragrafele extrase din cele 16 documente; fișierele originale sunt în `public/documents/`.

Tarifele și textele normative sunt păstrate din sursă, nu reprezintă o reverificare juridică. Interfața cere confirmarea condițiilor și tarifelor înaintea înscrierii. Codurile CAEN din original sunt REV 2 și sunt marcate ca atare.

Pagina originală de contact nu conține adresă, e-mail sau program. Numărul `+40771303601` provine din configurarea publică a butonului WhatsApp al site-ului. Nu au fost inventate date de contact, categorii oferite, statistici sau testimoniale.

Formularul păstrează datele în memoria paginii până la trimiterea către endpointul PHP. Resend expediază solicitarea către ALANDIS. Nu există conturi, baze de date sau plăți online. Publicarea se face manual în cPanel.

## Verificare în browser

Cu serverul de dezvoltare pornit pe `http://127.0.0.1:5173`:

```sh
node scripts/check-ui.mjs
```

`check-ui.mjs` este scriptul istoric al interfeței și conține așteptări pentru catalogul și formularul anterior. Pentru formularul actual, rulează `node scripts/check-contact.mjs`; acesta folosește Playwright și Microsoft Edge, verifică validarea, erorile, reîncercarea și succesul prin răspunsuri API simulate. Testele PHP rulează cu `php -n tests/contact-api.php`.

## Fișiere principale

- `src/main.tsx` — pagini, rutare, componente și interacțiuni.
- `src/styles.css` — Tailwind, identitate vizuală și adaptare responsive.
- `src/data/` — conținut preluat din surse.
- `public/images/`, `public/fonts/`, `public/documents/` — resurse locale.
- `scripts/` — importul inițial al sursei și verificarea interfeței. Rularea importului suprascrie datele; nu este necesară pentru pornirea sau build-ul proiectului.

## Imagini și fonturi

Fotografia drumului: [Venti Views / Unsplash](https://unsplash.com/photos/NliTYm_jD5o). Imaginile de pregătire și imaginile arhivate provin de pe site-ul original. Fontul Manrope este servit local, cu licența SIL Open Font License în `public/fonts/OFL.txt`. Pictograme: Lucide.

## Publicare în cPanel și formular Resend

Instrucțiunile actuale sunt în [deployment/RESEND-CPANEL.md](deployment/RESEND-CPANEL.md). Încarcă prin FileZilla conținutul `dist` în document root-ul domeniului, inclusiv fișierul ascuns `.htaccess`, necesar navigării fără hash. Local, folosește `http://127.0.0.1:5173/`.

Formularul din `src/ContactForm.tsx` trimite prin `public/api/contact.php` către Resend și apoi la `office@alandis.ro`. Serverul necesită PHP 8.1+ cu cURL. Configurația privată se instalează în afara `public_html`, folosind modelul `deployment/resend.config.example.php`. Nu introduce cheia API în sursele frontend.

GitHub Actions rulează doar verificările și build-ul; nu mai publică pe GitHub Pages. Trimiterea reală nu funcționează prin serverul Vite, care nu execută PHP. Testul `node scripts/check-contact.mjs` simulează API-ul fără trimitere de e-mailuri.
