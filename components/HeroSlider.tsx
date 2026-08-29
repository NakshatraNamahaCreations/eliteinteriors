"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroForm from "./HeroForm";
import styles from "./HeroSlider.module.css";

type Slide = {
  /* short label shown bottom-left, e.g. "Natural Balance" */
  label: string;
  /* big two-line headline (bottom-left) */
  titleTop: string;
  titleBottom: string;
  /* description shown centered in the bottom bar */
  desc: string;
  /* CTA pill text + link */
  ctaText: string;
  ctaHref: string;
  /* background image url; files live in /public */
  image: string;
};

const slides: Slide[] = [
  {
    label: "Natural Balance",
    titleTop: "Natural Furniture",
    titleBottom: "for Modern Living",
    desc: "Elite Interiors creates elegant, comfortable homes with a luxurious personal touch.",
    ctaText: "About Elite",
    ctaHref: "/about",
    image: "/es1.jpg",
  },
  {
    label: "Crafted Comfort",
    titleTop: "Elegant Interiors",
    titleBottom: "for Modern Living",
    desc: "Elite Interiors transforms everyday spaces into elegant homes with thoughtful layouts and premium finishes.",
    ctaText: "View Our Work",
    ctaHref: "/services",
    image: "/es2.jpg",
  },
  {
    label: "Quiet Luxury",
    titleTop: "Bespoke Interiors Delivered",
    titleBottom: "with Care and Precision",
    desc: "Elite Interiors manages every stage with clarity, craftsmanship, and detail, creating beautiful and comfortable homes.",
    ctaText: "Start a Project",
    ctaHref: "/contact",
    image: "/es3.jpg",
  },
];

const AUTOPLAY_MS = 4000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const start = useCallback(() => {
    stop();
    timer.current = setInterval(
      () => setIndex((p) => (p + 1) % slides.length),
      AUTOPLAY_MS
    );
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start]);

  const active = slides[index];

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured work"
      onMouseEnter={stop}
      onMouseLeave={start}
    >
      {/* ---- background layers (cross-fade) ---- */}
      <div className={styles.stage}>
        {slides.map((s, i) => (
          <div
            key={i}
            className={`${styles.slide} ${
              i === index ? styles.slideActive : ""
            }`}
            style={{ backgroundImage: `url(${s.image})` }}
            aria-hidden={i !== index}
          />
        ))}
        <div className={styles.scrim} />
        {/* left vertical dark sidebar strip with logo at top (FNJI) */}
        <div className={styles.sidebar}>
          <Link href="/" className={styles.sidebarLogo} aria-label="Elite Interiors, home">
            <Image
              src="/logo.png"
              alt="Elite Interiors"
              width={987}
              height={630}
              priority
            />
          </Link>
        </div>
        {/* faint decorative curve on the right (FNJI) */}
        <svg
          className={styles.curve}
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="430" cy="300" r="280" stroke="rgba(255,255,255,0.18)" />
          <circle cx="430" cy="300" r="210" stroke="rgba(255,255,255,0.10)" />
          <path
            d="M120 560 C 260 360, 520 360, 700 120"
            stroke="rgba(255,255,255,0.12)"
          />
        </svg>
      </div>

      {/* ---- foreground ---- */}
      <div className={styles.inner}>
        <div className={styles.main}>
          {/* big headline, bottom-left. Keyed by slide so the rise animation
              replays on every change. */}
          <div className={styles.copy} key={index}>
            <h1 className={styles.title}>
              {active.titleTop}
              <span className={styles.titleLine}>{active.titleBottom}</span>
            </h1>
          </div>

          {/* enquiry card, right. Deliberately NOT keyed by index — a key here
              would remount it on every slide and wipe what the user typed. */}
          <div className={styles.formWrap}>
            <HeroForm />
          </div>
        </div>

        {/* thin divider above the bottom bar */}
        <div className={styles.divider} />

        {/* bottom bar: label · description+button · arrows */}
        <div className={styles.bottomBar}>
          <span className={styles.label}>
            <span className={styles.dot} />
            {active.label}
          </span>

          <div className={styles.center}>
            <p className={styles.desc}>{active.desc}</p>
            <Link href={active.ctaHref} className={styles.pill}>
              {active.ctaText}
            </Link>
          </div>

          <div className={styles.nav}>
            <button
              type="button"
              className={styles.arrow}
              onClick={prev}
              aria-label="Previous slide"
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
              className={styles.arrow}
              onClick={next}
              aria-label="Next slide"
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
        </div>
      </div>
    </section>
  );
}
