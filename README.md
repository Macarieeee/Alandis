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

Build-ul pentru publicare este generat în `dist/`. Serverul de găzduire trebuie să redirecționeze rutele aplicației către `index.html` (SPA fallback), fără a rescrie fișierele existente.

## Conținut și funcționalități

- Acasă: servicii, abordare, etape de pregătire, întrebări frecvente.
- Despre noi: textul integral al prezentării originale.
- Școala de șoferi: conduită preventivă și toate recomandările din pagina originală.
- Atestate: 16 specializări, căutare fără diferențierea diacriticelor, filtre cu stare în URL, pagini de ghid, toate cele 16 documente DOCX descărcabile, tarife și text integral din secțiunile expandabile originale.
- Consultanță: toate serviciile originale, reorganizate în șase grupuri.
- Contact: telefon, WhatsApp și formular care compune mesajul pentru WhatsApp. Nu simulează trimiterea și nu necesită backend.
- Confidențialitate, pagină 404, navigare mobilă, focus vizibil, link de salt la conținut și suport pentru reducerea mișcării.

## Date și limitări

Conținutul a fost preluat la 19 octombrie 2026. `src/data/original.json` păstrează textele și sursele; `src/data/documents.json` conține paragrafele extrase din cele 16 documente; fișierele originale sunt în `public/documents/`.

Tarifele și textele normative sunt păstrate din sursă, nu reprezintă o reverificare juridică. Interfața cere confirmarea condițiilor și tarifelor înaintea înscrierii. Codurile CAEN din original sunt REV 2 și sunt marcate ca atare.

Pagina originală de contact nu conține adresă, e-mail sau program. Numărul `+40771303601` provine din configurarea publică a butonului WhatsApp al site-ului. Nu au fost inventate date de contact, categorii oferite, statistici sau testimoniale.

Formularul păstrează datele doar în starea paginii. Trimiterea efectivă se face de utilizator în WhatsApp. Nu există conturi, baze de date, plăți sau serviciu de e-mail. Publicarea este configurat? prin GitHub Actions.

## Verificare în browser

Cu serverul de dezvoltare pornit pe `http://127.0.0.1:5173`:

```sh
node scripts/check-ui.mjs
```

Scriptul folosește Playwright și Microsoft Edge instalat local (`channel: msedge`). Verifică rutele, cele 16 documente, filtrele, căutarea, starea fără rezultate, compunerea mesajului WhatsApp, meniul mobil, secțiunile expandabile, depășirea lățimii ecranului și erorile de browser. Capturile sunt salvate în `artifacts/`.

## Fișiere principale

- `src/main.tsx` — pagini, rutare, componente și interacțiuni.
- `src/styles.css` — Tailwind, identitate vizuală și adaptare responsive.
- `src/data/` — conținut preluat din surse.
- `public/images/`, `public/fonts/`, `public/documents/` — resurse locale.
- `scripts/` — importul inițial al sursei și verificarea interfeței. Rularea importului suprascrie datele; nu este necesară pentru pornirea sau build-ul proiectului.

## Imagini și fonturi

Fotografia drumului: [Venti Views / Unsplash](https://unsplash.com/photos/NliTYm_jD5o). Imaginile de pregătire și imaginile arhivate provin de pe site-ul original. Fontul Manrope este servit local, cu licența SIL Open Font License în `public/fonts/OFL.txt`. Pictograme: Lucide.

## GitHub Pages

?n repository, deschide Settings ? Pages ?i selecteaz? **GitHub Actions** la Source. Fiecare push pe `main` verific? ?i public? site-ul la https://Macarieeee.github.io/Alandis/. Pentru rularea local?, folose?te adresa cu `/Alandis/` afi?at? de Vite.
