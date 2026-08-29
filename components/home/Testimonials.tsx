"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Testimonials.module.css";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  rating: number;
};

function Stars({ count }: { count: number }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.06 1.1-6.47-4.7-4.58 6.5-.95L12 2.5z"
            fill="var(--gold)"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.round((el.scrollLeft / max) * 100) : 0);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-tcard]");
    const gap = 24;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* progress ring geometry */
  const R = 20;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;

  return (
    <section className={`section ${styles.section}`} aria-label="Client testimonials">
      <div className="container">
        {/* header: two-tone heading */}
        <div className={`${styles.head} reveal`}>
          <h2 className={styles.title}>
            Here&rsquo;s What <span className={styles.gold}>Warm Words</span>
            <br />
            <span className={styles.gold}>Our Clients</span> Say
          </h2>
        </div>

        <div className={styles.divider} />

        {/* featured quote · arrows */}
        <div className={styles.controlRow}>
          <p className={styles.featuredQuote}>
            From concept to reality, the team turned my vision into a stunning,
            livable space. I couldn&rsquo;t be happier with this!
          </p>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous testimonials"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M15 5l-7 7 7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="Next testimonials"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* carousel of cards */}
        <div className={styles.track} ref={trackRef}>
          {testimonials.map((t, i) => (
            <figure key={i} className={styles.card} data-tcard>
              <Stars count={t.rating} />
              <blockquote className={styles.quote}>{t.quote}</blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar}>{t.initials}</span>
                <span className={styles.authorMeta}>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* progress ring (bottom-right) */}
      <div className={styles.ring} aria-hidden="true">
        <svg viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="2" />
          <circle
            cx="24"
            cy="24"
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90 24 24)"
          />
        </svg>
        <span className={styles.ringText}>{progress}%</span>
      </div>
    </section>
  );
}
