# Formular ALANDIS — Resend + PHP pe cPanel

Site-ul se încarcă prin FileZilla; nu necesită Vercel, Cloudflare, Node.js pe hosting sau Composer. PHP expediază prin API-ul HTTPS Resend. Destinația este `office@alandis.ro`. Formularul cere nume, telefon și serviciu; mesajul este opțional. Răspunsul către client se face telefonic, fiindcă formularul nu cere e-mail.

## 1. În Resend

1. Deschide **Domains → Add domain** și adaugă **`notificari.alandis.ro`**. Configurația livrată folosește expeditorul `ALANDIS <formular@notificari.alandis.ro>`. Dacă alegi alt domeniu verificat, modifică și `from` în configurația PHP.
2. Copiază **exact** înregistrările DNS afișate de Resend (tip, nume, valoare, prioritate dacă există). Adaugă-le unde sunt administrate nameserverele domeniului: în **cPanel → Zone Editor → Manage** dacă DNS-ul este la hosting, altfel la furnizorul DNS. Nu înlocui MX-urile existente ale `alandis.ro`: acestea primesc e-mailurile pentru `office@alandis.ro`. Nu activa primirea e-mailurilor în Resend pentru această integrare.
3. Apasă verificarea DNS în Resend și așteaptă starea **Verified**. Nu crea înregistrări din exemple găsite pe internet: panoul tău poate afișa TXT/MX sau CNAME, în funcție de configurație.
4. **API Keys → Create API Key**: nume `Alandis contact`, permisiune **Sending access**, restrânsă la domeniul verificat. Copiază cheia în fișierul privat descris mai jos. Nu o introduce în React, `VITE_*`, `dist`, Git sau în conversații.
5. Păstrează dezactivate **open tracking** și **click tracking** pentru acest domeniu. Formularul nu are nevoie de urmărirea destinatarului.
6. Confirmă că `office@alandis.ro` este o căsuță existentă și funcțională la furnizorul tău de e-mail. Verificarea domeniului în Resend nu creează această căsuță.

Documentație: [domenii](https://resend.com/docs/dashboard/domains/introduction), [verificare DNS](https://resend.com/docs/knowledge-base/what-if-my-domain-is-not-verifying), [chei API](https://resend.com/docs/dashboard/api-keys/introduction).

## 2. În cPanel

- Selectează **PHP 8.1 sau mai nou** (preferabil o versiune susținută de hosting) și activează extensia **cURL**. Hostingul trebuie să permită conexiuni HTTPS către `api.resend.com:443`, cu certificate CA valide.
- Activează certificatul SSL și **Force HTTPS Redirect** pentru domeniu. Folosește versiunea HTTPS când verifici formularul.
- Cu File Manager, creează folderul **`alandis-private` în directorul contului**, lângă `public_html`, nu în interiorul lui.
- Copiază `deployment/resend.config.example.php` în acel folder și redenumește-l **`resend.php`**. Completează `api_key` cu cheia Resend. Expeditorul și destinatarul sunt deja completate; verifică-le.
- `allowed_origins` trebuie să conțină exact domeniile folosite în browser, cu `https://`, fără cale și fără slash final. Configurația include `https://alandis.ro` și `https://www.alandis.ro`.
- Fișierul privat poate avea permisiuni `600`, iar folderul `700`, dacă PHP rulează sub utilizatorul contului. Folderul trebuie să permită PHP să creeze subfolderul `state`. Dacă hostingul are alt model de permisiuni, cere suportului să acorde acces procesului PHP, fără acces public.

Structura standard:

```text
/home/UTILIZATOR_CPANEL/
├── alandis-private/
│   ├── resend.php          ← cheia reală, în afara rădăcinii web
│   └── state/              ← creat automat pentru limitarea cererilor
└── public_html/
    ├── index.html
    ├── assets/
    ├── api/
    │   └── contact.php
    ├── images/
    ├── fonts/
    └── documents/
```

Endpointul caută implicit `alandis-private/resend.php` la două niveluri deasupra folderului `api`. Dacă domeniul are alt document root, setează în mediul PHP `ALANDIS_CONFIG_PATH` la calea absolută a fișierului privat sau ajustează **doar calea implicită** din `public/api/contact.php`, apoi refă build-ul. Nu muta cheia în document root. Pentru acces FTP limitat la `public_html`, folosește cPanel File Manager pentru folderul privat.

## 3. Build și încărcare prin FileZilla

Din proiect:

```powershell
npm run check
npm run build
```

Încarcă **conținutul** folderului `dist` în rădăcina web a domeniului (`public_html` în cazul standard), nu folderul `dist` ca subfolder. Vite include automat `api/contact.php` în build. Nu încărca sursele, `node_modules`, `deployment`, `artifacts` sau fișierul cu cheia în `public_html`.

Build-ul folosește `/`, nu `/Alandis/`. Rutele rămân `/#/contact`, `/#/consultanta` etc.; nu este nevoie de reguli SPA în `.htaccess`. Dacă există un `index.php` al site-ului anterior, verifică împreună cu hostingul ce fișier este servit implicit înainte de înlocuire; păstrează o copie de siguranță a site-ului anterior.

## 4. Verificare după configurare

1. Deschide `https://alandis.ro/#/contact` și trimite o solicitare de test cu propriul număr. Câmpul telefon este obligatoriu.
2. Confirmă că apare „Solicitarea a fost transmisă”. Aceasta înseamnă că Resend a acceptat expedierea, nu că mesajul a fost deja livrat în inbox.
3. În **Resend → Emails**, verifică evenimentul **Delivered**, apoi inboxul și Spam pentru `office@alandis.ro`. Mesajul trebuie să conțină numele, telefonul, serviciul și textul introdus.
4. Testează și de pe telefon. Un mesaj eșuat păstrează datele pentru reîncercare; o retrimitere a aceleiași solicitări folosește aceeași cheie de idempotență cât timp pagina rămâne deschisă și câmpurile nu se schimbă.

Nu a fost trimis niciun e-mail real în verificările locale. Activarea și livrarea reală necesită cheia, DNS-ul și găzduirea ta.

## Diagnostic

În Developer Tools → Network, inspectează **statusul** cererii `api/contact.php`:

| Status | Semnificație / verificare |
| --- | --- |
| 200, `ok: true` | Resend a acceptat trimiterea; verifică ulterior livrarea în Resend. |
| 403 | `allowed_origins` nu corespunde exact domeniului din browser. |
| 405 | Endpoint deschis direct cu GET; este normal. Trimiterea folosește POST. |
| 413 / 422 | Date prea lungi sau invalide. |
| 429 | Limită de protecție: implicit 5 încercări/IP/15 minute și 50/oră pentru întregul formular. |
| 502 | Resend sau conexiunea HTTPS au refuzat/nu au confirmat cererea. Verifică cheia, domeniul, adresa `from`, cotele contului și conectivitatea hostingului. |
| 503 | Fișier privat lipsă/nevalid, extensia cURL lipsă sau imposibilitatea scrierii în `state`. |
| HTML în loc de JSON / 404 | Fișierul PHP nu este încărcat la calea corectă sau hostingul nu îl execută. |

Nu dezactiva verificarea certificatelor TLS pentru a rezolva o eroare cURL; cere hostingului actualizarea certificatelor CA. Nu copia chei sau conținutul mesajelor în loguri publice. Endpointul nu expune erorile interne ale providerului.

## Protecții și date

Sunt incluse verificarea originii, JSON cu limite de dimensiune, validare pe server, câmp-capcană anti-spam, limite de cereri persistente cu blocare de fișier și idempotență Resend. Destinatarul și expeditorul sunt stabilite exclusiv în configurația privată. Acestea limitează abuzurile, dar nu reprezintă un CAPTCHA; pentru trafic abuziv susținut se poate adăuga o verificare suplimentară.

Conținutul mesajelor nu este arhivat local de endpoint. Fișierul privat `state/contact-rate.json` conține doar momente și identificatori HMAC ai IP-urilor; înregistrările mai vechi de o oră sunt eliminate la următoarea cerere validă. Pentru eliminare și în perioade fără trafic, configurează opțional un cron zilnic care șterge acest fișier numai dacă nu a fost modificat de peste o oră. Mesajele rămân la Resend și în căsuța poștală conform regulilor acelor servicii. Politica site-ului a fost adaptată fluxului nou; datele juridice și retenția operațională rămân de stabilit de administrator.

Testele locale: `php -n tests/contact-api.php`; cu Vite pornit, `node scripts/check-contact.mjs`. Testul browserului simulează răspunsurile API și nu trimite e-mailuri. `npm run dev` și `npm run preview` nu execută PHP; trimiterea reală se testează pe un server PHP cu configurația privată instalată.
