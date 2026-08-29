# Elite Interiors — Next.js

A bespoke interior design studio website, built with **Next.js (App Router)** and **TypeScript**.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- CSS Modules + a global design system (`app/globals.css`)
- `next/font` (Poppins) — no external font requests at runtime

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the dev server              |
| `npm run build` | Production build                  |
| `npm run start` | Run the production build          |
| `npm run lint`  | Lint with `next lint`             |

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata, Navbar/Footer
  page.tsx            Homepage (hero, services, projects, process, testimonials, CTA)
  page.module.css     Homepage styles
  about/page.tsx      About page
  services/page.tsx   Services page
  contact/page.tsx    Contact page
  subpage.module.css  Shared styles for inner pages
  globals.css         Design tokens + shared utilities
  icon.svg            Favicon
components/
  Navbar.tsx          Sticky nav with mobile menu
  Footer.tsx          Site footer
  ContactForm.tsx     Interactive contact form (demo submit)
  ScrollReveal.tsx    Scroll-into-view animations
```

## Notes

- **Images:** Section visuals currently use elegant CSS gradient placeholders so the
  site runs with zero asset dependencies. Swap them for real photography by placing
  images in `public/` and using `next/image` where the gradient `div`s / classes are.
- **Contact form:** The form is a front-end demo (simulated submit). Wire it to an
  API route (`app/api/contact/route.ts`) or an email service (Resend, Formspree, etc.)
  to actually send messages.
- **Colors / fonts:** All design tokens live in `:root` in `app/globals.css`.
```
