"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./VisualizeHero.module.css";

/* falling text — animates letter-by-letter when the section scrolls into view.
   Words stay whole (the space lives BETWEEN the word spans so it never collapses). */
function FallingText({
  text,
  start = 0,
  step = 0.05,
}: {
  text: string;
  start?: number;
  step?: number;
}) {
  const words = text.split(" ");
  let i = 0; // global letter index for the stagger
  return (
    <>
      {words.map((word, w) => (
        <span key={w}>
          <span className={styles.fallWordWrap}>
            {word.split("").map((ch) => {
              const delay = start + i * step;
              i += 1;
              return (
                <span
                  key={i}
                  className={styles.fall}
                  style={{ animationDelay: `${delay}s` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

export default function VisualizeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  /* trigger the text + image animations when the section scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${inView ? styles.inView : ""}`}
      aria-label="Visualize your space"
    >
      {/* dotted decorative lines, kept in empty zones so they never cross text */}
      <svg className={styles.lines} viewBox="0 0 1200 600" fill="none" aria-hidden="true">
        <path
          d="M1180 90 C 1230 180, 1230 300, 1170 380"
          stroke="rgba(176,141,87,0.45)"
          strokeWidth="1.2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <path
          d="M700 540 C 860 540, 1000 500, 1160 520"
          stroke="rgba(176,141,87,0.4)"
          strokeWidth="1.2"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      </svg>

      <div className={`container ${styles.inner}`}>
        {/* heading block — letters fall in one by one when in view */}
        <div className={styles.headingBlock}>
          <h1 className={styles.title}>
            <span className={styles.fallWord}>
              <FallingText text="Designed" start={0.05} />
            </span>
            <span className={styles.tag}>
              Interior Designers
              <br />
              in Bangalore
            </span>
          </h1>
          <span className={styles.titleScript}>
            <FallingText text="Around You" start={0.5} />
          </span>
        </div>

        {/* big top-right image — rises + zooms in when in view */}
        <div
          className={`${styles.imgTopRight} ${styles.imgReveal}`}
          style={{ backgroundImage: "url(/visualize-bedroom.jpg)" }}
        >
          <span
            className={styles.imgBadge}
            style={{ backgroundImage: "url(/gallery/project-09.jpg)" }}
            aria-hidden="true"
          />
        </div>

        {/* big bottom-left image — rises + zooms in (staggered) */}
        <div
          className={`${styles.imgBottomLeft} ${styles.imgReveal} ${styles.imgRevealDelay}`}
          style={{ backgroundImage: "url(/es1.jpg)" }}
        />

        {/* bottom-right description + button — fades up after the images */}
        <div className={`${styles.copy} ${styles.copyReveal}`}>
          <p className={styles.desc}>
            Elite Interiors is a home interior design company focused on
            creating elegant, practical, and personalized spaces for modern
            homes. As experienced interior designers in Bangalore, we combine
            creative design, smart planning, premium materials, and attention to
            detail.
          </p>
          <p className={styles.desc}>
            We design interiors for apartments, villas, compact homes, luxury
            residences, and renovation projects, every space planned to balance
            style, comfort, storage, budget, and long-term usability.
          </p>
          <Link href="/services" className={styles.workBtn}>
            <span className={styles.workIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18">
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
            <span className={styles.workText}>
              VIEW OUR
              <br />
              LATEST WORK
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
