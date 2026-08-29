import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = 2026;

  return (
    <>
      {/* ---------- PRE-FOOTER CTA BAND ---------- */}
      <section className={styles.ctaBand} aria-label="Get in touch">
        <div className={`container ${styles.ctaInner}`}>
          <p className={styles.ctaDesc}>
            Crafted from natural materials for quiet, meaningful, and balanced
            modern living spaces.
          </p>
          <div className={styles.ctaMain}>
            <h2 className={styles.ctaTitle}>
              Create a Calm and
              <span className={styles.ctaTitleLine}>Balanced Living Space</span>
            </h2>
            <Link href="/contact" className={styles.ctaBtn}>
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.top}>
            <div className={styles.brandCol}>
              <Link href="/" className={styles.brand}>
                <Image
                  src="/logo.png"
                  alt="Elite Interiors"
                  width={987}
                  height={630}
                  className={styles.logo}
                />
              </Link>
              <p className={styles.blurb}>
                A bespoke interior design studio crafting timeless, livable
                spaces for homes, workplaces, and hospitality.
              </p>
              <div className={styles.social}>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className={styles.socialBtn}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Pinterest"
                  className={styles.socialBtn}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M12 2a10 10 0 00-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2-1.4-3.6-3.9-3.6a4.4 4.4 0 00-4.6 4.4c0 .9.3 1.5.7 2 .2.2.2.3.1.5l-.2.9c-.1.3-.3.4-.6.2-1.2-.5-1.7-1.9-1.7-3.4 0-2.6 2.2-5.6 6.4-5.6 3.4 0 5.6 2.4 5.6 5 0 3.5-1.9 6.1-4.8 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.4c-.2.8-.7 1.6-1 2.2A10 10 0 1012 2z" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className={styles.socialBtn}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path d="M4.98 3.5a2 2 0 11-.02 4 2 2 0 01.02-4zM3 8.98h4V21H3zM9 8.98h3.8v1.64h.05c.53-1 1.83-2.05 3.76-2.05 4 0 4.74 2.64 4.74 6.07V21h-4v-5.36c0-1.28-.02-2.92-1.78-2.92-1.78 0-2.05 1.39-2.05 2.83V21H9z" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/919980243345"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className={styles.socialBtn}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                    <path
                      d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.18 8.18 0 01-2.4-1.49 9 9 0 01-1.66-2.07c-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35M12.04 21.5h-.01a9.4 9.4 0 01-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.42 9.42 0 1117.46-4.99 9.42 9.42 0 01-9.49 9.4M20.07 3.97A11.33 11.33 0 0012.04.65C5.8.65.72 5.72.72 11.96c0 1.99.52 3.94 1.51 5.66L.62 22.4l4.9-1.28a11.32 11.32 0 005.51 1.43h.01c6.24 0 11.32-5.08 11.32-11.32 0-3.02-1.18-5.87-3.29-8.26"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Explore</h4>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
              <Link href="/blog">Blog</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Services</h4>
              <Link href="/services">Residential</Link>
              <Link href="/services">Modular Kitchen</Link>
              <Link href="/services">Living Room</Link>
              <Link href="/services">Turnkey Solutions</Link>
            </div>

            <div className={styles.col}>
              <h4 className={styles.colTitle}>Get in touch</h4>
              <a href="mailto:eliteinterioz@gmail.com">eliteinterioz@gmail.com</a>
              <a href="tel:+919980243345">+91 99802 43345</a>
              <span>No. 45, 2nd Cross, RT Nagar</span>
              <span>Bangalore 560032</span>
            </div>
          </div>

          <div className={styles.bottom}>
            <p>© {year} Elite Interiors. All rights reserved.</p>
            <div className={styles.legal}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
