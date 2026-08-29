"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  /* white-over-hero on the homepage (dark slider banner), at the very top, menu closed */
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll + close on Esc while the overlay menu is open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
        overHero ? styles.overHero : ""
      }`}
    >
      <div className={`container ${styles.inner}`}>
        {/* on the homepage hero the logo lives in the banner's dark column,
            so hide the navbar logo until the user scrolls past the hero */}
        <Link
          href="/"
          className={`${styles.brand} ${overHero ? styles.brandHidden : ""}`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Elite Interiors"
            width={987}
            height={630}
            className={styles.logo}
            priority
          />
        </Link>

        <nav className={`${styles.nav} ${open ? styles.navOpen : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.link}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {/* CTA inside the dropdown on mobile */}
          <Link
            href="/contact"
            className={`btn btn-primary ${styles.cta} ${styles.ctaMobile}`}
            onClick={() => setOpen(false)}
          >
            Book a Consult
          </Link>
        </nav>

        {/* CTA shown on the right on desktop */}
        <Link
          href="/contact"
          className={`btn btn-primary ${styles.cta} ${styles.ctaDesktop}`}
          onClick={() => setOpen(false)}
        >
          Book a Consult
        </Link>

        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles.barTop : ""} />
          <span className={open ? styles.barMid : ""} />
          <span className={open ? styles.barBot : ""} />
        </button>
      </div>
    </header>
  );
}
