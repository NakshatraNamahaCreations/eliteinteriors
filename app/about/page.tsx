import type { Metadata } from "next";
import Link from "next/link";
import styles from "../subpage.module.css";
import a from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Elite Interiors, a studio of designers, makers, and project leads creating timeless, livable spaces.",
};

/* line icons for the three values */
function ValueIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5.3l3.4 2" />
        </svg>
      );
    case "sofa":
      return (
        <svg {...common}>
          <path d="M4 12V9a2 2 0 012-2h12a2 2 0 012 2v3" />
          <path d="M3 12h18v5H3z" />
          <path d="M6 17v2M18 17v2" />
        </svg>
      );
    case "lens":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L21 21" />
          <path d="M10.5 8v5M8 10.5h5" />
        </svg>
      );
    default:
      return null;
  }
}

const values = [
  {
    icon: "clock",
    title: "Timeless over trendy",
    desc: "We design for the next decade, not the next season. Good interiors should still feel right years later.",
  },
  {
    icon: "sofa",
    title: "Livable luxury",
    desc: "Beautiful spaces that you can actually live in, durable, comfortable, and made for real life.",
  },
  {
    icon: "lens",
    title: "Detail obsessed",
    desc: "From a door handle to a ceiling line, the details are where a space goes from good to unforgettable.",
  },
];

/* TODO: confirm these figures with the studio before going live. */
const stats = [
  { value: "15+", label: "Years of experience" },
  { value: "450+", label: "Spaces designed" },
  { value: "100%", label: "In-house project management" },
  { value: "10 yr", label: "Warranty on modular work" },
];

const process = [
  {
    step: "01",
    title: "Consultation",
    desc: "We visit your space, understand how you live, and talk through budget, timelines, and the look you're after.",
  },
  {
    step: "02",
    title: "Design & 3D",
    desc: "You get layouts, material palettes, and photo-real 3D views, so you can see the finished room before a single nail goes in.",
  },
  {
    step: "03",
    title: "Execution",
    desc: "Our own supervisors run the site daily. Carpentry, electricals, false ceiling, and painting are coordinated so nothing waits on anything else.",
  },
  {
    step: "04",
    title: "Handover",
    desc: "A deep clean, a walkthrough against the original drawings, and a snag list closed before we hand you the keys.",
  },
];

const reasons = [
  "Fixed, itemised quotes, no cost creep midway",
  "Branded modular hardware with written warranty",
  "One dedicated point of contact from start to finish",
  "On-site supervision, not sub-contracted labour",
  "Vaastu-aware layouts on request",
  "Post-handover service support",
];

export default function AboutPage() {
  return (
    <>
      <header className={`${styles.pageHeader} ${styles.bannerAbout}`}>
        <div className="container">
          <span className="eyebrow">Our studio</span>
          <h1>Design with intention, delivered with care.</h1>
          <p className="lead">
            Elite Interiors began with a simple belief: a well-designed space
            quietly improves your life every single day. For over fifteen years
            we&rsquo;ve shaped homes, workplaces, and hospitality spaces that
            feel both elevated and effortlessly livable.
          </p>
        </div>
      </header>

      {/* ---------- 1. who we are ---------- */}
      <section className="section">
        <div className={`container ${a.intro}`}>
          <div className={`${a.introArt} reveal`}>
            <span className={a.introFrame} aria-hidden="true" />
            <div
              className={a.introImg}
              role="img"
              aria-label="An Elite Interiors living room"
            />
            <div className={a.introBadge}>
              <span className={a.introBadgeNum}>15+</span>
              <span className={a.introBadgeText}>
                Years of
                <br />
                Practice
              </span>
            </div>
          </div>

          <div className={`${a.copy} reveal`}>
            <span className={a.eyebrow}>WHO WE ARE</span>
            <h2 className={a.h2}>
              A small studio with a <span className={a.gold}>big standard.</span>
            </h2>
            <p>
              We&rsquo;re a tight-knit team of designers, makers, and project
              leads who care as much about how a space functions as how it
              looks. Every project is led personally, no hand-offs, no
              guesswork, just a clear partnership from first idea to final
              styling.
            </p>
            <p>
              We work with trusted craftspeople and suppliers, and we manage the
              details so you don&rsquo;t have to. The result: interiors that are
              tailored, considered, and unmistakably yours.
            </p>
            <Link href="/contact" className={a.btn}>
              Work with us
              <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
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
          </div>
        </div>
      </section>

      {/* ---------- 2. values ---------- */}
      <section className={`section ${styles.tinted}`}>
        <div className="container">
          <div className={`${styles.head} reveal`}>
            <span className="eyebrow">What we believe</span>
            <h2>The principles behind every project.</h2>
          </div>
          <div className={a.valueGrid}>
            {values.map((v, i) => (
              <article key={v.title} className={`${a.valueCard} reveal`}>
                <span className={a.valueNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={a.valueIcon}>
                  <ValueIcon name={v.icon} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 3. stats ---------- */}
      <section className={a.statsBand}>
        <div className={`container ${a.statsGrid}`}>
          {stats.map((s) => (
            <div key={s.label} className={`${a.statCard} reveal`}>
              <span className={a.statValue}>{s.value}</span>
              <span className={a.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- 4. process ---------- */}
      <section className="section">
        <div className="container">
          <div className={`${styles.head} reveal`}>
            <span className="eyebrow">How we work</span>
            <h2>Four steps, no surprises.</h2>
            <p className="lead">
              Every project runs on the same clear path, so you always know
              what&rsquo;s happening now and what comes next.
            </p>
          </div>
          <div className={a.processGrid}>
            {process.map((p) => (
              <article key={p.step} className={`${a.processCard} reveal`}>
                <span className={a.processStep}>{p.step}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 5. why us ---------- */}
      <section className={`section ${styles.tinted}`}>
        <div className={`container ${a.why}`}>
          <div className={`${a.copy} reveal`}>
            <span className={a.eyebrow}>WHY ELITE INTERIORS</span>
            <h2 className={a.h2}>
              The things clients tell us{" "}
              <span className={a.gold}>matter most.</span>
            </h2>
            <ul className={a.reasonList}>
              {reasons.map((r) => (
                <li key={r}>
                  <span className={a.tick} aria-hidden="true">
                    <svg viewBox="0 0 20 20" width="12" height="12">
                      <path
                        d="M4 10.5l4 4 8-9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`${a.whyArt} reveal`}
            role="img"
            aria-label="A kids room designed by Elite Interiors"
          />
        </div>
      </section>

      {/* ---------- 6. closing CTA ---------- */}
      <section className={a.cta}>
        <div className={`container ${a.ctaInner} reveal`}>
          <h2>Let&rsquo;s design a space you&rsquo;ll love coming home to.</h2>
          <p>
            Tell us about your home and we&rsquo;ll come back with ideas, a
            timeline, and a clear estimate, free of charge.
          </p>
          <div className={a.ctaActions}>
            <Link href="/contact" className={a.btn}>
              Book a free consultation
            </Link>
            <a href="tel:+919980243345" className={a.ctaPhone}>
              or call +91 99802 43345
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
