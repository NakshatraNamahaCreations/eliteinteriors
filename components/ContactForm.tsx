"use client";

import { useState, type FormEvent } from "react";
import styles from "./ContactForm.module.css";
import { formToPayload, submitEnquiry } from "./submitEnquiry";

type Status = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);
    try {
      await submitEnquiry(formToPayload(form, "Contact page"));
      setStatus("success");
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successMark}>✓</span>
        <h3>Thank you!</h3>
        <p>
          Your message is on its way. We&rsquo;ll get back to you within two
          business days.
        </p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span>Name</span>
          <input type="text" name="name" required placeholder="Jane Doe" />
        </label>
        <label className={styles.field}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="jane@email.com"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Phone (optional)</span>
          <input type="tel" name="phone" placeholder="+91 00000 00000" />
        </label>
        <label className={styles.field}>
          <span>Project type</span>
          <select name="project" defaultValue="">
            <option value="" disabled>
              Select one
            </option>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>Styling &amp; Staging</option>
          </select>
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span>Type of Room</span>
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
          <span>Type of House</span>
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

      <label className={styles.field}>
        <span>Tell us about your project</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="What space are you working on, and what are you hoping to achieve?"
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
        className="btn btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
