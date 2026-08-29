import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Elite Interiors. Book a free consultation for your residential, commercial, or hospitality project.",
};

export default function ContactPage() {
  return (
    <>
      <header className={`${styles.pageHeader} ${styles.bannerContact}`}>
        <div className="container">
          <span className="eyebrow">Contact</span>
          <h1>Let&rsquo;s start a conversation.</h1>
          <p className="lead">
            Tell us a little about your space and what you&rsquo;re hoping for.
            We&rsquo;ll be in touch within two business days.
          </p>
        </div>
      </header>

      <section className="section">
        <div className={`container ${styles.contactGrid}`}>
          <div className={`${styles.contactInfo} reveal`}>
            <h2>Studio details</h2>
            <ul className={styles.infoList}>
              <li>
                <span className={styles.infoLabel}>Email</span>
                <a href="mailto:eliteinterioz@gmail.com">
                  eliteinterioz@gmail.com
                </a>
              </li>
              <li>
                <span className={styles.infoLabel}>Phone</span>
                <a href="tel:+919980243345">+91 99802 43345</a>
              </li>
              <li>
                <span className={styles.infoLabel}>Studio</span>
                <span>
                  No. 45, 2nd Cross, RT Nagar
                  <br />
                  Bangalore 560032
                </span>
              </li>
              <li>
                <span className={styles.infoLabel}>Hours</span>
                <span>Mon – Fri, 9am – 6pm</span>
              </li>
            </ul>
          </div>

          <div className={`${styles.contactFormWrap} reveal`}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
