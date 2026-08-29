"use client";

import { useState, type FormEvent } from "react";
import styles from "./HeroForm.module.css";
import { formToPayload, submitEnquiry } from "./submitEnquiry";

/**
 * Compact enquiry card that sits on the right of the hero banner.
 * Deliberately short — name, phone, email and room type only — since a
 * banner form competes with the slider for attention. Everything else is
 * collected by the full form on /contact.
 */
export default function HeroForm() {
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
      await submitEnquiry(formToPayload(form, "Hero banner"));
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  return (
    <div className={styles.card}>
      {status === "success" ? (
        <div className={styles.success} role="status">
          <span className={styles.successMark}>✓</span>
          <h3>Thank you!</h3>
          <p>We&rsquo;ve got your details and will call you shortly.</p>
        </div>
      ) : (
        <>
          <h2 className={styles.title}>Book a Free Design Consultation</h2>
          <p className={styles.subtitle}>
            Tell us about your space — we&rsquo;ll reply within 24 hours.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
              <span className={styles.srOnly}>Full name</span>
              <input type="text" name="name" required placeholder="Full name" />
            </label>

            <label className={styles.field}>
              <span className={styles.srOnly}>Phone number</span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.srOnly}>Email address</span>
              <input type="email" name="email" placeholder="Email address" />
            </label>

            <label className={styles.field}>
              <span className={styles.srOnly}>Type of house</span>
              <select name="houseType" required defaultValue="">
                <option value="" disabled>
                  Type of house
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
              {status === "submitting" ? "Sending…" : "Get Free Quote"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
