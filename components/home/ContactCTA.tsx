"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactCTA.module.css";
import { formToPayload, submitEnquiry } from "../submitEnquiry";

const BACKDROP = "/gallery/project-08.jpg";

export default function ContactCTA() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);
    try {
      await submitEnquiry(formToPayload(form, "Home page"));
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  return (
    <section
      className={styles.section}
      style={{ backgroundImage: `url(${BACKDROP})` }}
      id="contact"
      aria-label="Get in touch"
    >
      <div className={styles.scrim} />

      <div className={`container ${styles.inner}`}>
        {/* left: heading + contact info */}
        <div className={`${styles.copy} reveal`}>
          <h2 className={styles.title}>
            Have A <span className={styles.gold}>Project In Mind?</span> Let&rsquo;s
            Make It Happen
          </h2>

          <p className={styles.intro}>
            Whether it&rsquo;s a new home, a single room, or a full renovation,
            we&rsquo;d love to hear about your space. Share a few details and our
            interior designers in Bangalore will get back to you within 24 hours
            with the next steps.
          </p>

          <div className={styles.infoRow}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Address</span>
              <p>No. 45, 2nd Cross, RT Nagar, Bangalore 560032</p>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Support</span>
              <a href="tel:+919980243345">+91 99802 43345</a>
              <a href="mailto:eliteinterioz@gmail.com">
                eliteinterioz@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* right: form */}
        <div className={`${styles.formWrap} reveal`}>
          {status === "success" ? (
            <div className={styles.success} role="status">
              <span className={styles.successMark}>✓</span>
              <h3>Thank you!</h3>
              <p>Your message is on its way, we&rsquo;ll be in touch soon.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.grid}>
                <label className={styles.field}>
                  <span>
                    Full Name <i>*</i>
                  </span>
                  <input type="text" name="name" required placeholder="Designer" />
                </label>
                <label className={styles.field}>
                  <span>
                    Phone <i>*</i>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 00000 00000"
                  />
                </label>
                <label className={styles.field}>
                  <span>
                    Email Address <i>*</i>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="support@example.com"
                  />
                </label>
                <label className={styles.field}>
                  <span>
                    Services <i>*</i>
                  </span>
                  <select name="service" defaultValue="">
                    <option value="" disabled>
                      I want to
                    </option>
                    <option>Residential Interior Design</option>
                    <option>Modular Kitchen Design</option>
                    <option>Living Room Design</option>
                    <option>Bedroom Design</option>
                    <option>Turnkey Solutions</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>
                    Type of Room <i>*</i>
                  </span>
                  <select name="roomType" required defaultValue="">
                    <option value="" disabled>
                      Select a room
                    </option>
                    <option>Living Room</option>
                    <option>Kitchen</option>
                    <option>Bedroom</option>
                    <option>Master Bedroom</option>
                    <option>Kids Room</option>
                    <option>Dining Room</option>
                    <option>Bathroom</option>
                    <option>Pooja Room</option>
                    <option>Home Office</option>
                    <option>Full Home</option>
                  </select>
                </label>
                <label className={styles.field}>
                  <span>
                    Type of House <i>*</i>
                  </span>
                  <select name="houseType" required defaultValue="">
                    <option value="" disabled>
                      Select a house type
                    </option>
                    <option>1 BHK</option>
                    <option>2 BHK</option>
                    <option>3 BHK</option>
                    <option>4 BHK</option>
                    <option>Duplex</option>
                    <option>Villa</option>
                    <option>Independent House</option>
                    <option>Studio Apartment</option>
                  </select>
                </label>
              </div>

              <label className={`${styles.field} ${styles.full}`}>
                <span>
                  Write Message <i>*</i>
                </span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Your message.."
                />
              </label>

              {/* honeypot, hidden from real users */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className={styles.honeypot}
              />

              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={styles.submit}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending…" : "Send Message"}
                <span className={styles.submitIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="16" height="16">
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
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
