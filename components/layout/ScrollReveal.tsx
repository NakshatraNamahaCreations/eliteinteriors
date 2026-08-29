"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds the `is-visible` class to any `.reveal` element as it scrolls into view.
 * Mounted once in the root layout; re-scans on every route change so pages
 * reached by client-side navigation reveal their content too.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.classList.add("is-visible");

    const pending = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
      );

    // No observer support, or the user prefers reduced motion: show everything.
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      pending().forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // threshold 0 → any sliver of the element counts, so sections taller
          // than the viewport still reveal.
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    const observe = () => pending().forEach((el) => observer.observe(el));
    observe();

    // Content mounted after this effect (lazy sections, client-only widgets)
    // still needs picking up.
    const mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });

    // Safety net: never leave content permanently invisible if the observer
    // fails to fire for any reason.
    const failsafe = window.setTimeout(() => pending().forEach(reveal), 2500);

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname]);

  return null;
}
