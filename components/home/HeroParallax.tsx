"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./HeroParallax.module.css";

/* torn-mask middle image (start) → clean full-width banner (end) */
const TORN_IMG = "/bs4.png"; // torn-edge transparent PNG
const FULL_IMG = "/bs2.png"; // wide full-width banner

/* falling text — letters drop in one by one; words stay whole.
   The space lives BETWEEN the word spans (outside the nowrap inline-block),
   otherwise it collapses and the words run together. */
function FallingText({ text, start = 0, step = 0.05 }: { text: string; start?: number; step?: number }) {
  const words = text.split(" ");
  let i = 0;
  return (
    <>
      {words.map((word, w) => (
        <span key={w}>
          <span className={styles.fallWord}>
            {word.split("").map((ch) => {
              const delay = start + i * step;
              i += 1;
              return (
                <span key={i} className={styles.fall} style={{ animationDelay: `${delay}s` }}>
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

export default function HeroParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const targetRef = useRef(0);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      targetRef.current =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* smooth (lerp) for buttery continuous parallax */
  useEffect(() => {
    let raf = 0;
    let current = 0;
    const tick = () => {
      current += (targetRef.current - current) * 0.08;
      if (Math.abs(targetRef.current - current) < 0.0004) current = targetRef.current;
      setP(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---- derived animation values ---- */
  // the torn image scales up; the clean full banner fades in behind it
  const tornScale = 1 + p * 1.6; // torn mask grows toward full width
  const tornOpacity = Math.max(0, 1 - Math.max(0, (p - 0.45) / 0.3)); // torn fades out
  const fullOpacity = Math.min(1, Math.max(0, (p - 0.35) / 0.4)); // full banner fades in
  const imgY = (1 - p) * -18; // gentle parallax drift on the photo
  // first heading (above) fades up and out as the banner opens
  const introY = -p * 70;
  const introOpacity = Math.max(0, 1 - p * 1.9);
  // overlay content fades in once the banner is mostly open
  const overlayOpacity = Math.min(1, Math.max(0, (p - 0.55) / 0.35));
  const scrimOpacity = Math.min(1, Math.max(0, (p - 0.4) / 0.35));
  const bgY = p * 70;
  const bgOpacity = Math.max(0, 0.85 - p * 1.4);
  const captionOpacity = Math.max(0, 1 - p * 2.4);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Why choose us">
      <Link href="/contact" className={styles.sideTab}>
        Start a Project
      </Link>

      <div className={styles.sticky}>
        {/* pencil-sketch blueprint background (parallax) */}
        <svg
          className={styles.blueprint}
          style={{ transform: `translateY(${bgY}px)`, opacity: bgOpacity }}
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <g fill="none" stroke="rgba(90,80,66,0.18)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="430" y="220" width="580" height="300" />
            <path d="M430 220 L120 70 M1010 220 L1320 70 M430 520 L120 770 M1010 520 L1320 770" />
            <path d="M120 70 H1320 M120 770 H1320" />
            <path d="M500 220 V520 M560 220 V520 M620 220 V520 M680 220 V520 M740 220 V520" />
            <rect x="840" y="250" width="140" height="240" />
            <path d="M840 310 H980 M840 370 H980 M840 430 H980 M910 250 V490" />
            <path d="M1090 200 L1230 150 L1230 540 L1090 560 Z" />
            <path d="M520 560 L820 560 L860 640 L480 640 Z" />
            <path d="M380 690 L1000 690 L1120 760 L300 760 Z" />
            <path d="M700 220 V300" />
            <ellipse cx="700" cy="312" rx="26" ry="12" />
          </g>
        </svg>

        {/* intro heading — above the image, fades out as the banner opens */}
        <h2
          className={styles.heading}
          style={{ transform: `translateY(${introY}px)`, opacity: introOpacity }}
        >
          <FallingText text="Designing the" start={0.1} />
          <br />
          <FallingText text="feeling of a room." start={0.55} />
        </h2>

        {/* full-bleed clean banner (fades in as the mask opens) */}
        <div className={styles.fullBanner} style={{ opacity: fullOpacity }}>
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${FULL_IMG})`, transform: `translateY(${imgY}px) scale(1.06)` }}
          />
          <div className={styles.scrim} style={{ opacity: scrimOpacity }} />

          {/* overlay content — "Why Choose Elite Interiors" */}
          <div className={`container ${styles.overlay}`} style={{ opacity: overlayOpacity }}>
            <span className={styles.eyebrow}>WHY CHOOSE US</span>
            <h2 className={styles.overlayTitle}>Why Choose Elite Interiors</h2>
            <p className={styles.overlayText}>
              With over a decade of crafting homes across Bangalore, we handle
              every stage in-house, design, materials, and execution, so your
              space is delivered with clarity, quality, and care. From the first
              sketch to the final styling, we create interiors that are
              practical, personal, and built to last.
            </p>
            <Link href="/about" className={styles.overlayBtn}>
              More About Us
              <span className={styles.btnIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15">
                  <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* torn-mask image (start), scales up + fades out as the banner opens */}
        <div
          className={styles.tornImg}
          style={{
            backgroundImage: `url(${TORN_IMG})`,
            transform: `scale(${tornScale})`,
            opacity: tornOpacity,
          }}
          aria-hidden="true"
        />

        {/* caption — fades out as it opens */}
        <p className={styles.caption} style={{ opacity: captionOpacity }}>
          We shape light, volume and silence
          <br />
          into spaces you live inside.
        </p>

        <span className={styles.scrollCue} style={{ opacity: captionOpacity }} aria-hidden="true">
          Scroll
        </span>
      </div>
    </section>
  );
}
