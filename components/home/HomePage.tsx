import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import WhyChooseUs from "./WhyChooseUs";
import VisualizeHero from "./VisualizeHero";
import ServicesCarousel from "./ServicesCarousel";
import Gallery from "./Gallery";
import VideoShowcase from "./VideoShowcase";
import ProjectsShowcase from "./ProjectsShowcase";
import Testimonials from "./Testimonials";
import ContactCTA from "./ContactCTA";
import BlogSection from "@/components/blog/BlogSection";
import styles from "./HomePage.module.css";

/* line icons for the process steps */
function ProcessIcon({ name }: { name: string }) {
  const common = {
    width: 30,
    height: 30,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 01-9 8.3 9 9 0 01-3.8-.8L3 20l1.3-4A8.5 8.5 0 1121 11.5z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <path d="M12 3l5 16H7l5-16z" />
          <path d="M12 3v8" />
          <circle cx="12" cy="13.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 3a9 9 0 100 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.8 1.8-1.8H16a5 5 0 005-5c0-3.9-4-7-9-7z" />
          <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="10.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "gears":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="2.4" />
          <path d="M10 4.5v-1M10 16.5v1M4.5 10h-1M16.5 10h1M6.2 6.2l-.7-.7M14.5 14.5l-.7-.7M13.8 6.2l.7-.7M5.5 14.5l.7-.7" />
          <circle cx="17" cy="17" r="1.6" />
        </svg>
      );
    case "bulb":
      return (
        <svg {...common}>
          <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6V16h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" />
        </svg>
      );
    default:
      return null;
  }
}


const services = [
  {
    title: "Residential Interior Design",
    desc: "Complete home interiors for apartments, villas, and independent houses, layout planning, color themes, furniture, lighting, wall finishes, décor, and full execution. Every room feels connected, comfortable, and balanced.",
    grad: "s1",
    image: "/sv1.png",
  },
  {
    title: "Modular Kitchen Design",
    desc: "Stylish, durable, easy-to-use modular kitchens, cabinets, countertops, drawers, tall units, corner storage, breakfast counters, lighting, and appliance planning, in modern, classic, minimal, or luxury styles.",
    grad: "s2",
    image: "/sv2.png",
  },
  {
    title: "Living Room Interior Design",
    desc: "Elegant TV units, wall panels, false ceilings, lighting, seating layouts, display units, and décor, a welcoming space where family relaxes and guests feel impressed.",
    grad: "s3",
    image: "/sv3.png",
  },
  {
    title: "Bedroom Interior Design",
    desc: "Calm, private, comfortable bedrooms with wardrobes, bed back panels, dressing units, side tables, study corners, lighting, curtains, and color themes, peaceful, with smart storage and premium styling.",
    grad: "s4",
    image: "/sv4.png",
  },
  {
    title: "Wardrobe Design",
    desc: "Customized wardrobes that match your storage needs and room layout, sliding, hinged, and walk-in wardrobes, loft storage, mirrors, drawers, and accessories for a more organized, elegant room.",
    grad: "s5",
    image: "/sv5.png",
  },
  {
    title: "False Ceiling Design",
    desc: "Gypsum and POP ceiling concepts, cove and profile lighting, panel ceilings, and modern patterns that improve both the look and the lighting effect of your interiors.",
    grad: "s6",
    image: "/sv6.png",
  },
  {
    title: "Pooja Room Design",
    desc: "Traditional and modern pooja room designs for homes of all sizes, from compact wall-mounted units to dedicated rooms, with elegant materials, lighting, storage, and spiritual detailing.",
    grad: "s1",
    image: "/sv7.png",
  },
  {
    title: "Turnkey Interior Solutions",
    desc: "One team for the complete process, design discussion, 3D concepts, material selection, production, installation, and handover. We make the entire journey easier, faster, and more organized.",
    grad: "s2",
    image: "/sv8.png",
  },
];

const steps = [
  {
    n: "1",
    title: "Consultation",
    desc: "Understanding your space, needs, and lifestyle.",
    icon: "chat",
  },
  {
    n: "2",
    title: "Concept Design",
    desc: "Layouts, mood boards, and design directions.",
    icon: "compass",
  },
  {
    n: "3",
    title: "Material Selection",
    desc: "Choosing high-quality materials, textures, and finishes.",
    icon: "palette",
  },
  {
    n: "4",
    title: "Execution",
    desc: "Professional handling of interiors, modular work, and renovations.",
    icon: "gears",
  },
  {
    n: "5",
    title: "Styling & Handover",
    desc: "Décor, lighting, and final touches.",
    icon: "bulb",
  },
];

const testimonials = [
  {
    quote:
      "I absolutely love my new modern living room! The clean lines, neutral tones, and minimalist interior create such a calming & stylish atmosphere. Highly recommend their modern interior design services!",
    name: "Liam Reynolds",
    role: "Company Owner",
    initials: "LR",
    rating: 5,
  },
  {
    quote:
      "Elite Interiors understood our family in a way no other studio did. Every room feels like us, only better. The attention to detail was exceptional from start to finish.",
    name: "Priya & Daniel R.",
    role: "Hillside Residence",
    initials: "PD",
    rating: 5,
  },
  {
    quote:
      "They reimagined our flagship and footfall rose within a month. Beautiful and commercially sharp, a team that truly understands both design and business.",
    name: "Marcus Lin",
    role: "Meridian Retail Group",
    initials: "ML",
    rating: 5,
  },
  {
    quote:
      "Calm, considered, and on time. The hotel has never photographed better, guests notice the difference immediately. We couldn't be happier with the result.",
    name: "Sofia Albright",
    role: "Aurora Boutique Hotel",
    initials: "SA",
    rating: 5,
  },
  {
    quote:
      "From concept to reality, the team turned my vision into a stunning, livable space. Every corner feels intentional, warm, and effortlessly elegant.",
    name: "Noah Mitchell",
    role: "Company Owner",
    initials: "NM",
    rating: 5,
  },
  {
    quote:
      "Professional, creative, and genuinely a pleasure to work with. Our modular kitchen is now the heart of the home, functional and beautiful in equal measure.",
    name: "Shahin Alam",
    role: "Company Owner",
    initials: "SA",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------- HERO (original FNJI-style slider) ---------- */}
      <HeroSlider />

      {/* ---------- VISUALIZE (about intro, 2nd section) ---------- */}
      <VisualizeHero />

      {/* ---------- SERVICES ---------- */}
      <section className={`section ${styles.servicesSection}`} id="services">
        <div className="container">
          {/* top: left rail (eyebrow + button) · right (heading + intro) */}
          <div className={styles.servicesTop}>
            <div className={`${styles.servicesRail} reveal`}>
              <span className="eyebrow">Our Services</span>
              <Link href="/services" className={styles.railBtn}>
                Explore All Services
              </Link>
            </div>

            <div className={`${styles.servicesHeadCol} reveal`}>
              <h2 className={styles.servicesTitle}>Services</h2>
              <p className={styles.servicesIntro}>
                When people search for interior designers in Bangalore, they
                usually want a team that can handle complete home interiors as
                well as individual spaces. Elite Interiors offers a wide range
                of services to meet different home design needs.
              </p>
            </div>
          </div>

          <div className={styles.servicesDivider} />

          {/* horizontal carousel with arrows */}
          <ServicesCarousel services={services} />
        </div>
      </section>

      {/* ---------- WHY CHOOSE US (after services) ---------- */}
      <WhyChooseUs />

      {/* ---------- PROCESS ---------- */}
      <section className={`section ${styles.processSection}`}>
        <div className="container">
          <div className={`${styles.head} reveal`}>
            <span className="eyebrow">Our process</span>
            <h2>How Our Interior &amp; Renovation Process Works</h2>
          </div>

          <div className={styles.stepRow}>
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={`${styles.step} reveal`}
                style={{ "--d": `${i * 0.15}s` } as React.CSSProperties}
              >
                <div className={styles.stepCircle}>
                  <span className={styles.stepIcon}>
                    <ProcessIcon name={s.icon} />
                  </span>
                  <span className={styles.stepBadge}>{s.n}</span>
                </div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>

                {/* connecting arrow between steps (not after the last) */}
                {i < steps.length - 1 && (
                  <span className={styles.stepArrow} aria-hidden="true">
                    <svg viewBox="0 0 60 24" width="60" height="24" fill="none">
                      <path
                        d="M2 12h50"
                        stroke="var(--accent)"
                        strokeWidth="1.4"
                        strokeDasharray="4 5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M48 6l8 6-8 6"
                        stroke="var(--accent)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- PROJECTS SHOWCASE ---------- */}
      <ProjectsShowcase />

      {/* ---------- TESTIMONIALS ---------- */}
      <Testimonials testimonials={testimonials} />

      {/* ---------- GALLERY ---------- */}
      <Gallery />

      {/* ---------- WALKTHROUGH VIDEOS ---------- */}
      <VideoShowcase />

      {/* ---------- BLOG ---------- */}
      <BlogSection />

      {/* ---------- CONTACT CTA ---------- */}
      <ContactCTA />
    </>
  );
}
