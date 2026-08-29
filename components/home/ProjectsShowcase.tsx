"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./ProjectsShowcase.module.css";

/* each project drives BOTH the center card and the right image */
const projects = [
  {
    img: "/gallery/project-07.jpg",
    title: "Luxury Apartment Interior",
    desc: "A full-home design with warm wood tones, layered lighting, and a calm, livable layout.",
  },
  {
    img: "/gallery/project-01.jpg",
    title: "Modern Villa Living Room",
    desc: "Clean lines, natural textures, and a feature media wall built for everyday comfort.",
  },
  {
    img: "/gallery/project-14.jpg",
    title: "Elegant Bedroom Suite",
    desc: "A private retreat with custom wardrobes, soft palettes, and considered detailing.",
  },
  {
    img: "/gallery/project-15.jpg",
    title: "Premium Modular Kitchen",
    desc: "A functional, durable kitchen with smart storage and a refined, timeless finish.",
  },
];

export default function ProjectsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  /* scroll-driven: map scroll progress through the tall section to a slide */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const i = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      setIndex(i);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = projects[index];

  return (
    <section ref={sectionRef} className={styles.section} id="projects" aria-label="Projects">
      {/* pinned stage */}
      <div className={styles.sticky}>
        {/* right large image (changes on scroll) */}
        <div className={styles.rightImage}>
          {projects.map((p, i) => (
            <div
              key={i}
              className={`${styles.bgSlide} ${i === index ? styles.bgActive : ""}`}
              style={{ backgroundImage: `url(${p.img})` }}
              aria-hidden={i !== index}
            />
          ))}
        </div>

        {/* left dark panel */}
        <div className={styles.leftPanel} />

        <div className={`container ${styles.inner}`}>
          {/* left copy */}
          <div className={styles.copy}>
            <span className={styles.eyebrow}>INTERIOR DESIGN STUDIO</span>
            <h2 className={styles.title}>
              Interiors That
              <span className={styles.titleScript}>Breathe Quiet</span>
            </h2>
            <div className={styles.actions}>
              <Link href="/contact" className={styles.btnPrimary}>
                Let&rsquo;s Talk
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/services" className={styles.btnGhost}>
                See Works
              </Link>
            </div>
          </div>

          {/* center card (changes on scroll) */}
          <div className={styles.card}>
            <div className={styles.cardImgWrap}>
              {projects.map((p, i) => (
                <div
                  key={i}
                  className={`${styles.cardImg} ${i === index ? styles.cardActive : ""}`}
                  style={{ backgroundImage: `url(${p.img})` }}
                  aria-hidden={i !== index}
                />
              ))}
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.cardTitle}>{active.title}</h3>
              <p className={styles.cardDesc}>{active.desc}</p>
            </div>
            <button
              type="button"
              className={styles.cardArrow}
              onClick={() => {
                const el = sectionRef.current;
                if (el) window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
              }}
              aria-label="Next project"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* progress dots */}
          <div className={styles.dots}>
            {projects.map((_, i) => (
              <span
                key={i}
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              />
            ))}
          </div>

          <span className={styles.scrollHint}>Scroll</span>
        </div>
      </div>
    </section>
  );
}
