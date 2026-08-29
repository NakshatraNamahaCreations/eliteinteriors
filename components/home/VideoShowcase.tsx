"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./VideoShowcase.module.css";

/* Portrait walkthrough clips in /public/video. Shot on a phone, so they are
   9:16 — the rail below is built around that rather than a wide player. */
const videos = [
  { src: "/video/tour-1.mp4", label: "Living room walkthrough" },
  { src: "/video/tour-2.mp4", label: "Modular kitchen walkthrough" },
  { src: "/video/tour-3.mp4", label: "Crockery and storage units" },
  { src: "/video/tour-4.mp4", label: "Full home tour" },
  { src: "/video/tour-5.mp4", label: "Bedroom and wardrobes" },
  { src: "/video/tour-6.mp4", label: "Kids room and detailing" },
];

export default function VideoShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardVideos = useRef<(HTMLVideoElement | null)[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  /* keep the rail arrows in sync with scroll position */
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

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-vcard]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  /* preview on hover — silent, and skipped when reduced motion is preferred */
  const preview = (i: number, play: boolean) => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const v = cardVideos.current[i];
    if (!v) return;
    if (play) {
      void v.play().catch(() => {}); // autoplay can be refused; not an error
    } else {
      v.pause();
      v.currentTime = 0;
    }
  };

  /* lightbox: Esc to close + lock page scroll while it is open */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <section className={styles.section} aria-label="Project walkthrough videos">
      <div className={`container ${styles.inner}`}>
        <div className={`${styles.head} reveal`}>
          <div>
            <span className={styles.eyebrow}>WALKTHROUGHS</span>
            <h2 className={styles.title}>
              Step Inside <span className={styles.gold}>Our Work</span>
            </h2>
            <p className={styles.desc}>
              Short walkthroughs from homes we&rsquo;ve completed across
              Bangalore. Tap any clip to watch it full size, with sound.
            </p>
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(-1)}
              disabled={atStart}
              aria-label="Previous videos"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.arrow}
              onClick={() => scrollByCards(1)}
              disabled={atEnd}
              aria-label="More videos"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.track} ref={trackRef}>
          {videos.map((v, i) => (
            <button
              key={v.src}
              type="button"
              data-vcard
              className={styles.card}
              onClick={() => setOpen(i)}
              onMouseEnter={() => preview(i, true)}
              onMouseLeave={() => preview(i, false)}
              aria-label={`Play ${v.label}`}
            >
              <video
                ref={(el) => {
                  cardVideos.current[i] = el;
                }}
                className={styles.cardVideo}
                src={v.src}
                muted
                loop
                playsInline
                /* metadata only: six clips would be ~11 MB if fully preloaded */
                preload="metadata"
              />
              <span className={styles.cardScrim} aria-hidden="true" />
              <span className={styles.play} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" />
                </svg>
              </span>
              <span className={styles.cardLabel}>{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {open !== null && (
        <div
          className={styles.lightbox}
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={videos[open].label}
        >
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(null)}
            aria-label="Close video"
          >
            ✕
          </button>
          {/* stop clicks on the player itself from closing the lightbox */}
          <div className={styles.player} onClick={(e) => e.stopPropagation()}>
            <video
              className={styles.playerVideo}
              src={videos[open].src}
              controls
              autoPlay
              playsInline
            />
            <p className={styles.playerLabel}>{videos[open].label}</p>
          </div>
        </div>
      )}
    </section>
  );
}
