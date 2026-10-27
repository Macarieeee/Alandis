import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  MessageCircle,
  CarFront,
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  Check,
  Route as RouteIcon,
  BookOpen,
  Leaf,
  Search,
  Download,
  FileText,
  ChevronDown,
  Compass,
  CircleHelp,
  Truck,
  Users,
  MapPin,
  CheckCheck,
  Instagram,
  Facebook,
} from "lucide-react";
import original from "./data/original.json";
import documents from "./data/documents.json";
import "./styles.css";
import heroImage from "../assets/hero.jpeg";
import aboutUsImage from "../assets/AboutUs.jpeg";
import aboutImage from "../assets/About.jpeg";
import consultancyIntroImage from "../assets/consultantafirstsection.jpeg";
import aboutIntroImage from "../assets/aboutfirstsection.jpeg";
import contactIntroImage from "../assets/contactfirstsection.jpeg";

const phone = "+40771303601";
const additionalPhone = "+40764900841";
const email = "office@alandis.ro";
const whatsappUrl = "https://wa.me/message/EALSQY2RMX33J1";
const whatsapp = (message?: string) =>
  message
    ? `https://wa.me/40771303601?text=${encodeURIComponent(message)}`
    : whatsappUrl;
const nav = [
  ["/", "Acasă"],
  ["/atestate-profesionale", "Atestate profesionale"],
  ["/consultanta", "Consultanță"],
  ["/despre-noi", "Despre noi"],
  ["/contact", "Contact"],
];
const courses = [
  {
    title: "Profesor de legislație rutieră",
    category: "Educație",
    description:
      "Pregătire și atestare pentru cei care formează viitorii conducători auto.",
    icon: BookOpen,
  },
  {
    title: "Instructor de conducere auto",
    category: "Educație",
    description:
      "Transformă experiența de la volan într-o carieră în pregătirea șoferilor.",
    icon: CarFront,
  },
  {
    title: "Manager transport marfă sau persoane",
    category: "Management",
    description:
      "Pregătire inițială și periodică pentru coordonarea activităților de transport.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Transport marfă · CPI",
    category: "Transport marfă",
    description:
      "Calificare profesională inițială pentru conducătorii auto de transport marfă.",
    icon: Truck,
  },
  {
    title: "Transport persoane · CPI",
    category: "Transport persoane",
    description:
      "Calificare profesională inițială pentru conducătorii auto de transport persoane.",
    icon: Users,
  },
  {
    title: "Calificare inițială · CPI scurt",
    category: "Specializări",
    description: "Informații despre pregătirea și examinarea pentru CPI scurt.",
    icon: GraduationCap,
  },
  {
    title: "Manager taxi și Închiriere (Ride-sharing)",
    category: "Management",
    description:
      "Atestare pentru managementul transportului în regim de taxi și Închiriere (Ride-sharing).",
    icon: BriefcaseBusiness,
  },
  {
    title: "Conducător auto taxi",
    category: "Taxi și Închiriere (Ride-sharing)",
    description:
      "Pregătire profesională pentru transportul de persoane în regim de taxi.",
    icon: CarFront,
  },
  {
    title: "Conducător auto Închiriere (Ride-sharing)",
    category: "Taxi și Închiriere (Ride-sharing)",
    description:
      "Atestare pentru transportul de persoane în regim de Închiriere (Ride-sharing).",
    icon: CarFront,
  },
  {
    title: "Pregătire periodică · CPC",
    category: "Specializări",
    description:
      "Actualizarea cunoștințelor și pregătirea profesională periodică.",
    icon: GraduationCap,
  },
  {
    title: "Vehicule defecte sau avariate",
    category: "Specializări",
    description:
      "Pregătire pentru conducătorii auto care transportă vehicule defecte sau avariate.",
    icon: Truck,
  },
  {
    title: "Conducător auto troleibuz",
    category: "Transport persoane",
    description:
      "Pregătirea profesională pentru conducătorii auto de troleibuze.",
    icon: Users,
  },
  {
    title: "Transport marfă · CPC",
    category: "Transport marfă",
    description:
      "Pregătire profesională periodică pentru transportul rutier de marfă.",
    icon: Truck,
  },
  {
    title: "Transport persoane · CPC",
    category: "Transport persoane",
    description:
      "Pregătire profesională periodică pentru transportul rutier de persoane.",
    icon: Users,
  },
  {
    title: "ADR · Colete și cisterne",
    category: "Specializări",
    description:
      "Atestare pentru transportul rutier al mărfurilor periculoase.",
    icon: ShieldCheck,
  },
  {
    title: "Transport agabaritic",
    category: "Specializări",
    description:
      "Pregătire pentru transporturi cu mase sau dimensiuni de gabarit depășite.",
    icon: Truck,
  },
];
// Keep original course IDs aligned with their existing guides and documents.
const catalogCourses = [9, 8, 7, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16].map((id) => ({
  ...courses[id - 1],
  id: String(id),
  href: `/atestate-profesionale/${id}`,
}));
const additionalCourses = [
  {
    id: "cpp",
    title: "CPP Marfă - până în 3.5 tone",
    category: "Specializări",
    description: "Contactează-ne pentru detalii despre cursul CPP, înscriere și program.",
    icon: GraduationCap,
  },
  {
    id: "vizare-prelungire",
    title: "Vizare / prelungire atestat Închiriere (Ride-sharing) / taxi",
    category: "Taxi și Închiriere (Ride-sharing)",
    description: "Informații și sprijin pentru vizarea sau prelungirea atestatului de Închiriere (Ride-sharing) ori taxi.",
    icon: FileText,
  },
];
catalogCourses.push(...additionalCourses.map((course) => ({
  ...course,
  href: `/contact?interes=${encodeURIComponent(course.title)}`,
})));
// Display order is independent of the IDs used for course guides.
const catalogOrder = ["9", "8", "7", "vizare-prelungire", "cpp", "2", "10", "13", "14", "1", "3", "4", "5", "6", "11", "12", "15", "16"];
catalogCourses.sort((a, b) => catalogOrder.indexOf(a.id) - catalogOrder.indexOf(b.id));

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Alandis — Acasă">
      <img
        className="logo-image"
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt="Alandis — Școală de atestate auto"
        width={2172}
        height={724}
      />
    </Link>
  );
}
function Button({
  to,
  children,
  light = false,
  className = "",
}: {
  to: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${light ? "button-light" : ""} ${className}`}
      to={to}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <div className="topbar">
        <div className="container flex items-center justify-between gap-4">
          <span>Un nou drum. Mai multe posibilități.</span>
          <div className="flex flex-wrap items-center justify-end gap-3">
          <a href={`tel:${phone}`}>
            <Phone size={12} /> Hai să vorbim{" "}
            <span className="topbar-number">0771 303 601</span>
            <ArrowUpRight size={12} />
          </a>
          <a href={`tel:${additionalPhone}`}>
            <Phone size={12} /> 0764 900 841
          </a>
          <a href={`mailto:${email}`}>
            <Mail size={12} /> {email}
          </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Navigare principală">
            {nav.map(([path, label]) => (
              <NavLink key={path} to={path} end={path === "/"}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link to="/contact" className="header-cta">
            Începe acum <ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navigare mobil"
          >
            {nav.map(([path, label]) => (
              <NavLink key={path} to={path} end={path === "/"}>
                {label}
                <ArrowUpRight size={18} />
              </NavLink>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a9 9 0 0 1-13.4 7.9L3 21l1.6-4.6A9 9 0 1 1 21 11.5Z" />
      <path d="m8 7 2 3-1.2 1.2a8 8 0 0 0 4 4L14 14l3 2c-1 2-3 2-5 1-3-1.5-5-3.5-6-6-.7-2 0-3 2-4Z" transform="translate(1 -1) scale(.9)" />
    </svg>
  );
}

const footerSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/alandis.ro?cplk=MWNqeDVpNWV4YnR0cQ%3D%3D&utm_source=qr", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/share/14mCWvHjMk1/?mibextid=wwXIfr", icon: Facebook },
  { label: "Google Maps", href: "https://maps.app.goo.gl/AzHJ7dJac4NBhTa16?g_st=iw", icon: MapPin },
  { label: "WhatsApp", href: whatsappUrl, icon: WhatsAppIcon },
];

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              Școală de atestate auto
              <br />
              <strong>La volanul propriului viitor.</strong>
              <span className="footer-address">
                <MapPin size={17} aria-hidden="true" />
                <span>Piața Valter Mărăcineanu nr. 1–3, Sector 1, București</span>
              </span>
            </p>
            <a className="footer-phone" href="tel:+40730347777">
              <Phone size={17} />
              0730 347 777
            </a>
            <a className="footer-phone" href={`tel:${additionalPhone}`}>
              <Phone size={17} />
              0764 900 841
            </a>
            <a className="footer-phone" href={`mailto:${email}`}>
              <Mail size={17} />
              {email}
            </a>
            <div className="footer-socials" role="group" aria-label="Rețele sociale și locație">
              {footerSocialLinks.map(({ label, href, icon: Icon }) =>
                href ? (
                  <a key={label} className="footer-social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    <Icon size={20} />
                  </a>
                ) : (
                  <span key={label} className="footer-social" role="img" aria-label={label} title={label}>
                    <Icon size={20} />
                  </span>
                ),
              )}
            </div>
          </div>
          <div>
            <h3>Descoperă</h3>
            {nav.slice(1).map(([path, label]) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
          </div>
          <div>
            <h3>Pregătește-ți următorul pas</h3>
            <Link to="/despre-noi">Despre noi</Link>
            <Link to="/atestate-profesionale#tarife">Tarife atestate</Link>
            <Link to="/atestate-profesionale">Documente și informații</Link>
            <a href={whatsapp()} target="_blank" rel="noreferrer">
              Discută cu noi <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Permis Atestat. Toate drepturile
            rezervate.
          </span>
          <Link to="/confidentialitate">Confidențialitate</Link>
          <span>
            Cu grijă pentru drumul tău. <RouteIcon size={15} />
          </span>
        </div>
      </div>
    </footer>
  );
}
function CTA() {
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div>
          <Eyebrow>URMĂTORUL PAS ÎNCEPE AICI</Eyebrow>
          <h2>Pregătit pentru următorul pas?</h2>
          <p>Alege atestatul profesional potrivit, iar noi te ghidăm de la înscriere până la examen.</p>
        </div>
        <Button to="/contact" light>
          Hai să vorbim
        </Button>
        <RouteIcon className="cta-road" aria-hidden="true" />
      </div>
    </section>
  );
}
const faqs = [
  [
    "Ce atestate profesionale pot obține la ALANDIS?",
    "La ALANDIS oferim cursuri pentru atestate Taxi, Închiriere (Ride-sharing) (Uber/Bolt), transport marfă și persoane, ADR, manager de transport și alte categorii profesionale. Te ajutăm să alegi cursul potrivit activității tale."
  ],
  [
    "Ce condiții trebuie să îndeplinesc pentru înscriere?",
    "Condițiile diferă în funcție de atestatul dorit. De exemplu, pentru Taxi și Închiriere (Ride-sharing) sunt necesare vârsta minimă de 21 de ani, permisul categoria B de cel puțin 2 ani și îndeplinirea condițiilor legale privind antecedentele și aptitudinea medicală și psihologică."
  ],
  [
    "Ce documente sunt necesare pentru înscriere?",
    "Documentele diferă în funcție de curs și pot include actul de identitate, permisul de conducere și documentele de cazier. Îți comunicăm lista exactă înainte de înscriere."
  ],
  [
    "Cum mă pot înscrie la ALANDIS?",
    "Ne contactezi telefonic sau pe WhatsApp, ne spui ce atestat dorești, iar noi îți explicăm condițiile, programul, costurile și pașii necesari pentru înscriere."
  ]
];
function FAQ() {
  return (
    <section className="container section faq-layout">
      <div>
        <Eyebrow>BINE DE ȘTIUT</Eyebrow>
        <h2>
          Întrebări mici.
          <br />
          Răspunsuri clare.
        </h2>
        <p>Nu ai găsit informația de care ai nevoie?</p>
        <Link className="text-link" to="/contact">
          Suntem aici să te ajutăm <ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <ChevronDown size={19} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <Eyebrow>ȘCOALĂ DE ȘOFERI & ATESTATE PROFESIONALE</Eyebrow>
          <h1>
            La volanul 

            <br />
            <span>Propriului viitor.</span>
          </h1>
          <p>
            Obține atestatul profesional de care ai nevoie, cu pregătire de calitate, informații clare și sprijin pe tot parcursul procesului.
          </p>
          <div className="hero-actions">
            <Button to="/atestate-profesionale">Vreau un atestat</Button>
          </div>
          <div className="hero-assurance">
            <span className="mini-icon">
              <ShieldCheck size={21} />
            </span>
            <span>
              Pregătire pentru examen.
              <br />
              <strong>Încredere pentru viață.</strong>
            </span>
            <span className="assurance-line" />
            <span className="small-word">
              TEORIE + PRACTICĂ
              <br />
              <strong>UN DRUM COMPLET</strong>
            </span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage}
            alt="Drum sinuos printr-o pădure cu frunziș auriu, văzut de sus"
            fetchPriority="high"
          />
          <div className="hero-image-top">
            <span>
              <span className="live-dot" /> URMĂTOAREA OPRIRE: VIITORUL TĂU
            </span>
            <Compass size={25} />
          </div>
          <div className="image-caption">
            <span>
              Orice drum bun începe
              <br />
              cu un <em>prim pas.</em>
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={30} />
            </span>
          </div>
          <span className="image-index">01 / UN NOU ÎNCEPUT</span>
        </div>
      </section>
      <section className="principles">
        <div className="container grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            [ShieldCheck, "Conduită preventivă"],
            [BookOpen, "Pregătire pe înțelesul tău"],
            [Users, "Îndrumare la fiecare pas"],
            [Leaf, "Conducere responsabilă"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof ShieldCheck;
            return (
              <div key={label as string}>
                <I size={20} />
                <span>{label as string}</span>
              </div>
            );
          })}
        </div>
      </section>
      <section className="container section" id="servicii">
        <div className="section-top">
          <div>
            <Eyebrow>ALEGE DIRECȚIA TA</Eyebrow>
            <h2>
              Tu alegi destinația.
              <br />
              Noi te pregătim pentru drum.
            </h2>
          </div>
          <p>
            Atestate profesionale și consultanță pentru cariera ta în
            transporturi. Tot ce ai nevoie, într-un singur loc.
          </p>
        </div>
        <div className="service-grid">
          {[
            {
              icon: GraduationCap,
              n: "01",
              title: "Atestate profesionale",
              text: "Pregătire pentru transport în regim de taxi, Închiriere (Ride-sharing) , marfă , persoane și alte specializări.",
              tags: ["Închiriere (Ride-sharing)", "Taxi", "Manager Transport", "English certificate"],
              path: "/atestate-profesionale",
              link: "Descoperă atestatele",
            },
            {
              icon: BriefcaseBusiness,
              n: "02",
              title: "Consultanță",
              text: "Transformă planurile în pași clari. Asistență pentru autorizare, calificare și afacerea ta.",
              tags: ["Autorizări", "Transport alternativ"],
              path: "/consultanta",
              link: "Găsește soluția potrivită",
            },
          ].map((s) => (
            <Link to={s.path} className="service-card" key={s.n}>
              <div className="service-card-top">
                <span className="service-icon">
                  <s.icon size={29} strokeWidth={1.5} />
                </span>
                <span>{s.n}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="service-link">
                {s.link}
                <ArrowUpRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="about-band">
        <div className="container about-layout">
          <div className="about-visual">
            <img
              src={aboutUsImage}
              alt="Consultant ALANDIS explică unui cursant documentele pentru atestare"
              loading="lazy"
            />
            <div className="about-note">
              <ShieldCheck size={24} />
              <span>
                Răbdare. Responsabilitate.
                <br />
                <strong>Progres în ritmul tău.</strong>
              </span>
            </div>
          </div>
          <div>
            <Eyebrow>DESPRE ALANDIS</Eyebrow>
            <h2>Pregătirea potrivită. Sprijin la fiecare pas.</h2>
            <p>
              La ALANDIS, știm că obținerea unui atestat profesional trebuie
              să fie un proces clar și bine organizat. De aceea, îți oferim
              pregătire specializată, informații complete și îndrumare de la
              înscriere până la examen.
            </p>
            <div className="about-checks">
              <span>
                <Check size={16} /> Pregătire pentru examen
              </span>
              <span>
                <Check size={16} /> Asistență pentru documentele necesare
              </span>
              <span>
                <Check size={16} /> Comunicare clară și îndrumare
              </span>
            </div>
            <Link className="text-link" to="/despre-noi">
              Cunoaște ALANDIS <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-top">
          <div>
            <Eyebrow>SIMPLU, DE LA ÎNCEPUT</Eyebrow>
            <h2>Trei pași către atestatul tău profesional.</h2>
          </div>
          <Link to="/contact" className="text-link">
            Începe înscrierea <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="steps">
          {[
            [
              "01",
              "Ne contactezi",
              "Ne spui ce atestat îți dorești, iar noi îți explicăm condițiile și documentele necesare.",
            ],
            [
              "02",
              "Te înscrii și te pregătești",
              "Te ajutăm cu înscrierea și parcurgi pregătirea pentru examen.",
            ],
            [
              "03",
              "Susții examenul",
              "Îți explicăm pașii necesari pentru examen și obținerea atestatului.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span className="step-number">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function PageIntro({
  eyebrow,
  title,
  text,
  backgroundImage,
}: {
  eyebrow: string;
  title: string;
  text: string;
  backgroundImage?: string;
}) {
  return (
    <section
      className="page-intro"
      style={backgroundImage ? { "--intro-image": `url("${backgroundImage}")` } as React.CSSProperties : undefined}
    >
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Acasă</Link>
          <span>/</span>
          <span>{eyebrow}</span>
        </div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
function SourceNote() {
  return (
    <p className="source-note">
      <CircleHelp size={17} /> Informațiile și tarifele sunt preluate de pe
      site-ul original. Confirmă condițiile, costurile și reglementările
      aplicabile înainte de înscriere.
    </p>
  );
}
function About() {
  return (
    <>
      <PageIntro
        eyebrow="Despre noi"
        backgroundImage={aboutIntroImage}
        title="Învățăm să mergem înainte. Împreună."
        text="Atestate profesionale și consultanță pentru oamenii care își construiesc o carieră în transporturi."
      />
      <section className="container section reading-layout">
        <aside className="reading-aside">
          <img
            src={aboutImage}
            alt="Instructor și cursant în timpul pregătirii"
          />
          <h3>Următorul pas în cariera ta începe aici.</h3>
          <p>Spune-ne ce îți propui. Te ajutăm să alegi pregătirea potrivită.</p>
          <Button to="/contact">Să ne cunoaștem</Button>
        </aside>
        <article className="prose">
          <h2>ALANDIS — pregătire pentru o carieră în transporturi</h2>
          <p>
            În transporturi, fiecare activitate presupune responsabilitate,
            cunoștințe și o pregătire potrivită. La ALANDIS, îi sprijinim pe cei
            care vor să înceapă o activitate profesională, să își actualizeze
            calificările sau să facă următorul pas în carieră. Reunim cursuri
            pentru atestate profesionale și servicii de consultanță, astfel încât
            să poți înțelege ce ai de făcut și cum să te pregătești.
          </p>
          <p>
            Ne adresăm atât conducătorilor auto, cât și celor care coordonează
            activități de transport sau își dezvoltă o afacere în acest domeniu.
            Pornim de la obiectivul tău și discutăm despre cursul potrivit,
            documentele necesare și etapele pe care le ai de parcurs.
          </p>
          <h2>Atestate adaptate activității tale</h2>
          <p>
            Oferta noastră include pregătire pentru taxi, Închiriere (Ride-sharing),
            transport de marfă și transport de persoane, precum și pentru manageri
            de transport. În funcție de specializare, poți găsi cursuri de
            calificare inițială CPI, pregătire periodică CPC, CPP Marfă pentru
            transport până în 3.5 tone și informații despre vizarea sau prelungirea
            atestatelor.
          </p>
          <p>
            Pentru activitățile specializate, catalogul cuprinde ADR pentru colete
            și cisterne, transport agabaritic, transportul vehiculelor defecte sau
            avariate și conducerea troleibuzelor. Sunt disponibile și cursuri
            dedicate celor care doresc să devină instructori de conducere auto
            sau profesori de legislație rutieră. Te ajutăm să identifici
            specializarea care corespunde activității pe care vrei să o desfășori.
          </p>
          <h2>Îndrumare de la înscriere până la examen</h2>
          <p>
            Un început bun înseamnă să știi la ce să te aștepți. Îți oferim
            informații despre condițiile de înscriere, actele necesare, program,
            tarife și modul de examinare pentru cursul ales. Pregătirea pentru
            examen este însoțită de explicații și sprijin pentru organizarea
            dosarului, astfel încât fiecare etapă să fie mai ușor de urmărit.
          </p>
          <p>
            Punem accent pe comunicare clară, răbdare și înțelegerea
            responsabilităților profesionale. Pentru cei interesați de pregătire
            în limba engleză, oferim informații despre cursurile disponibile și
            modalitatea de participare. Detaliile se stabilesc în funcție de
            specializarea aleasă și de nevoile cursantului.
          </p>
          <h2>Consultanță pentru activitatea și afacerea ta</h2>
          <p>
            Pe lângă pregătirea profesională, ALANDIS oferă consultanță pentru
            transport alternativ și Închiriere (Ride-sharing), inclusiv pentru
            activități pe platforme precum Uber și Bolt, precum și pentru
            autorizarea transportului în regim de taxi. Discutăm despre pașii
            administrativi și documentele necesare în funcție de activitatea
            pe care dorești să o organizezi.
          </p>
          <p>
            Serviciile prezentate pe site includ și calificare sau reorientare
            profesională, consultanță fiscală și contabilitate. Fie că îți
            pregătești începutul într-un domeniu nou sau ai nevoie de sprijin
            pentru activitatea curentă, poți discuta cu noi pentru a identifica
            serviciul potrivit situației tale.
          </p>
          <h2>O conversație clară despre următorul tău pas</h2>
          <p>
            Credem că alegerea unui curs începe cu întrebările potrivite: ce
            activitate vrei să desfășori, ce pregătire ai deja și de ce calificare
            ai nevoie? De aici construim împreună pașii următori, cu informații
            despre opțiuni și cerințele specifice fiecărei specializări.
          </p>
          <p>
            Ne găsești în București, Piața Valter Mărăcineanu nr. 1–3, Sector 1.
            Ne poți contacta la <a href={`tel:${phone}`}>0771 303 601</a> sau{" "}
            <a href={`tel:${additionalPhone}`}>0764 900 841</a>, prin e-mail la{" "}
            <a href={`mailto:${email}`}>{email}</a> ori pe{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
            Spune-ne ce îți propui, iar noi te ajutăm să găsești pregătirea
            și sprijinul potrivit pentru următoarea etapă a carierei tale.
          </p>
        </article>
      </section>
      <CTA />
    </>
  );
}
function Driving() {
  const p = original["scoala-de-soferi"].paragraphs;
  return (
    <>
      <PageIntro
        eyebrow="Școala de șoferi"
        title="Încrederea se învață. Kilometru cu kilometru."
        text="Pregătirea pentru permis începe cu înțelegerea drumului, a mașinii și a responsabilității de la volan."
      />
      <section className="container section reading-layout">
        <aside className="reading-aside">
          <div className="aside-icon">
            <CarFront size={35} />
          </div>
          <h3>Primul tău permis începe cu o conversație.</h3>
          <p>
            Află detaliile despre înscriere, categorii, documente, program și
            tarife.
          </p>
          <Button to="/contact">
            Vreau să mă înscriu
          </Button>
          <a className="aside-phone" href={`tel:${phone}`}>
            <Phone size={16} />
            0771 303 601
          </a>
          <a className="aside-phone" href={`tel:${additionalPhone}`}>
            <Phone size={16} />
            0764 900 841
          </a>
          <a className="aside-phone" href={`mailto:${email}`}>
            <Mail size={16} />
            {email}
          </a>
        </aside>
        <article>
          <Eyebrow>PREGĂTIRE PENTRU VIAȚĂ</Eyebrow>
          <h2>Un șofer bun gândește preventiv.</h2>
          <div className="prose">
            <p>{p[0]}</p>
          </div>
          <div className="driving-features">
            <span>
              <ShieldCheck />
              Siguranță
            </span>
            <span>
              <Leaf />
              Economie
            </span>
            <span>
              <Users />
              Respect
            </span>
          </div>
          <h2 className="mt-12">Obiceiuri mici. O diferență mare.</h2>
          <p className="muted mb-6">{p[1]}</p>
          <div className="driving-tips">
            {[2, 4, 6, 8].map((index, i) => (
              <details key={index} open={i === 0}>
                <summary>
                  <span className="tip-index">0{i + 1}</span>
                  {p[index]}
                  <ChevronDown size={20} />
                </summary>
                <div className="prose">
                  <p>{p[index + 1]}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="road-signs" aria-label="Indicatoare rutiere">
            {["Trecere pentru pietoni", "Drum cu prioritate", "Sens unic", "Accesul interzis", "Oprire"].map((label, index) => (
              <figure key={label}>
                <img src={`${import.meta.env.BASE_URL}images/original-scoala-de-soferi-${index + 1}.png`} alt={label} loading="lazy" />
                <figcaption>{label}</figcaption>
              </figure>
            ))}
          </div>
          <SourceNote />
        </article>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function Certificates() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("categorie") || "Toate";
  const normalize = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = catalogCourses.filter(
      (c) =>
        (category === "Toate" || c.category === category) &&
        normalize(c.title + " " + c.description).includes(normalize(query)),
    );
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);
  return (
    <>
      <PageIntro
        eyebrow="Atestate profesionale"
        title="Pregătirea potrivită pentru cariera ta."
        text="Descoperă cursurile Alandis. Găsește specializarea potrivită, condițiile de înscriere și informațiile despre examen."
      />
      <section className="container section catalog">
        <div className="catalog-heading">
          <div>
            <Eyebrow>ALEGE SPECIALIZAREA</Eyebrow>
            <h2>Explorează cursurile noastre.</h2>
          </div>
          <a href="#tarife" onClick={(event) => { event.preventDefault(); document.getElementById("tarife")?.scrollIntoView({ behavior: "smooth" }); }} className="text-link">
            Vezi tarifele <ArrowRight size={17} />
          </a>
        </div>
        <label className="search-field">
          <Search size={21} />
          <input
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Caută un atestat: ADR, manager, transport…"
            aria-label="Caută atestate"
          />
        </label>
        <div className="filters" aria-label="Filtrează atestatele">
          {[
            "Toate",
            "Transport marfă",
            "Transport persoane",
            "Management",
            "Taxi și Închiriere (Ride-sharing)",
            "Educație",
            "Specializări",
          ].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              className={category === c ? "active" : ""}
              onClick={() => update("categorie", c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="catalog-language-note">
          <BookOpen size={22} aria-hidden="true" />
          <div>
            <h3>Cursuri și în limba engleză</h3>
            <p>Fiecare curs poate fi susținut în limba engleză.</p>
          </div>
        </div>
        <div className="course-grid">
          {filtered.map((c) => (
            <Link
              className="course-card"
              key={c.id}
              to={c.href}
            >
              <div className="flex justify-between items-center">
                <span className="service-icon">
                  <c.icon size={25} />
                </span>
                <span className="course-category">{c.category}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="service-link">
                Vezi detalii <ArrowUpRight size={19} />
              </span>
            </Link>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <Search size={38} />
            <h3>Nu am găsit un atestat pentru această căutare.</h3>
            <p>Încearcă un alt cuvânt sau afișează toate specializările.</p>
            <button className="button" onClick={() => setParams({})}>
              Resetează filtrele <ArrowRight size={17} />
            </button>
          </div>
        )}
        <section id="tarife" className="prices">
          <div>
            <Eyebrow>INVESTEȘTE ÎN PREGĂTIREA TA</Eyebrow>
            <h2>Tarife transparente.</h2>
            <p>
              Taxele de școlarizare publicate pe site-ul original.
              Contactează-ne pentru confirmarea ofertei actuale.
            </p>
            <p><strong>Avizul medical și avizul psihologic sunt incluse în preț.</strong></p>
            <Button to="/contact?interes=Atestate%20profesionale">
              Solicită detalii
            </Button>
          </div>
          <div className="price-list">
            {[
              ["Manager transport marfă", "450 lei"],
              ["Manager transport persoane", "450 lei"],
              ["Manager taxi și Închiriere (Ride-sharing)", "350 lei"],
              ["Profesor de legislație rutieră", "În curs de actualizare"],
              ["Calificare instructor auto", "În curs de actualizare"],
            ].map(([t, p]) => (
              <div key={t}>
                <span>{t}</span>
                <strong>{p}</strong>
              </div>
            ))}
          </div>
        </section>
        <details className="full-source">
          <summary>
            Informațiile complete despre atestate și examinare{" "}
            <ChevronDown size={19} />
          </summary>
          <div className="prose original-text">
            {original["atestate-profesionale"].fullText
              .split(/\n/)
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            <p>
              Conducătorul auto care efectuează transport de persoane în regim
              de taxi trebuie să dețină un certificat de atestare a pregătirii
              profesionale. Pentru obținerea certificatului, candidatul trebuie
              să urmeze un curs de pregătire profesională și să promoveze
              examenul care constă în rezolvarea unui test-grilă.
            </p>
          </div>
        </details>
        <SourceNote />
      </section>
      <CTA />
    </>
  );
}
function CourseDetail() {
  const { id } = useParams();
  const index = Number(id) - 1;
  const c = courses[index];
  const doc = documents[index];
  if (!c || !doc) return <NotFound />;
  return (
    <>
      <PageIntro
        eyebrow="Ghid de atestare"
        title={c.title}
        text={c.description}
      />
      <section className="container section">
        <Link className="text-link mb-8" to="/atestate-profesionale">
          <ArrowLeft size={17} />
          Înapoi la toate atestatele
        </Link>
        <div className="reading-layout">
          <aside className="reading-aside">
            <c.icon size={38} />
            <span className="course-category block mt-5">{c.category}</span>
            <h3>Tot ce trebuie să știi, într-un singur ghid.</h3>
            <p>
              Condiții de acces, documente necesare, pregătire și examinare.
            </p>
            <a className="button" href={`${import.meta.env.BASE_URL}documents/${id}.docx`} download>
              Descarcă ghidul DOCX <Download size={18} />
            </a>
            <Button
              to={`/contact?interes=${encodeURIComponent(c.title)}`}
              light
            >
              Întreabă despre curs
            </Button>
            <SourceNote />
          </aside>
          <article className="prose document-content">
            <div className="document-heading">
              <FileText size={22} />
              <span>
                GHID COMPLET · {String(Number(id)).padStart(2, "0")} / 16
              </span>
            </div>
            {doc.paragraphs.map((p, i) =>
              p.length < 110 && !/^[a-z][).]|^-|^•/.test(p) ? (
                <h2 key={i}>{p}</h2>
              ) : (
                <p key={i}>{p}</p>
              ),
            )}
            <a
              className="text-link"
              href={original["atestate-profesionale"].documents[index].url}
              target="_blank"
              rel="noreferrer"
            >
              Vezi documentul pe site-ul original <ArrowUpRight size={17} />
            </a>
          </article>
        </div>
      </section>
      <CTA />
    </>
  );
}
const consultingGroups = [
  {
    title: "Închiriere (Ride-sharing) și transport alternativ",
    icon: RouteIcon,
    range: [21, 28],
  },
  {
    title: "Autorizare transport în regim de taxi",
    icon: CarFront,
    range: [17, 21],
  },
  {
    title: "Calificare și reorientare profesională",
    icon: GraduationCap,
    range: [8, 17],
  },
  {
    title: "Consultanță fiscală și contabilitate",
    icon: BriefcaseBusiness,
    range: [28, 33],
  },
];
function Consultancy() {
  return (
    <>
      <PageIntro
        eyebrow="Consultanță"
        backgroundImage={consultancyIntroImage}
        title="Planuri mari. Pași bine îndrumați."
        text="Asistență și autorizare dedicată în transporturi rutiere. De la calificare profesională până la dezvoltarea afacerii tale."
      />
      <section className="container section">
        <div className="consulting-grid">
          {consultingGroups.map((g, i) => (
            <article className="consulting-card" key={g.title}>
              <div className="service-card-top">
                <span className="service-icon">
                  <g.icon size={27} />
                </span>
                <span>0{i + 1}</span>
              </div>
              <h2>{g.title}</h2>
              <ul>
                {original.consultanta.paragraphs
                  .slice(...(g.range as [number, number]))
                  .map((p, j) => (
                    <li key={j}>{p.replace(/^–\s*/, "")}</li>
                  ))}
              </ul>
              <Link
                to={`/contact?interes=${encodeURIComponent(g.title)}`}
                className="text-link"
              >
                Discută cu un consultant <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
        <div className="info-box">
          <CircleHelp size={22} />
          <div>
            <p>
              Închirierea platformei pentru exerciții ADR este disponibilă doar
              pentru București și Ilfov.
            </p>
            <p>{original.consultanta.paragraphs[37]}</p>
            <p>
              Codurile CAEN sunt cele menționate în materialul original, conform
              REV 2. Confirmă încadrarea actuală pentru activitatea ta în cadrul
              consultanței.
            </p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
function Contact() {
  const [params] = useSearchParams();
  const requestedInterest = params.get("interes");
  const initialInterest =
    requestedInterest && requestedInterest !== "Școala de șoferi"
      ? requestedInterest
      : "Atestate profesionale";
  const [name, setName] = useState("");
  const [interest, setInterest] = useState(
    initialInterest,
  );
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const text = `Bună ziua! Mă numesc ${name}. Sunt interesat(ă) de: ${interest}. ${message}`;
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        backgroundImage={contactIntroImage}
        title="Orice drum începe cu un „bună”."
        text="Ai o întrebare, un plan sau pur și simplu vrei să știi de unde să începi? Hai să vorbim."
      />
      <section className="container section contact-layout">
        <div>
          <Eyebrow>SUNTEM AICI PENTRU TINE</Eyebrow>
          <h2>
            Facem primul pas
            <br />
            împreună.
          </h2>
          <p className="muted">
            Pentru înscrieri, informații despre cursuri, tarife sau consultanță,
            contactează-ne direct.
          </p>
          <a className="contact-method" href={`tel:${phone}`}>
            <span className="service-icon">
              <Phone size={25} />
            </span>
            <div>
              <small>SUNĂ-NE</small>
              <strong>0771 303 601</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a className="contact-method" href={`tel:${additionalPhone}`}>
            <span className="service-icon">
              <Phone size={25} />
            </span>
            <div>
              <small>SUNĂ-NE</small>
              <strong>0764 900 841</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a className="contact-method" href={`mailto:${email}`}>
            <span className="service-icon">
              <Mail size={25} />
            </span>
            <div>
              <small>SCRIE-NE PE E-MAIL</small>
              <strong>{email}</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a
            className="contact-method"
            href={whatsapp()}
            target="_blank"
            rel="noreferrer"
          >
            <span className="service-icon">
              <MessageCircle size={25} />
            </span>
            <div>
              <small>SCRIE-NE PE WHATSAPP</small>
              <strong>O conversație, mai multe răspunsuri.</strong>
            </div>
            <ArrowUpRight />
          </a>
          <div className="contact-note">
            <MapPin size={21} />
            <p>
              Detaliile despre locația cursurilor și program se comunică direct,
              în funcție de pregătirea aleasă.
            </p>
          </div>
        </div>
        <div className="contact-form">
          <span className="form-label">SĂ NE CUNOAȘTEM</span>
          <h2>Cu ce te putem ajuta?</h2>
          <p>Pregătește mesajul tău și continuă conversația pe WhatsApp.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setReady(true);
            }}
          >
            <label>
              Numele tău
              <input
                required
                autoComplete="name"
                maxLength={100}
                placeholder="Cum te numești?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setReady(false);
                }}
              />
            </label>
            <label>
              Sunt interesat(ă) de
              <select
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  setReady(false);
                }}
              >
                {Array.from(
                  new Set([
                    "Atestate profesionale",
                    "Consultanță",
                    initialInterest,
                    "Alte informații",
                  ]),
                ).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Mesajul tău <span>(opțional)</span>
              <textarea
                rows={4}
                maxLength={2000}
                placeholder="Spune-ne câteva lucruri despre planul tău…"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setReady(false);
                }}
              />
            </label>
            <p className="form-privacy">
              Datele completate rămân în această pagină până când alegi să
              trimiți mesajul prin WhatsApp.{" "}
              <Link to="/confidentialitate">Despre confidențialitate</Link>
            </p>
            <button className="button w-full justify-center" type="submit">
              Pregătește mesajul <ArrowRight size={18} />
            </button>
          </form>
          {ready && (
            <div className="message-ready" role="status">
              <div className="flex gap-2 items-center">
                <CheckCheck size={20} />
                <strong>Mesajul tău este pregătit.</strong>
              </div>
              <p>{text}</p>
              <a
                className="button"
                href={whatsapp(text)}
                target="_blank"
                rel="noreferrer"
              >
                Deschide WhatsApp <MessageCircle size={18} />
              </a>
              <small>
                Mesajul va fi trimis doar după confirmarea ta în WhatsApp.
              </small>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="Confidențialitate"
        title="Datele tale, în controlul tău."
        text="Cum funcționează această versiune a site-ului."
      />
      <article className="container section prose narrow">
        <h2>Formularul de contact</h2>
        <p>
          Numele, interesul și mesajul sunt folosite doar pentru a pregăti un
          link către WhatsApp. Această aplicație nu le salvează într-o bază de
          date și nu le transmite automat. La deschiderea WhatsApp, datele
          incluse în link sunt procesate de serviciul respectiv, conform
          politicii sale de confidențialitate.
        </p>
        <h2>Cookie-uri și servicii externe</h2>
        <p>
          Aplicația nu folosește cookie-uri de analiză sau publicitate.
          Imaginile și documentele sunt servite local. Linkurile externe către
          WhatsApp și site-ul original se supun politicilor serviciilor
          respective. Furnizorul de găzduire poate prelucra date tehnice
          necesare livrării site-ului.
        </p>
        <h2>Contact</h2>
        <p>
          Pentru întrebări despre datele comunicate în conversații,
          contactează-ne la <a href={`tel:${phone}`}>0771 303 601</a> sau{" "}
          <a href={`tel:${additionalPhone}`}>0764 900 841</a> sau prin e-mail la{" "}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
      </article>
    </>
  );
}
function NotFound() {
  return (
    <section className="container section empty-state">
      <Compass size={55} />
      <Eyebrow>404 · UN MIC OCOL</Eyebrow>
      <h1>Pagina aceasta nu este pe traseu.</h1>
      <p>Te ajutăm să revii pe drumul potrivit.</p>
      <Button to="/">Înapoi la început</Button>
    </section>
  );
}
function App() {
  const location = useLocation();
  useEffect(() => {
    const label =
      nav.find(([p]) => p === location.pathname)?.[1] ||
      (location.pathname.startsWith("/atestate-profesionale/")
        ? "Ghid de atestare"
        : location.pathname === "/despre-noi"
          ? "Despre noi"
          : location.pathname === "/confidentialitate"
            ? "Confidențialitate"
            : "Pagina nu a fost găsită");
    document.title = `${label} — Permis Atestat`;
  }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href="#continut" onClick={(event) => { event.preventDefault(); const content = document.getElementById("continut"); content?.scrollIntoView(); content?.focus(); }}>
        Sari la conținut
      </a>
      <Header />
      <main id="continut">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/despre-noi" element={<About />} />
          <Route path="/scoala-de-soferi" element={<Driving />} />
          <Route path="/atestate-profesionale" element={<Certificates />} />
          <Route path="/atestate-profesionale/:id" element={<CourseDetail />} />
          <Route path="/consultanta" element={<Consultancy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confidentialitate" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <a
        className="whatsapp-float"
        href={whatsapp()}
        target="_blank"
        rel="noreferrer"
        aria-label="Întreabă despre cursuri pe WhatsApp"
      >
        <MessageCircle size={24} />
        <span>Întreabă-ne</span>
      </a>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
