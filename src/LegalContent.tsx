import { useLanguage } from "./i18n";
import { Link } from "react-router-dom";

export function PrivacyContent() {
  const { tr } = useLanguage();
  return (
    <>
      <p>{tr("Ultima actualizare: 27 octombrie 2026.")}</p>
      <h2>{tr("1. Despre această politică")}</h2>
      <p>{tr("Această politică explică utilizarea datelor în legătură cu site-ul ALANDIS, solicitările despre atestate profesionale și serviciile de consultanță. Pentru întrebări sau exercitarea drepturilor, ne poți scrie la")}{" "}<a href="mailto:office@alandis.ro">{tr("office@alandis.ro")}</a>{" "}{tr("sau ne poți suna la")}{" "}<a href="tel:+40771303601">0771 303 601</a>{" "}{tr("ori")}{" "}<a href="tel:+40764900841">0764 900 841</a>{tr(". Adresa de contact prezentată pe site este Piața Valter Mărăcineanu nr. 1–3, Sector 1, București.")}</p>

      <h2>{tr("2. Datele folosite și formularul de contact")}</h2>
      <p>{tr("Formularul solicită numele, numărul de telefon obligatoriu și serviciul de interes și permite completarea unui mesaj opțional. La apăsarea „Trimite solicitarea”, aceste date sunt transmise către serverul ALANDIS și serviciul Resend pentru expedierea unui e-mail la office@alandis.ro. Folosim numărul de telefon pentru a reveni cu un răspuns. Nu este necesar un cont WhatsApp pentru formular.")}</p>
      <p>{tr("Formularul nu permite încărcarea de fișiere și nu înscrie automat solicitantul la un curs sau la comunicări comerciale. Datele neexpediate rămân în memoria paginii; dacă trimiterea nu poate fi confirmată, sunt păstrate în formular pentru reîncercare. Aplicația nu stochează formularul în cookie-uri sau în stocarea locală a browserului.")}</p>
      <p>{tr("Dacă ne contactezi prin e-mail, telefon sau WhatsApp, primim informațiile pe care ni le comunici: de exemplu, numele, adresa de e-mail, numărul de telefon, datele de profil disponibile și conținutul solicitării. Fără date suficiente pentru a înțelege cererea sau a reveni cu un răspuns, este posibil să nu o putem soluționa.")}</p>
      <p>{tr("Pentru prima solicitare sunt suficiente datele de contact și o descriere a serviciului dorit. Nu include CNP, copii ale actelor de identitate, date medicale, cazier judiciar, parole sau date bancare. Documentele necesare unei eventuale înscrieri se stabilesc separat, împreună cu modalitatea de transmitere și informarea aplicabilă.")}</p>

      <h2>{tr("3. Scopuri și temeiuri")}</h2>
      <p>{tr("Folosim solicitările pentru a răspunde și, când ceri înscrierea sau o ofertă, pentru demersuri precontractuale la cererea ta (art. 6 alin. (1) lit. b GDPR). Gestionarea întrebărilor generale și protejarea comunicărilor pot avea ca temei interesul legitim de a comunica și de a preveni abuzurile (lit. f). Obligațiile legale aplicabile au temeiul prevăzut la lit. c. Formularul nu reprezintă o abonare la marketing.")}</p>

      <h2>{tr("4. Găzduire, cookie-uri și legături externe")}</h2>
      <p>{tr("Preferința de limbă (română sau engleză) este salvată în stocarea locală a browserului, sub cheia alandis-language, pentru a fi păstrată la următoarea vizită. O poți schimba oricând din selector sau o poți șterge din datele site-ului în browser.")}</p>
      <p>{tr("Site-ul și formularul sunt găzduite pe serverul web folosit de ALANDIS. Furnizorul de găzduire poate prelucra adresa IP, informații despre browser și jurnale de acces pentru livrarea și securitatea serviciului. Mesajele formularului sunt expediate prin Resend; numele, telefonul, serviciul ales și textul mesajului sunt incluse în e-mail. Consultă")}{" "}<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">{tr("politica Resend")}</a>{" "}{tr("pentru informații despre acest furnizor.")}</p>
      <p>{tr("Codul site-ului nu instalează cookie-uri de analiză sau publicitate și nu include pixeli de urmărire, hărți încorporate ori module sociale încorporate. Imaginile, fonturile și documentele sunt livrate împreună cu site-ul. Butoanele către servicii externe sunt linkuri; utilizarea destinațiilor poate implica propriile cookie-uri și tehnologii.")}</p>
      <p>{tr("WhatsApp este furnizat în regiunea europeană de WhatsApp Ireland Limited. Utilizarea sa este guvernată de")}{" "}<a href="https://www.whatsapp.com/legal/privacy-policy-eea" target="_blank" rel="noopener noreferrer">{tr("politica WhatsApp")}</a>{tr(", inclusiv în privința datelor de cont și a transferurilor internaționale. Poți folosi e-mailul sau telefonul dacă preferi să nu utilizezi WhatsApp.")}</p>
      <p>{tr("Linkurile către Facebook, Instagram și Google Maps deschid servicii externe, ale căror reguli se aplică din acel moment. Consultă")}{" "}<a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">{tr("politica Facebook")}</a>, <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer">{tr("politica Instagram")}</a>{" "}{tr("și")}{" "}<a href="https://policies.google.com/privacy?hl=ro" target="_blank" rel="noopener noreferrer">{tr("politica Google")}</a>.</p>

      <h2>{tr("5. Acces, destinatari și transferuri")}</h2>
      <p>{tr("Solicitările sunt destinate persoanelor care se ocupă de relația cu clienții ALANDIS. În funcție de canal, pot fi prelucrate și de furnizorii de găzduire, e-mail sau mesagerie; autoritățile pot primi date când există o obligație legală. Serviciile externe pot implica prelucrări în afara Spațiului Economic European. Politicile furnizorilor explică destinațiile și garanțiile aplicabile; poți solicita informații suplimentare la adresa noastră de contact.")}</p>

      <h2>{tr("6. Păstrarea datelor")}</h2>
      <p>{tr("Endpointul formularului nu arhivează conținutul mesajelor într-o bază de date sau în fișiere locale. Pentru prevenirea abuzurilor, păstrează temporar momentele cererilor și un identificator pseudonimizat derivat din adresa IP. Înregistrările mai vechi de o oră sunt eliminate la următoarea cerere validă. E-mailurile sunt procesate de Resend și păstrate în căsuța destinatarului; jurnalele furnizorilor sunt supuse regulilor lor de păstrare.")}</p>
      <p>{tr("Formularul neexpediat nu este arhivat de aplicație și se resetează la reîncărcarea paginii. Mesajele trimise prin canalele de contact sunt distincte de această memorie temporară. Necesitatea păstrării lor depinde de soluționarea cererii, continuarea discuțiilor, o eventuală relație contractuală și obligațiile legale ori apărarea unor drepturi. Pentru situația ta concretă, poți solicita detalii sau ștergerea la office@alandis.ro. Furnizorii externi au propriile reguli de păstrare, indicate în politicile lor.")}</p>

      <h2>{tr("7. Drepturile tale")}</h2>
      <p>{tr("În condițiile GDPR, poți solicita acces, rectificare, ștergere, restricționare sau portabilitate și te poți opune anumitor prelucrări. Dacă o prelucrare se bazează pe consimțământ, îl poți retrage fără a afecta legalitatea operațiunilor anterioare. Site-ul nu realizează profilare sau decizii automatizate cu efecte juridice.")}</p>
      <p>{tr("Trimite cererea la")}{" "}<a href="mailto:office@alandis.ro">{tr("office@alandis.ro")}</a>{tr(". Termenul obișnuit de răspuns este o lună; în cazurile prevăzute de lege poate fi prelungit cu încă două luni, cu informarea ta. Pot fi necesare informații proporționale pentru verificarea identității.")}</p>
      <p>{tr("Poți depune o plângere la")}{" "}<a href="https://www.dataprotection.ro/?page=Plangeri_RGPD&amp;lang=ro" target="_blank" rel="noopener noreferrer">{tr("ANSPDCP")}</a>{" "}{tr("și te poți adresa instanțelor competente. Textul oficial al")}{" "}<a href="https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX%3A32016R0679" target="_blank" rel="noopener noreferrer">{tr("Regulamentului general privind protecția datelor")}</a>{" "}{tr("prezintă condițiile de exercitare a drepturilor.")}</p>

      <h2>{tr("8. Actualizarea politicii")}</h2>
      <p>{tr("Această politică descrie funcțiile disponibile la data de mai sus. Dacă introducem câmpuri suplimentare, alte modalități de stocare sau instrumente noi, vom actualiza informarea înainte de folosirea lor.")}</p>
      <p>{tr("Consultă și")}{" "}<Link to="/termeni-si-conditii">{tr("Termenii și condițiile")}</Link>{" "}{tr("pentru utilizarea site-ului și solicitarea serviciilor.")}</p>
    </>
  );
}

export function TermsContent() {
  const { tr } = useLanguage();
  return (
    <>
      <p>{tr("Ultima actualizare: 27 octombrie 2026.")}</p>
      <h2>{tr("1. Rolul site-ului")}</h2>
      <p>{tr("Site-ul ALANDIS prezintă cursuri pentru atestate profesionale, ghiduri, tarife și servicii de consultanță în transporturi. Poți consulta informațiile, descărca documentele disponibile și solicita detalii prin canalele de contact. Site-ul nu are conturi de utilizator, coș de cumpărături sau plăți online.")}</p>
      <h2>{tr("2. Solicitări și înscriere")}</h2>
      <p>{tr("Completarea formularului sau contactarea noastră nu confirmă automat înscrierea, rezervarea unui loc ori încheierea unui contract. Formularul transmite solicitarea prin e-mail, folosind Resend; confirmarea afișată indică acceptarea tehnică a expedierii, nu confirmarea înscrierii. Înscrierea și serviciile se stabilesc prin comunicare directă și documentele aplicabile.")}</p>
      <p>{tr("Înainte de asumarea unei obligații de plată, trebuie clarificate serviciul ales, condițiile de acces, programul, documentele, prețul total, ce include acesta și eventualele costuri separate. Condițiile de anulare, reprogramare sau restituire se stabilesc în documentele serviciului și potrivit legislației aplicabile. Acești termeni nu restrâng drepturile legale ale consumatorilor.")}</p>
      <h2>{tr("3. Cursuri, ghiduri și tarife")}</h2>
      <p>{tr("Descrierile și documentele te ajută să înțelegi pregătirea și etapele pentru specializarea aleasă. Condițiile de examinare și eliberare a atestatelor sunt stabilite de autoritățile competente. Participarea la pregătire nu garantează promovarea examenului sau obținerea unei autorizații.")}</p>
      <p>{tr("Pentru cursurile în limba engleză, discutăm la contact detaliile organizării și ale participării. Poți semnala informațiile neclare sau erorile la office@alandis.ro. Eventualele actualizări ale site-ului nu modifică retroactiv condițiile unui contract deja încheiat.")}</p>
      <h2>{tr("4. Folosirea conținutului și a formularului")}</h2>
      <p>{tr("Poți utiliza ghidurile descărcabile pentru informare și pregătire personală. Drepturile asupra textelor, imaginilor, mărcilor și resurselor aparțin titularilor lor, potrivit licențelor și legii. Publicarea documentelor nu acordă automat dreptul de a redistribui comercial întregul conținut.")}</p>
      <p>{tr("Comunică informații corecte și relevante pentru cerere. Nu folosi formularul sau canalele de contact pentru spam, mesaje ilegale, impersonare, trimiterea de programe malițioase ori afectarea funcționării site-ului.")}</p>
      <h2>{tr("5. Servicii externe și disponibilitate")}</h2>
      <p>{tr("Linkurile către WhatsApp, Facebook, Instagram și Google Maps conduc la servicii gestionate de alți furnizori. Funcționarea și condițiile acestora le aparțin. Dacă un link nu funcționează, ne poți contacta prin telefon sau e-mail. Accesul la site poate fi întrerupt temporar de mentenanță sau probleme tehnice.")}</p>
      <h2>{tr("6. Confidențialitate și contact")}</h2>
      <p>{tr("Prelucrarea datelor este explicată în")}{" "}<Link to="/confidentialitate">{tr("Politica de confidențialitate")}</Link>{tr(". Pentru întrebări sau reclamații privind serviciile, scrie la")}{" "}<a href="mailto:office@alandis.ro">{tr("office@alandis.ro")}</a>{" "}{tr("sau sună la")}{" "}<a href="tel:+40771303601">0771 303 601</a> / <a href="tel:+40764900841">0764 900 841</a>{tr(". Descrie situația și serviciul vizat, astfel încât să putem analiza cererea. Dreptul de a te adresa autorităților și instanțelor competente rămâne neafectat.")}</p>
      <h2>{tr("7. Modificări")}</h2>
      <p>{tr("Putem actualiza acești termeni când se schimbă serviciile sau funcțiile site-ului. Versiunea și data actualizării sunt publicate pe această pagină. Folosirea site-ului nu reprezintă consimțământ pentru marketing și nu înlocuiește acceptarea separată a condițiilor unui serviciu contractat.")}</p>
    </>
  );
}
