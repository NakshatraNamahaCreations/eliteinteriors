"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Gallery.module.css";

/* Real project photos, in /public/gallery. To add more, drop the file in that
   folder and append its path here. */
const galleryImages = Array.from(
  { length: 19 },
  (_, i) => `/gallery/project-${String(i + 1).padStart(2, "0")}.jpg`
);

/* dark backdrop behind the whole section */
const BACKDROP = "/gallery/project-01.jpg";

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–100 for the ring
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pct = max > 0 ? (el.scrollLeft / max) * 100 : 0;
    setProgress(Math.round(pct));
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
    const card = el.querySelector<HTMLElement>("[data-gcard]");
    const gap = 22;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* progress ring geometry */
  const R = 22;
  const C = 2 * Math.PI * R;
  const dash = (progress / 100) * C;

  return (
    <section
      className={styles.gallery}
      style={{ backgroundImage: `url(${BACKDROP})` }}
      aria-label="Interior design gallery"
    >
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        {/* left text column */}
        <div className={`${styles.copy} reveal`}>
          <h2 className={styles.title}>
            Interior
            <span className={styles.titleLine}>Design</span>
          </h2>
          <p className={styles.desc}>
            A curated look at our finished spaces, homes shaped with natural
            materials, warm light, and quiet, considered detail.
          </p>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous image"
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
              aria-label="Next image"
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

        {/* right carousel */}
        <div className={styles.track} ref={trackRef}>
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className={styles.card}
              data-gcard
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      </div>

      {/* circular progress indicator (bottom-right) */}
      <div className={styles.ring} aria-hidden="true">
        <svg viewBox="0 0 56 56" width="56" height="56">
          <circle
            cx="28"
            cy="28"
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
          />
          <circle
            cx="28"
            cy="28"
            r={R}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90 28 28)"
          />
        </svg>
        <span className={styles.ringText}>{progress}%</span>
      </div>
    </section>
  );
}
