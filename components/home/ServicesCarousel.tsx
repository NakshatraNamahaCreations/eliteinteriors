"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";

type Service = {
  title: string;
  desc: string;
  grad: string;
  image?: string;
};

export default function ServicesCarousel({
  services,
}: {
  services: Service[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* enable/disable arrows based on scroll position */
  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
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

  /* scroll by roughly one card (card width + gap) */
  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 22;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <>
      {/* arrows live in the top-right, above the row (FNJI) */}
      <div className={styles.serviceNav}>
        <button
          type="button"
          className={styles.serviceArrow}
          onClick={() => scrollByCards(-1)}
          disabled={atStart}
          aria-label="Previous services"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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
          className={styles.serviceArrow}
          onClick={() => scrollByCards(1)}
          disabled={atEnd}
          aria-label="Next services"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
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

      <div className={styles.serviceRow} ref={trackRef}>
        {services.map((s) => (
          <article key={s.title} className={styles.serviceCard} data-card>
            <div
              className={`${styles.serviceImg} ${s.image ? "" : styles[s.grad]}`}
              style={
                s.image ? { backgroundImage: `url(${s.image})` } : undefined
              }
            >
              {/* overlay shown on hover, description sits ON the image (FNJI) */}
              <div className={styles.serviceOverlay}>
                <p className={styles.serviceDesc}>{s.desc}</p>
                <Link href="/services" className={styles.serviceExplore}>
                  Explore Service
                </Link>
              </div>
            </div>
            <h3 className={styles.serviceName}>{s.title}</h3>
          </article>
        ))}
      </div>
    </>
  );
}
