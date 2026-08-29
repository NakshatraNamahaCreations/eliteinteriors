"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./PopupForm.module.css";
import { formToPayload, submitEnquiry } from "../submitEnquiry";

const STORAGE_KEY = "ei_popup_seen";
const SHOW_DELAY_MS = 1500;

export default function PopupForm() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  /* show shortly after load, once per session */
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
  };

  /* close on Esc + lock body scroll while open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    setError(null);
    try {
      await submitEnquiry(formToPayload(form, "Popup — free consultation"));
      setStatus("success");
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={close} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.close}
          onClick={close}
          aria-label="Close"
        >
          ✕
        </button>

        {/* left: image / brand panel */}
        <div
          className={styles.aside}
          style={{ backgroundImage: "url(/gallery/project-10.jpg)" }}
        >
          <div className={styles.asideScrim} />
          <div className={styles.asideInner}>
            <h3 className={styles.asideTitle}>
              Get a Free
              <br />
              Design Consultation
            </h3>
            <p className={styles.asideText}>
              Book now and receive a complimentary 30-minute session with our
              interior designers in Bangalore.
            </p>
          </div>
        </div>

        {/* right: form */}
        <div className={styles.body}>
          {status === "success" ? (
            <div className={styles.success}>
              <span className={styles.successMark}>✓</span>
              <h3>Thank you!</h3>
              <p>We&rsquo;ve received your details and will reach out shortly.</p>
              <button type="button" className={styles.submit} onClick={close}>
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className={styles.title}>Let&rsquo;s design your dream space</h2>
              <p className={styles.subtitle}>
                Share your details and we&rsquo;ll get in touch within 24 hours.
              </p>
              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.field}>
                  <span>Full Name</span>
                  <input type="text" name="name" required placeholder="Your name" />
                </label>
                <label className={styles.field}>
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 00000 00000"
                  />
                </label>
                <label className={styles.field}>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@email.com"
                  />
                </label>
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
                  {status === "submitting" ? "Sending…" : "Book Free Consultation"}
                </button>
                <p className={styles.fine}>No spam, we respect your privacy.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
