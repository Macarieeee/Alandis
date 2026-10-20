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
} from "lucide-react";
import original from "./data/original.json";
import documents from "./data/documents.json";
import "./styles.css";

const phone = "+40771303601";
const whatsapp = (
  message = "Bună ziua! Aș dori mai multe informații despre cursurile dumneavoastră.",
) => `https://wa.me/40771303601?text=${encodeURIComponent(message)}`;
const nav = [
  ["/", "Acasă"],
  ["/scoala-de-soferi", "Școala de șoferi"],
  ["/atestate-profesionale", "Atestate profesionale"],
  ["/consultanta", "Consultanță"],
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
    title: "Manager taxi și închiriere",
    category: "Management",
    description:
      "Atestare pentru managementul transportului în regim de taxi și închiriere.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Conducător auto taxi",
    category: "Taxi și închiriere",
    description:
      "Pregătire profesională pentru transportul de persoane în regim de taxi.",
    icon: CarFront,
  },
  {
    title: "Conducător auto închiriere",
    category: "Taxi și închiriere",
    description:
      "Atestare pentru transportul de persoane în regim de închiriere.",
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
function Logo() {
  return (
    <Link className="logo" to="/" aria-label="Permis Atestat — Acasă">
      <span className="logo-symbol">
        <RouteIcon size={27} />
      </span>
      <span>
        permis<span className="logo-light">atestat</span>
        <small>DRUMUL TĂU ÎNCEPE AICI</small>
      </span>
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
          <a href={`tel:${phone}`}>
            <Phone size={12} /> Hai să vorbim{" "}
            <span className="topbar-number">0771 303 601</span>
            <ArrowUpRight size={12} />
          </a>
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
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-main">
          <div>
            <Logo />
            <p>
              Mai mult decât un permis.
              <br />
              Încredere pentru fiecare drum.
            </p>
            <a className="footer-phone" href={`tel:${phone}`}>
              <Phone size={17} />
              0771 303 601
            </a>
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
          <Eyebrow>PRIMUL PAS ÎȚI APARȚINE</Eyebrow>
          <h2>Destinația ta. Pregătirea noastră.</h2>
          <p>Spune-ne unde vrei să ajungi. Găsim împreună drumul potrivit.</p>
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
    "Cum încep școala de șoferi?",
    "Primul pas este să ne contactezi. Discutăm despre obiectivul tău și îți comunicăm detaliile despre înscriere, documentele necesare, program și costuri.",
  ],
  [
    "Unde găsesc documentele pentru atestate?",
    "În secțiunea Atestate profesionale găsești 16 ghiduri. Alege specializarea pentru a citi informațiile despre condiții, pregătire și examinare sau pentru a descărca documentul original.",
  ],
  [
    "Oferiți și pregătire profesională periodică?",
    "Da. În oferta prezentată sunt incluse pregătirea periodică CPC și actualizarea cunoștințelor managerilor de transport. Detaliile sunt disponibile în ghidul fiecărei specializări.",
  ],
  [
    "Mă puteți ajuta cu autorizarea unei afaceri în transport?",
    "Serviciile de consultanță includ autorizări pentru școli de șoferi și centre de pregătire, taxi, închiriere și transport alternativ, precum și asistență fiscală și juridică.",
  ],
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
            La volan.
            <br />
            În carieră.
            <br />
            <span>Mereu înainte.</span>
          </h1>
          <p>
            Fie că faci primul pas spre permis sau următorul pas în carieră,
            suntem alături de tine. Cu răbdare, pregătire și încredere.
          </p>
          <div className="hero-actions">
            <Button to="/scoala-de-soferi">Descoperă școala de șoferi</Button>
            <Link className="text-link" to="/atestate-profesionale">
              Vreau un atestat <ArrowUpRight size={17} />
            </Link>
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
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            alt="Un drum sinuos printr-o pădure verde, văzut de sus"
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
          <div className="floating-card">
            <span className="mini-icon">
              <CarFront size={25} />
            </span>
            <div>
              <strong>Mai mult decât un permis.</strong>
              <span>Libertatea de a merge mai departe.</span>
            </div>
            <Check size={17} />
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
            De la primele ore de condus la o carieră în transporturi. Tot ce ai
            nevoie, într-un singur loc.
          </p>
        </div>
        <div className="service-grid">
          {[
            {
              icon: CarFront,
              n: "01",
              title: "Școala de șoferi",
              text: "Învață să conduci cu încredere. Teorie, practică și obiceiuri bune care rămân cu tine.",
              tags: ["Pregătire teoretică", "Conduită preventivă"],
              path: "/scoala-de-soferi",
              link: "Primul pas spre permis",
            },
            {
              icon: GraduationCap,
              n: "02",
              title: "Atestate profesionale",
              text: "Deschide noi oportunități. Pregătire pentru transport marfă, persoane și specializări.",
              tags: ["CPI & CPC", "ADR", "Manager transport"],
              path: "/atestate-profesionale",
              link: "Descoperă atestatele",
            },
            {
              icon: BriefcaseBusiness,
              n: "03",
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
              src={`${import.meta.env.BASE_URL}images/instructor.png`}
              alt="Pregătire practică la volan, alături de instructor"
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
            <Eyebrow>OAMENI, ÎNAINTE DE TOATE</Eyebrow>
            <h2>
              Nu trebuie să știi deja.
              <br />
              De aceea suntem aici.
            </h2>
            <p>
              Fiecare viitor șofer are propriul ritm, propriile întrebări și
              propriile emoții. Misiunea noastră este să te înțelegem și să îți
              explicăm, pas cu pas, ceea ce ai nevoie să înveți.
            </p>
            <p>
              Dincolo de promovarea examenului, ne dorim să devii un șofer calm,
              responsabil și atent la ceilalți.
            </p>
            <div className="about-checks">
              <span>
                <Check size={16} /> Învățare adaptată personalității tale
              </span>
              <span>
                <Check size={16} /> Noțiuni practice pentru situații reale
              </span>
              <span>
                <Check size={16} /> Susținere pe tot parcursul pregătirii
              </span>
            </div>
            <Link className="text-link" to="/despre-noi">
              Cunoaște-ne mai bine <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-top">
          <div>
            <Eyebrow>PAS CU PAS, ÎMPREUNĂ</Eyebrow>
            <h2>Un început mai simplu decât crezi.</h2>
          </div>
          <Link to="/contact" className="text-link">
            Începe cu o conversație <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="steps">
          {[
            [
              "01",
              "Ne cunoaștem",
              "Ne spui ce îți dorești, iar noi îți explicăm opțiunile și pașii de urmat.",
            ],
            [
              "02",
              "Te pregătești",
              "Construiești cunoștințe și deprinderi, cu îndrumare și explicații clare.",
            ],
            [
              "03",
              "Mergi mai departe",
              "Te prezinți la examen cu pregătirea necesară pentru următoarea etapă.",
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
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro">
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
        title="Învățăm să mergem înainte. Împreună."
        text="Profesionalism, pasiune și răbdare. Pentru un început în care să ai încredere."
      />
      <section className="container section reading-layout">
        <aside className="reading-aside">
          <img
            src={`${import.meta.env.BASE_URL}images/instructor.png`}
            alt="Instructor și cursant în timpul pregătirii"
          />
          <h3>Fiecare șofer a început de undeva.</h3>
          <p>Noi suntem aici pentru primul tău pas.</p>
          <Button to="/contact">Să ne cunoaștem</Button>
        </aside>
        <article className="prose">
          <h2>Mai mult decât obținerea unui permis</h2>
          {original.home.paragraphs.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
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
          <Button to="/contact?interes=Școala%20de%20șoferi">
            Vreau să mă înscriu
          </Button>
          <a className="aside-phone" href={`tel:${phone}`}>
            <Phone size={16} />
            0771 303 601
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
  const filtered = courses
    .map((c, i) => ({ ...c, id: i + 1 }))
    .filter(
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
        title="Următorul nivel în cariera ta."
        text="16 ghiduri de pregătire profesională. Găsește specializarea potrivită, condițiile de înscriere și informațiile despre examen."
      />
      <section className="container section catalog">
        <div className="catalog-heading">
          <div>
            <Eyebrow>ALEGE SPECIALIZAREA</Eyebrow>
            <h2>Pregătit pentru mai mult.</h2>
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
          <span>16 specializări</span>
        </label>
        <div className="filters" aria-label="Filtrează atestatele">
          {[
            "Toate",
            "Transport marfă",
            "Transport persoane",
            "Management",
            "Taxi și închiriere",
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
        <p className="result-count" aria-live="polite">
          {filtered.length}{" "}
          {filtered.length === 1
            ? "specializare disponibilă"
            : "specializări disponibile"}
        </p>
        <div className="course-grid">
          {filtered.map((c) => (
            <Link
              className="course-card"
              key={c.id}
              to={`/atestate-profesionale/${c.id}`}
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
                Condiții, documente și examen <ArrowUpRight size={19} />
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
            <Button to="/contact?interes=Atestate%20profesionale">
              Solicită detalii
            </Button>
          </div>
          <div className="price-list">
            {[
              ["Manager transport marfă", "450 lei"],
              ["Manager transport persoane", "450 lei"],
              ["Manager taxi și închiriere", "350 lei"],
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
    title: "Autorizare școli și centre de pregătire",
    icon: BookOpen,
    range: [1, 8],
  },
  {
    title: "Calificare și reorientare profesională",
    icon: GraduationCap,
    range: [8, 17],
  },
  {
    title: "Autorizare transport în regim de taxi",
    icon: CarFront,
    range: [17, 21],
  },
  {
    title: "Închiriere și transport alternativ",
    icon: RouteIcon,
    range: [21, 28],
  },
  {
    title: "Consultanță fiscală și contabilitate",
    icon: BriefcaseBusiness,
    range: [28, 33],
  },
  {
    title: "Consultanță juridică și carieră",
    icon: ShieldCheck,
    range: [33, 37],
  },
];
function Consultancy() {
  return (
    <>
      <PageIntro
        eyebrow="Consultanță"
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
  const [name, setName] = useState("");
  const [interest, setInterest] = useState(
    params.get("interes") || "Școala de șoferi",
  );
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const text = `Bună ziua! Mă numesc ${name}. Sunt interesat(ă) de: ${interest}. ${message}`;
  return (
    <>
      <PageIntro
        eyebrow="Contact"
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
                    "Școala de șoferi",
                    "Atestate profesionale",
                    "Consultanță",
                    params.get("interes") || "Alte informații",
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
          contactează-ne la <a href={`tel:${phone}`}>0771 303 601</a>.
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
