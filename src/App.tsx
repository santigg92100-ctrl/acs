import { useEffect, useState } from "react";
import {
  brand,
  companyProfile,
  cta,
  difference,
  footer,
  hero,
  identityElements,
  manifesto,
  navItems,
  principles,
  services,
  serviceUnderstanding,
} from "./data/content";
import { Icon } from "./components/Icon";

type LogoProps = {
  variant?: "color" | "white";
  compact?: boolean;
};

function Logo({ variant = "color", compact = false }: LogoProps) {
  const [failed, setFailed] = useState(false);
  const src = variant === "white" ? brand.logoWhite : brand.logoFullColor;

  if (!failed) {
    return (
      <img
        className={`brand-logo ${compact ? "brand-logo--compact" : ""}`}
        src={src}
        alt={brand.name}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <span
      className={`brand-logo-fallback ${variant === "white" ? "brand-logo-fallback--white" : ""}`}
      aria-label={`${brand.name}. Sustituir por logotipo oficial.`}
      title="Placeholder temporal: agregar logotipo oficial en src/assets/brand/"
    >
      {compact ? brand.shortName : `${brand.shortName} · ${brand.legalName}`}
    </span>
  );
}

function OrganicNetwork({ className = "" }: { className?: string }) {
  return (
    <svg className={`organic-network ${className}`} viewBox="0 0 520 420" aria-hidden="true">
      <path d="M147 189C110 128 144 62 219 66c57 3 79 54 126 70 50 17 106 2 132 48 27 47-2 112-55 128-47 14-80-14-125 6-55 24-109 54-158 17-45-35-19-101 8-146Z" />
      <line x1="125" y1="216" x2="228" y2="104" />
      <line x1="228" y1="104" x2="352" y2="171" />
      <line x1="125" y1="216" x2="242" y2="305" />
      <line x1="242" y1="305" x2="352" y2="171" />
      <line x1="352" y1="171" x2="432" y2="257" />
      <circle cx="125" cy="216" r="38" />
      <circle cx="228" cy="104" r="27" />
      <circle cx="352" cy="171" r="44" />
      <circle cx="242" cy="305" r="34" />
      <circle cx="432" cy="257" r="22" />
    </svg>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isScrolled ? "site-header--scrolled" : ""}`}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div className="container header-inner">
        <a className="logo-link" href="#inicio" aria-label="Ir al inicio" onClick={closeMenu}>
          <Logo />
        </a>
        <nav
          id="main-navigation"
          className={`main-nav ${isOpen ? "main-nav--open" : ""}`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((value) => !value)}
        >
          <Icon name={isOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}

function BrandConnectionGraphic() {
  return (
    <div className="brand-graphic" aria-label="Conexión entre negocio, tecnología, comunicación y cliente">
      <OrganicNetwork />
      <div className="brand-graphic__logo">
        <Logo />
      </div>
      <div className="brand-node brand-node--business">
        <Icon name="process" />
        <span>Negocio</span>
      </div>
      <div className="brand-node brand-node--tech">
        <Icon name="cpu" />
        <span>Tecnología</span>
      </div>
      <div className="brand-node brand-node--communication">
        <Icon name="message" />
        <span>Comunicación</span>
      </div>
      <div className="brand-node brand-node--client">
        <Icon name="heart" />
        <span>Cliente</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-section section">
      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-subtitle">{hero.subtitle}</p>
          <p className="hero-description">{hero.supportingText}</p>
          <div className="button-row">
            <a className="button button--primary" href="#acs-att">
              {hero.primaryCta}
            </a>
            <a className="button button--secondary" href="#diferencia-acs">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
        <div className="reveal">
          <BrandConnectionGraphic />
        </div>
      </div>
    </section>
  );
}

function CompanyProfile() {
  return (
    <section id="acs-att" className="section company-section">
      <div className="container intro-grid">
        <div className="section-copy reveal">
          <p className="section-kicker">{companyProfile.kicker}</p>
          <h2>{companyProfile.title}</h2>
        </div>
        <div className="company-content reveal">
          <div className="editorial-copy">
            {companyProfile.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="company-highlights" aria-label="Puntos clave de ACS">
            {companyProfile.highlights.map((highlight) => (
              <span key={highlight}>{highlight}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function IdentityMeaning() {
  return (
    <section id="identidad" className="section identity-section">
      <OrganicNetwork className="identity-background" />
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">Nuestra identidad</p>
          <h2>Una identidad construida a partir de la conexión</h2>
          <p>
            Esta lectura visual interpreta la composición conceptual de la marca: negocio,
            tecnología, comunicación y fidelización como elementos que interactúan.
          </p>
        </div>
        <div className="identity-map reveal">
          {identityElements.map((element) => (
            <article className="identity-item" key={element.title}>
              <Icon name={element.icon} />
              <h3>{element.title}</h3>
              <p>{element.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Difference() {
  return (
    <section id="diferencia-acs" className="section difference-section">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{difference.kicker}</p>
          <h2 className="line-break-title">{difference.title}</h2>
          <p>{difference.intro}</p>
        </div>
        <div className="comparison-grid">
          <article className="comparison-panel reveal">
            <h3>{difference.traditionalTitle}</h3>
            <ul>
              {difference.traditionalItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="comparison-panel comparison-panel--acs reveal">
            <h3>{difference.acsTitle}</h3>
            <ul>
              {difference.acsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="concept-note reveal">{difference.note}</p>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section className="section principles-section">
      <div className="container two-column">
        <div className="section-copy reveal">
          <p className="section-kicker">Principios de marca</p>
          <h2>Los principios que definen a ACS</h2>
          <p>
            Los principios parten del manual de identidad y orientan el tono visual y verbal
            de la marca.
          </p>
        </div>
        <div className="principle-list">
          {principles.map((principle) => (
            <article className="principle-item reveal" key={principle.title}>
              <Icon name={principle.icon} />
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceUnderstanding() {
  return (
    <section className="section service-thinking-section">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{serviceUnderstanding.kicker}</p>
          <h2>{serviceUnderstanding.title}</h2>
        </div>
        <div className="process-grid conceptual-grid">
          {serviceUnderstanding.steps.map((step) => (
            <article className="process-card reveal" key={step.number}>
              <span className="process-number">{step.number}</span>
              <span className="process-dot" aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
        <p className="concept-note reveal">{serviceUnderstanding.clarification}</p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <div className="section-heading reveal">
          <p className="section-kicker">{services.kicker}</p>
          <h2>{services.title}</h2>
          <p className="provisional-note">{services.notice}</p>
        </div>
        <div className="services-grid services-grid--secondary">
          {services.items.map((service) => (
            <article className="card service-card reveal" key={service.title}>
              <Icon name={service.icon} className="card-icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="section manifesto-section">
      <OrganicNetwork className="dark-network" />
      <div className="container manifesto-inner reveal">
        <Logo variant="white" />
        <p className="section-kicker">{manifesto.kicker}</p>
        <h2>{manifesto.title}</h2>
        <p>{manifesto.text}</p>
        <strong>{brand.tagline}</strong>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta-section">
      <div className="cta-symbol" aria-hidden="true">
        ACS
      </div>
      <div className="container cta-inner reveal">
        <h2 className="line-break-title">{cta.title}</h2>
        <p>{cta.text}</p>
        <div className="button-row cta-buttons">
          <a className="button button--white" href="#identidad">
            {cta.primaryCta}
          </a>
          <a className="button button--orange-outline" href="#servicios">
            {cta.secondaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo variant="white" />
          <p>{footer.description}</p>
        </div>
        <div>
          <h2>Mapa</h2>
          <nav aria-label="Navegación del pie de página">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div>
          <h2>Legal</h2>
          {footer.legalLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="back-top" href="#inicio" aria-label="Volver arriba">
            <Icon name="up" /> Volver arriba
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {year} {brand.legalName}. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    items.forEach((item) => item.classList.add("reveal-pending"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.remove("reveal-pending"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            entry.target.classList.remove("reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    items.forEach((item) => {
      if (item.getBoundingClientRect().top < window.innerHeight) {
        item.classList.add("is-visible");
        item.classList.remove("reveal-pending");
      } else {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, []);
}

export default function App() {
  useRevealOnScroll();

  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <CompanyProfile />
        <IdentityMeaning />
        <Difference />
        <Principles />
        <ServiceUnderstanding />
        <Services />
        <Manifesto />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
