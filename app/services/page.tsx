import type { Metadata } from "next";
import Link from "next/link";
import styles from "../subpage.module.css";
import card from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Residential, commercial, hospitality, and styling services, full-service interior design from concept to delivery.",
};

/* line icons, one per service */
function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-5.5h4V20" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V6l7-3v18" />
          <path d="M11 10h9v11" />
          <path d="M7 8.5h0M7 12h0M7 15.5h0M15 14h0M15 17.5h0" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...common}>
          <path d="M5 8h11v4a5.5 5.5 0 01-11 0V8z" />
          <path d="M16 9h1.8a2.2 2.2 0 010 4.4H16" />
          <path d="M4 20h13" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
          <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
        </svg>
      );
    default:
      return null;
  }
}

const services = [
  {
    icon: "home",
    title: "Residential Design",
    desc: "Whole-home and single-room interiors tailored to how you actually live. We handle space planning, finishes, joinery, furniture, lighting, and styling.",
    points: ["Space planning", "Finishes & materials", "Custom joinery", "Furniture & styling"],
  },
  {
    icon: "building",
    title: "Commercial Spaces",
    desc: "Workplaces and retail that perform. We balance brand, function, and budget to create environments that people, and businesses, thrive in.",
    points: ["Workplace strategy", "Brand-led interiors", "Retail & showroom", "Fit-out management"],
  },
  {
    icon: "hospitality",
    title: "Hospitality",
    desc: "Hotels, restaurants, bars, and lounges designed for atmosphere and memorability, spaces guests love and want to return to.",
    points: ["Concept & narrative", "FF&E specification", "Lighting design", "Signage & details"],
  },
  {
    icon: "sparkle",
    title: "Styling & Staging",
    desc: "The finishing layer. Whether dressing your home or staging a property for sale, we make spaces feel complete and irresistible.",
    points: ["Art & accessories", "Soft furnishings", "Property staging", "Photoshoot styling"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <header className={`${styles.pageHeader} ${styles.bannerServices}`}>
        <div className="container">
          <span className="eyebrow">Services</span>
          <h1>Everything your space needs, under one roof.</h1>
          <p className="lead">
            From the first concept to the final cushion, we offer full-service
            interior design across residential, commercial, and hospitality
            projects.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className={card.grid}>
            {services.map((s, i) => (
              <article key={s.title} className={`${card.card} reveal`}>
                <div className={card.head}>
                  <span className={card.icon}>
                    <ServiceIcon name={s.icon} />
                  </span>
                  <span className={card.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className={card.title}>{s.title}</h2>
                <p className={card.desc}>{s.desc}</p>

                <ul className={card.points}>
                  {s.points.map((p) => (
                    <li key={p}>
                      <span className={card.tick} aria-hidden="true">
                        <svg viewBox="0 0 24 24" width="13" height="13">
                          <path
                            d="M5 12.5l4.5 4.5L19 7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <Link href="/contact" className={card.link}>
                  Enquire about this
                  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                    <path
                      d="M5 12h13M13 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`section ${styles.tinted}`}>
        <div className={`container ${styles.head} reveal`}>
          <span className="eyebrow">Not sure where to start?</span>
          <h2>Tell us about your project.</h2>
          <p className="lead" style={{ marginInline: "auto" }}>
            Every great space begins with a conversation. Book a free,
            no-obligation consultation and we&rsquo;ll point you in the right
            direction.
          </p>
          <div style={{ marginTop: 28 }}>
            <Link href="/contact" className="btn btn-primary">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
