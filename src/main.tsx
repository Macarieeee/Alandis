import { useLanguage, LanguageProvider, LanguageSwitcher } from "./i18n";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
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
  Instagram,
  Facebook,
} from "lucide-react";
import original from "./data/original.json";
import documents from "./data/documents.json";
import { ContactForm } from "./ContactForm";
import { PrivacyContent, TermsContent } from "./LegalContent";
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
  ["https://alandis.ro/atestate", "Testare Online"],
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
    title: "Vizare / prelungire atestat Închiriere (Ride-sharing) / TAXI",
    category: "Taxi și Închiriere (Ride-sharing)",
    description: "Informații și sprijin pentru vizarea sau prelungirea atestatului de Închiriere (Ride-sharing) sau taxi.",
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
  const { tr } = useLanguage();
  return (
    <Link className="logo" to="/" aria-label={tr("Alandis — Acasă")}>
      <img
        className="logo-image"
        src={`${import.meta.env.BASE_URL}images/logo.png`}
        alt={tr("Alandis — Școală de atestate auto")}
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
  const { tr } = useLanguage();
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
          <span>{tr("Un nou drum. Mai multe posibilități.")}</span>
          <div className="flex flex-wrap items-center justify-end gap-3">
          <a href="tel:+40730347777">
            <Phone size={12} />{" "}{tr("Hai să vorbim")}{" "}
            <span className="topbar-number">0730 347 777</span>
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
          <nav className="desktop-nav" aria-label={tr("Navigare principală")}>
            {nav.map(([path, label]) => path.startsWith("https://") ? (
              <a key={path} href={path}>{tr(label)}</a>
            ) : (
              <NavLink key={path} to={path} end={path === "/"}>
                {tr(label)}
              </NavLink>
            ))}
          </nav>
          <Link to="/contact" className="header-cta">{tr("Începe acum")}{" "}<ArrowUpRight size={17} />
          </Link>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={tr(open ? "Închide meniul" : "Deschide meniul")}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label={tr("Navigare mobil")}
          >
            {nav.map(([path, label]) => path.startsWith("https://") ? (
              <a key={path} href={path} onClick={() => setOpen(false)}>
                {tr(label)} <ArrowUpRight size={18} />
              </a>
            ) : (
              <NavLink key={path} to={path} end={path === "/"}>
                {tr(label)}
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

function TikTokIcon({ size = 20 }: { size?: number }) {
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 1h-3.6v15.4a3.1 3.1 0 1 1-2.7-3.1V9.6a6.8 6.8 0 1 0 6.3 6.8V8.6a8.8 8.8 0 0 0 5.1 1.6V6.6A5.2 5.2 0 0 1 16.7 1Z" />
    </svg>
  );
}

const footerSocialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/alandis.ro?cplk=MWNqeDVpNWV4YnR0cQ%3D%3D&utm_source=qr", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/share/14mCWvHjMk1/?mibextid=wwXIfr", icon: Facebook },
  { label: "TikTok", href: "https://www.tiktok.com/@alandis.scoala.de?_r=1&_t=ZN-9AuRqEgAcUg", icon: TikTokIcon },
  { label: "Google Maps", href: "https://maps.app.goo.gl/AzHJ7dJac4NBhTa16?g_st=iw", icon: MapPin },
  { label: "WhatsApp", href: whatsappUrl, icon: WhatsAppIcon },
];

function Footer() {
  const { tr } = useLanguage();
  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div>
            <Logo />
            <p>{tr("Școală de atestate auto")}<br />
              <strong>{tr("La volanul propriului viitor.")}</strong>
              <span className="footer-address">
                <MapPin size={17} aria-hidden="true" />
                <span>{tr("Piața Valter Mărăcineanu nr. 1–3, Sector 1, București")}</span>
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
            <div className="footer-socials" role="group" aria-label={tr("Rețele sociale și locație")}>
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
            <h3>{tr("Descoperă")}</h3>
            {nav.slice(1).map(([path, label]) => path.startsWith("https://") ? (
              <a key={path} href={path}>{tr(label)}</a>
            ) : (
              <Link key={path} to={path}>
                {tr(label)}
              </Link>
            ))}
          </div>
          <div>
            <h3>{tr("Pregătește-ți următorul pas")}</h3>
            <Link to="/despre-noi">{tr("Despre noi")}</Link>
            <Link to="/atestate-profesionale#tarife">{tr("Tarife atestate")}</Link>
            <Link to="/atestate-profesionale">{tr("Documente și informații")}</Link>
            <a href={whatsapp()} target="_blank" rel="noreferrer">{tr("Discută cu noi")}{" "}<ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}{tr("alandis.ro. Toate drepturile rezervate.")}</span>
          <Link to="/confidentialitate">{tr("Confidențialitate")}</Link>
          <Link to="/termeni-si-conditii">{tr("Termeni și condiții")}</Link>
          <p>{tr("Design and Built by Macarie MIhai-Alexandru")}</p>
          <span>{tr("Cu grijă pentru drumul tău.")}{" "}<RouteIcon size={15} />
          </span>
        </div>
      </div>
    </footer>
  );
}
function CTA() {
  const { tr } = useLanguage();
  return (
    <section className="container cta-wrap">
      <div className="cta">
        <div>
          <Eyebrow>{tr("URMĂTORUL PAS ÎNCEPE AICI")}</Eyebrow>
          <h2>{tr("Pregătit pentru următorul pas?")}</h2>
          <p>{tr("Alege atestatul profesional potrivit, iar noi te ghidăm de la înscriere până la examen.")}</p>
        </div>
        <Button to="/contact" light>{tr("Hai să vorbim")}</Button>
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
  const { tr } = useLanguage();
  return (
    <section className="container section faq-layout">
      <div>
        <Eyebrow>{tr("BINE DE ȘTIUT")}</Eyebrow>
        <h2>{tr("Întrebări mici.")}<br />{tr("Răspunsuri clare.")}</h2>
        <p>{tr("Nu ai găsit informația de care ai nevoie?")}</p>
        <Link className="text-link" to="/contact">{tr("Suntem aici să te ajutăm")}{" "}<ArrowUpRight size={17} />
        </Link>
      </div>
      <div className="faq-list">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>
              {tr(q)}
              <ChevronDown size={19} />
            </summary>
            <p>{tr(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Home() {
  const { tr } = useLanguage();
  return (
    <>
      <section className="container hero">
        <div className="hero-copy">
          <Eyebrow>{tr("ȘCOALĂ DE ȘOFERI & ATESTATE PROFESIONALE")}</Eyebrow>
          <h1>{tr("La volanul")}<br />
            <span>{tr("propriului viitor")}</span>
          </h1>
          <p>{tr("Obține atestatul profesional de care ai nevoie, cu pregătire de calitate, informații clare și sprijin pe tot parcursul procesului.")}</p>
          <div className="hero-actions">
            <Button to="/atestate-profesionale">{tr("Vreau un atestat")}</Button>
          </div>
          <div className="hero-assurance">
            <span className="mini-icon">
              <ShieldCheck size={21} />
            </span>
            <span>{tr("Pregătire pentru examen.")}<br />
              <strong>{tr("Încredere pentru viață.")}</strong>
            </span>
            <span className="assurance-line" />
            <span className="small-word">{tr("TEORIE + PRACTICĂ")}<br />
              <strong>{tr("UN DRUM COMPLET")}</strong>
            </span>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={heroImage}
            alt={tr("Drum sinuos printr-o pădure cu frunziș auriu, văzut de sus")}
            fetchPriority="high"
          />
          <div className="hero-image-top">
            <span>
              <span className="live-dot" />{" "}{tr("URMĂTOAREA OPRIRE: VIITORUL TĂU")}</span>
            <Compass size={25} />
          </div>
          <div className="image-caption">
            <span>{tr("Orice drum bun începe")}<br />{tr("cu un")}{" "}<em>{tr("prim pas.")}</em>
            </span>
            <span className="round-arrow">
              <ArrowUpRight size={30} />
            </span>
          </div>
          <span className="image-index">{tr("01 / UN NOU ÎNCEPUT")}</span>
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
                <span>{tr(label as string)}</span>
              </div>
            );
          })}
        </div>
      </section>
      <section className="container section" id="servicii">
        <div className="section-top">
          <div>
            <Eyebrow>{tr("ALEGE DIRECȚIA TA")}</Eyebrow>
            <h2>{tr("Tu alegi destinația.")}<br />{tr("Noi te pregătim pentru drum.")}</h2>
          </div>
          <p>{tr("Atestate profesionale și consultanță pentru cariera ta în transporturi. Tot ce ai nevoie, într-un singur loc.")}</p>
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
              <h3>{tr(s.title)}</h3>
              <p>{tr(s.text)}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span key={t}>{tr(t)}</span>
                ))}
              </div>
              <div className="service-link">
                {tr(s.link)}
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
              alt={tr("Consultant ALANDIS explică unui cursant documentele pentru atestare")}
              loading="lazy"
            />
            <div className="about-note">
              <ShieldCheck size={24} />
              <span>{tr("Răbdare. Responsabilitate.")}<br />
                <strong>{tr("Progres în ritmul tău.")}</strong>
              </span>
            </div>
          </div>
          <div>
            <Eyebrow>{tr("DESPRE ALANDIS")}</Eyebrow>
            <h2>{tr("Pregătirea potrivită. Sprijin la fiecare pas.")}</h2>
            <p>{tr("La ALANDIS, știm că obținerea unui atestat profesional trebuie să fie un proces clar și bine organizat. De aceea, îți oferim pregătire specializată, informații complete și îndrumare de la înscriere până la examen.")}</p>
            <div className="about-checks">
              <span>
                <Check size={16} />{" "}{tr("Pregătire pentru examen")}</span>
              <span>
                <Check size={16} />{" "}{tr("Asistență pentru documentele necesare")}</span>
              <span>
                <Check size={16} />{" "}{tr("Comunicare clară și îndrumare")}</span>
            </div>
            <Link className="text-link" to="/despre-noi">{tr("Cunoaște ALANDIS")}{" "}<ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-top">
          <div>
            <Eyebrow>{tr("SIMPLU, DE LA ÎNCEPUT")}</Eyebrow>
            <h2>{tr("Trei pași către atestatul tău profesional.")}</h2>
          </div>
          <Link to="/contact" className="text-link">{tr("Începe înscrierea")}{" "}<ArrowUpRight size={18} />
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
              <h3>{tr(t)}</h3>
              <p>{tr(d)}</p>
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
  const { tr } = useLanguage();
  return (
    <section
      className="page-intro"
      style={backgroundImage ? { "--intro-image": `url("${backgroundImage}")` } as React.CSSProperties : undefined}
    >
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">{tr("Acasă")}</Link>
          <span>/</span>
          <span>{tr(eyebrow)}</span>
        </div>
        <Eyebrow>{tr(eyebrow)}</Eyebrow>
        <h1>{tr(title)}</h1>
        <p>{tr(text)}</p>
      </div>
    </section>
  );
}
function About() {
  const { tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("Despre noi")}
        backgroundImage={aboutIntroImage}
        title={tr("Învățăm să mergem înainte. Împreună.")}
        text={tr("Atestate profesionale și consultanță pentru oamenii care își construiesc o carieră în transporturi.")}
      />
      <section className="container section reading-layout">
        <aside className="reading-aside">
          <img
            src={aboutImage}
            alt={tr("Instructor și cursant în timpul pregătirii")}
          />
          <h3>{tr("Următorul pas în cariera ta începe aici.")}</h3>
          <p>{tr("Spune-ne ce îți propui. Te ajutăm să alegi pregătirea potrivită.")}</p>
          <Button to="/contact">{tr("Să ne cunoaștem")}</Button>
        </aside>
        <article className="prose">
          <h2>{tr("ALANDIS — pregătire pentru o carieră în transporturi")}</h2>
          <p>{tr("În transporturi, fiecare activitate presupune responsabilitate, cunoștințe și o pregătire potrivită. La ALANDIS, îi sprijinim pe cei care vor să înceapă o activitate profesională, să își actualizeze calificările sau să facă următorul pas în carieră. Reunim cursuri pentru atestate profesionale și servicii de consultanță, astfel încât să poți înțelege ce ai de făcut și cum să te pregătești.")}</p>
          <p>{tr("Ne adresăm atât conducătorilor auto, cât și celor care coordonează activități de transport sau își dezvoltă o afacere în acest domeniu. Pornim de la obiectivul tău și discutăm despre cursul potrivit, documentele necesare și etapele pe care le ai de parcurs.")}</p>
          <h2>{tr("Atestate adaptate activității tale")}</h2>
          <p>{tr("Oferta noastră include pregătire pentru taxi, Închiriere (Ride-sharing), transport de marfă și transport de persoane, precum și pentru manageri de transport. În funcție de specializare, poți găsi cursuri de calificare inițială CPI, pregătire periodică CPC, CPP Marfă pentru transport până în 3.5 tone și informații despre vizarea sau prelungirea atestatelor.")}</p>
          <p>{tr("Pentru activitățile specializate, catalogul cuprinde ADR pentru colete și cisterne, transport agabaritic, transportul vehiculelor defecte sau avariate și conducerea troleibuzelor. Sunt disponibile și cursuri dedicate celor care doresc să devină instructori de conducere auto sau profesori de legislație rutieră. Te ajutăm să identifici specializarea care corespunde activității pe care vrei să o desfășori.")}</p>
          <h2>{tr("Îndrumare de la înscriere până la examen")}</h2>
          <p>{tr("Un început bun înseamnă să știi la ce să te aștepți. Îți oferim informații despre condițiile de înscriere, actele necesare, program, tarife și modul de examinare pentru cursul ales. Pregătirea pentru examen este însoțită de explicații și sprijin pentru organizarea dosarului, astfel încât fiecare etapă să fie mai ușor de urmărit.")}</p>
          <p>{tr("Punem accent pe comunicare clară, răbdare și înțelegerea responsabilităților profesionale. Pentru cei interesați de pregătire în limba engleză, oferim informații despre cursurile disponibile și modalitatea de participare. Detaliile se stabilesc în funcție de specializarea aleasă și de nevoile cursantului.")}</p>
          <h2>{tr("Consultanță pentru activitatea și afacerea ta")}</h2>
          <p>{tr("Pe lângă pregătirea profesională, ALANDIS oferă consultanță pentru transport alternativ și Închiriere (Ride-sharing), inclusiv pentru activități pe platforme precum Uber și Bolt, precum și pentru autorizarea transportului în regim de taxi. Discutăm despre pașii administrativi și documentele necesare în funcție de activitatea pe care dorești să o organizezi.")}</p>
          <p>{tr("Serviciile prezentate pe site includ și calificare sau reorientare profesională, consultanță fiscală și contabilitate. Fie că îți pregătești începutul într-un domeniu nou sau ai nevoie de sprijin pentru activitatea curentă, poți discuta cu noi pentru a identifica serviciul potrivit situației tale.")}</p>
          <h2>{tr("O conversație clară despre următorul tău pas")}</h2>
          <p>{tr("Credem că alegerea unui curs începe cu întrebările potrivite: ce activitate vrei să desfășori, ce pregătire ai deja și de ce calificare ai nevoie? De aici construim împreună pașii următori, cu informații despre opțiuni și cerințele specifice fiecărei specializări.")}</p>
          <p>{tr("Ne găsești în București, Piața Valter Mărăcineanu nr. 1–3, Sector 1. Ne poți contacta la")}{" "}<a href={`tel:${phone}`}>0771 303 601</a>{" "}{tr("sau")}{" "}
            <a href={`tel:${additionalPhone}`}>0764 900 841</a>{tr(", prin e-mail la")}{" "}
            <a href={`mailto:${email}`}>{email}</a>{" "}{tr("sau pe")}{" "}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{tr("WhatsApp")}</a>{tr(". Spune-ne ce îți propui, iar noi te ajutăm să găsești pregătirea și sprijinul potrivit pentru următoarea etapă a carierei tale.")}</p>
        </article>
      </section>
      <CTA />
    </>
  );
}
function Driving() {
  const { tr } = useLanguage();
  const p = original["scoala-de-soferi"].paragraphs;
  return (
    <>
      <PageIntro
        eyebrow={tr("Școala de șoferi")}
        title={tr("Încrederea se învață. Kilometru cu kilometru.")}
        text={tr("Pregătirea pentru permis începe cu înțelegerea drumului, a mașinii și a responsabilității de la volan.")}
      />
      <section className="container section reading-layout">
        <aside className="reading-aside">
          <div className="aside-icon">
            <CarFront size={35} />
          </div>
          <h3>{tr("Primul tău permis începe cu o conversație.")}</h3>
          <p>{tr("Află detaliile despre înscriere, categorii, documente, program și tarife.")}</p>
          <Button to="/contact">{tr("Vreau să mă înscriu")}</Button>
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
          <Eyebrow>{tr("PREGĂTIRE PENTRU VIAȚĂ")}</Eyebrow>
          <h2>{tr("Un șofer bun gândește preventiv.")}</h2>
          <div className="prose">
            <p>{tr(p[0])}</p>
          </div>
          <div className="driving-features">
            <span>
              <ShieldCheck />{tr("Siguranță")}</span>
            <span>
              <Leaf />{tr("Economie")}</span>
            <span>
              <Users />{tr("Respect")}</span>
          </div>
          <h2 className="mt-12">{tr("Obiceiuri mici. O diferență mare.")}</h2>
          <p className="muted mb-6">{tr(p[1])}</p>
          <div className="driving-tips">
            {[2, 4, 6, 8].map((index, i) => (
              <details key={index} open={i === 0}>
                <summary>
                  <span className="tip-index">0{i + 1}</span>
                  {tr(p[index])}
                  <ChevronDown size={20} />
                </summary>
                <div className="prose">
                  <p>{tr(p[index + 1])}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="road-signs" aria-label={tr("Indicatoare rutiere")}>
            {["Trecere pentru pietoni", "Drum cu prioritate", "Sens unic", "Accesul interzis", "Oprire"].map((label, index) => (
              <figure key={label}>
                <img src={`${import.meta.env.BASE_URL}images/original-scoala-de-soferi-${index + 1}.png`} alt={tr(label)} loading="lazy" />
                <figcaption>{tr(label)}</figcaption>
              </figure>
            ))}
          </div>
        </article>
      </section>
      <FAQ />
      <CTA />
    </>
  );
}
function Certificates() {
  const { tr, language } = useLanguage();
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
        normalize(tr(c.title) + " " + tr(c.description) + " " + c.title + " " + c.description).includes(normalize(query)),
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
        eyebrow={tr("Atestate profesionale")}
        title={tr("Pregătirea potrivită pentru cariera ta.")}
        text={tr("Descoperă cursurile Alandis. Găsește specializarea potrivită, condițiile de înscriere și informațiile despre examen.")}
      />
      <section className="container section catalog">
        <div className="catalog-heading">
          <div>
            <Eyebrow>{tr("ALEGE SPECIALIZAREA")}</Eyebrow>
            <h2>{tr("Explorează cursurile noastre.")}</h2>
          </div>
          <a href="#tarife" onClick={(event) => { event.preventDefault(); document.getElementById("tarife")?.scrollIntoView({ behavior: "smooth" }); }} className="text-link">{tr("Vezi tarifele")}{" "}<ArrowRight size={17} />
          </a>
        </div>
        <label className="search-field">
          <Search size={21} />
          <input
            type="search"
            value={query}
            onChange={(e) => update("q", e.target.value)}
            placeholder={tr("Caută un atestat: ADR, manager, transport…")}
            aria-label={tr("Caută atestate")}
          />
        </label>
        <div className="filters" aria-label={tr("Filtrează atestatele")}>
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
              {tr(c)}
            </button>
          ))}
        </div>
        <div className="catalog-language-note">
          <BookOpen size={22} aria-hidden="true" />
          <div className="catalog-language-texts">
            <div lang={language}>
              <h3>{tr("Cursuri și în limba engleză")}</h3>
              <p>{tr("Fiecare curs poate fi susținut în limba engleză.")}</p>
            </div>
            {language === "ro" && <div lang="en">
              <h3>{tr("Courses also available in English")}</h3>
              <p>{tr("Every course can be taken in English.")}</p>
            </div>}
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
                <span className="course-category">{tr(c.category)}</span>
              </div>
              <h3>{tr(c.title)}</h3>
              <p>{tr(c.description)}</p>
              <span className="service-link">{tr("Vezi detalii")}{" "}<ArrowUpRight size={19} />
              </span>
            </Link>
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <Search size={38} />
            <h3>{tr("Nu am găsit un atestat pentru această căutare.")}</h3>
            <p>{tr("Încearcă un alt cuvânt sau afișează toate specializările.")}</p>
            <button className="button" onClick={() => setParams({})}>{tr("Resetează filtrele")}{" "}<ArrowRight size={17} />
            </button>
          </div>
        )}
        <section id="tarife" className="prices">
          <div>
            <Eyebrow>{tr("INVESTEȘTE ÎN PREGĂTIREA TA")}</Eyebrow>
            <h2>{tr("Tarife transparente.")}</h2>
            <br />
            <p>{tr("Tarifele afișate includ înscrierea, pregătirea și simularea de examen pentru obținerea atestatului profesional. Pentru detalii despre cursurile disponibile, condițiile de înscriere și documentele necesare, te invităm să ne contactezi.")}</p>
            <Button to="/contact?interes=Atestate%20profesionale">{tr("Solicită detalii")}</Button>
          </div>
          <div className="price-list">
            {[
              ["Atestat conducător auto închiriere (Ride-sharing)", "200 lei"],
              ["Atestat conducător auto TAXI", "200 lei"],
              ["Vizare/Prelungire atestat închiriere (Ride-sharing) / TAXI", "100 lei"],
              ["Manager închiriere (Ride-sharing) /TAXI", "300 lei"],
              ["CPP Marfă", "250 lei"],
            ].map(([t, p]) => (
              <div key={t}>
                <span>{tr(t)}</span>
                <strong>{tr(p)}</strong>
              </div>
            ))}
          </div>
        </section>
      </section>
      <CTA />
    </>
  );
}
function CourseDetail() {
  const { tr, language } = useLanguage();
  const { id } = useParams();
  const index = Number(id) - 1;
  const c = courses[index];
  const doc = documents[index];
  if (!c || !doc) return <NotFound />;
  return (
    <>
      <PageIntro
        eyebrow={tr("Ghid de atestare")}
        title={c.title}
        text={c.description}
      />
      <section className="container section">
        <Link className="text-link mb-8" to="/atestate-profesionale">
          <ArrowLeft size={17} />{tr("Înapoi la toate atestatele")}</Link>
        <div className="reading-layout">
          <aside className="reading-aside">
            <c.icon size={38} />
            <span className="course-category block mt-5">{tr(c.category)}</span>
            <h3>{tr("Tot ce trebuie să știi, într-un singur ghid.")}</h3>
            <p>{tr("Condiții de acces, documente necesare, pregătire și examinare.")}</p>
            <a className="button" href={`${import.meta.env.BASE_URL}documents/${language === "en" ? "en/" : ""}${id}.docx`} download>{tr("Descarcă ghidul DOCX")}{" "}<Download size={18} />
            </a>
            <Button
              to={`/contact?interes=${encodeURIComponent(c.title)}`}
              light
            >{tr("Întreabă despre curs")}</Button>
          </aside>
          <article className="prose document-content">
            <div className="document-heading">
              <FileText size={22} />
              <span>{tr("GHID COMPLET ·")}{" "}{String(Number(id)).padStart(2, "0")} / 16
              </span>
            </div>
            {doc.paragraphs.map((p, i) =>
              p.length < 110 && !/^[a-z][).]|^-|^•/.test(p) ? (
                <h2 key={i}>{tr(p)}</h2>
              ) : (
                <p key={i}>{tr(p)}</p>
              ),
            )}
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
  const { tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("Consultanță")}
        backgroundImage={consultancyIntroImage}
        title={tr("Planuri mari. Pași bine îndrumați.")}
        text={tr("Asistență și autorizare dedicată în transporturi rutiere. De la calificare profesională până la dezvoltarea afacerii tale.")}
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
              <h2>{tr(g.title)}</h2>
              <ul>
                {original.consultanta.paragraphs
                  .slice(...(g.range as [number, number]))
                  .map((p, j) => (
                    <li key={j}>{tr(p).replace(/^–\s*/, "")}</li>
                  ))}
              </ul>
              <Link
                to={`/contact?interes=${encodeURIComponent(g.title)}`}
                className="text-link"
              >{tr("Discută cu un consultant")}{" "}<ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
        <div className="info-box">
          <CircleHelp size={22} />
          <div>
            <p>{tr("Închirierea platformei pentru exerciții ADR este disponibilă doar pentru București și Ilfov.")}</p>
            <p>{tr(original.consultanta.paragraphs.at(-1)!)}</p>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
function Contact() {
  const { tr } = useLanguage();
  const [params] = useSearchParams();
  const requestedInterest = params.get("interes");
  const initialInterest =
    requestedInterest && requestedInterest !== "Școala de șoferi"
      ? requestedInterest
      : "Atestate profesionale";
  return (
    <>
      <PageIntro
        eyebrow={tr("Contact")}
        backgroundImage={contactIntroImage}
        title={tr("Orice drum începe cu un „bună”.")}
        text={tr("Ai o întrebare, un plan sau pur și simplu vrei să știi de unde să începi? Hai să vorbim.")}
      />
      <section className="container section contact-layout">
        <div>
          <Eyebrow>{tr("SUNTEM AICI PENTRU TINE")}</Eyebrow>
          <h2>{tr("Facem primul pas")}<br />{tr("împreună.")}</h2>
          <p className="muted">{tr("Pentru înscrieri, informații despre cursuri, tarife sau consultanță, contactează-ne direct.")}</p>
          <a className="contact-method" href="tel:+40730347777">
            <span className="service-icon">
              <Phone size={25} />
            </span>
            <div>
              <small>{tr("SUNĂ-NE")}</small>
              <strong>0730 347 777</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a className="contact-method" href={`tel:${additionalPhone}`}>
            <span className="service-icon">
              <Phone size={25} />
            </span>
            <div>
              <small>{tr("SUNĂ-NE")}</small>
              <strong>0764 900 841</strong>
            </div>
            <ArrowUpRight />
          </a>
          <a className="contact-method" href={`mailto:${email}`}>
            <span className="service-icon">
              <Mail size={25} />
            </span>
            <div>
              <small>{tr("SCRIE-NE PE E-MAIL")}</small>
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
              <small>{tr("SCRIE-NE PE WHATSAPP")}</small>
              <strong>{tr("O conversație, mai multe răspunsuri.")}</strong>
            </div>
            <ArrowUpRight />
          </a>
          <div className="contact-note">
            <MapPin size={21} />
            <p>{tr("Detaliile despre locația cursurilor și program se comunică direct, în funcție de pregătirea aleasă.")}</p>
          </div>
        </div>
        <ContactForm initialInterest={initialInterest} />
      </section>
    </>
  );
}
function Privacy() {
  const { tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("Confidențialitate")}
        title={tr("Datele tale, în controlul tău.")}
        text={tr("Cum sunt folosite datele când vizitezi site-ul sau ne contactezi.")}
      />
      <article className="container section prose narrow">
        <PrivacyContent />
      </article>
    </>
  );
}
function Terms() {
  const { tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("Termeni și condiții")}
        title={tr("Informații clare despre folosirea site-ului.")}
        text={tr("Condiții de utilizare, solicitări și servicii ALANDIS.")}
      />
      <article className="container section prose narrow">
        <TermsContent />
      </article>
    </>
  );
}
function NotFound() {
  const { tr } = useLanguage();
  return (
    <section className="container section empty-state">
      <Compass size={55} />
      <Eyebrow>{tr("404 · UN MIC OCOL")}</Eyebrow>
      <h1>{tr("Pagina aceasta nu este pe traseu.")}</h1>
      <p>{tr("Te ajutăm să revii pe drumul potrivit.")}</p>
      <Button to="/">{tr("Înapoi la început")}</Button>
    </section>
  );
}
function App() {
  const { tr } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    const label =
      nav.find(([p]) => p === location.pathname)?.[1] ||
      (location.pathname === "/scoala-de-soferi" ? "Școala de șoferi" : "") ||
      (location.pathname.startsWith("/atestate-profesionale/")
        ? "Ghid de atestare"
        : location.pathname === "/despre-noi"
          ? "Despre noi"
          : location.pathname === "/confidentialitate"
            ? "Confidențialitate"
            : location.pathname === "/termeni-si-conditii"
              ? "Termeni și condiții"
              : "Pagina nu a fost găsită");
    document.title = `${tr(label)} — Permis Atestat`;
  }, [location.pathname, tr]);
  return (
    <>
      <a className="skip-link" href="#continut" onClick={(event) => { event.preventDefault(); const content = document.getElementById("continut"); content?.scrollIntoView(); content?.focus(); }}>{tr("Sari la conținut")}</a>
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
          <Route path="/termeni-si-conditii" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <LanguageSwitcher />
      <a
        className="whatsapp-float"
        href={whatsapp()}
        target="_blank"
        rel="noreferrer"
        aria-label={tr("Întreabă despre cursuri pe WhatsApp")}
      >
        <MessageCircle size={24} />
        <span>{tr("Întreabă-ne")}</span>
      </a>
    </>
  );
}
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider><App /></LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
