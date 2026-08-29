import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/layout/ScrollReveal";
import BackToTop from "@/components/layout/BackToTop";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import PopupForm from "@/components/layout/PopupForm";

/* Poppins for the whole site, both sans and "serif" slots map here */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elite Interiors, Bespoke Interior Design Studio",
    template: "%s | Elite Interiors",
  },
  description:
    "Elite Interiors is a full-service interior design studio crafting timeless, livable spaces for homes, offices, and hospitality projects.",
  keywords: [
    "interior design",
    "interior designer",
    "home renovation",
    "luxury interiors",
    "Elite Interiors",
  ],
  openGraph: {
    title: "Elite Interiors, Bespoke Interior Design Studio",
    description:
      "Timeless, livable interiors designed around how you live. Residential, commercial, and hospitality design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: browser extensions inject attributes onto
    // <html> (e.g. data-qb-installed) before React hydrates, which React
    // otherwise reports as a mismatch. This only covers attributes on this
    // one element — real hydration bugs deeper in the tree still surface.
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body>
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppFloat />
        <PopupForm />
      </body>
    </html>
  );
}
