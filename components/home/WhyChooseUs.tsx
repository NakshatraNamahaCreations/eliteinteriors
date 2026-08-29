import Link from "next/link";
import styles from "./WhyChooseUs.module.css";

/* line icons for the four points */
function PointIcon({ name }: { name: string }) {
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
    case "house":
      return (
        <svg {...common}>
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-5.5h4V20" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5.3l3.4 2" />
        </svg>
      );
    case "pen":
      return (
        <svg {...common}>
          <path d="M4 20l4-1 9.5-9.5a2.1 2.1 0 10-3-3L5 16l-1 4z" />
          <path d="M14.5 6.5l3 3" />
        </svg>
      );
    default:
      return null;
  }
}

/* All four points paraphrase the studio description below them — nothing here
   claims anything the section's own copy doesn't already say. */
const points = [
  {
    icon: "house",
    title: "Everything In-House",
    text: "Design, materials, and execution handled by one team from start to finish.",
  },
  {
    icon: "pen",
    title: "Clarity at Every Stage",
    text: "From the first sketch to the final styling, you always know where things stand.",
  },
  {
    icon: "shield",
    title: "Built to Last",
    text: "Interiors that stay practical and personal long after handover.",
  },
  {
    icon: "clock",
    title: "A Decade in Bangalore",
    text: "Over ten years of crafting homes and renovations across the city.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.section}`} aria-label="Why choose us">
      <div className={`container ${styles.inner}`}>
        {/* ---- left: image composition ---- */}
        <div className={`${styles.media} reveal`}>
          <div
            className={styles.mediaMain}
            style={{ backgroundImage: "url(/why-choose.jpg)" }}
            role="img"
            aria-label="An Elite Interiors living space"
          />
          <div
            className={styles.mediaInset}
            style={{ backgroundImage: "url(/why-bedroom.jpg)" }}
            role="img"
            aria-label="A bedroom completed by Elite Interiors"
          />
          <div className={styles.badge}>
            <span className={styles.badgeNum}>10+</span>
            <span className={styles.badgeLabel}>
              Years of
              <br />
              Craft
            </span>
          </div>
          <span className={styles.mediaFrame} aria-hidden="true" />
        </div>

        {/* ---- right: copy ---- */}
        <div className={`${styles.copy} reveal`}>
          <span className={styles.eyebrow}>WHY CHOOSE US</span>
          <h2 className={styles.title}>
            Why Choose <span className={styles.gold}>Elite Interiors</span>
          </h2>
          <p className={styles.lead}>
            With over a decade of crafting homes across Bangalore, we handle
            every stage in-house, design, materials, and execution, so your
            space is delivered with clarity, quality, and care. From the first
            sketch to the final styling, we create interiors that are practical,
            personal, and built to last.
          </p>

          <ul className={styles.points}>
            {points.map((p) => (
              <li key={p.title} className={styles.point}>
                <span className={styles.pointIcon}>
                  <PointIcon name={p.icon} />
                </span>
                <div>
                  <h3 className={styles.pointTitle}>{p.title}</h3>
                  <p className={styles.pointText}>{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <Link href="/about" className={styles.btn}>
              More About Us
              <span className={styles.btnIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <Link href="/contact" className={styles.btnGhost}>
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
