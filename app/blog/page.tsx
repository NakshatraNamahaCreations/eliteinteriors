import type { Metadata } from "next";
import BlogSection from "@/components/blog/BlogSection";
import styles from "../subpage.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Interior design tips, trends, and ideas from Elite Interiors, practical advice on furniture, modular kitchens, lighting, and more.",
};

export default function BlogPage() {
  return (
    <>
      <header className={`${styles.pageHeader} ${styles.bannerBlog}`}>
        <div className="container">
          <span className="eyebrow">Journal</span>
          <h1>Ideas, tips & inspiration.</h1>
          <p className="lead">
            Practical advice and design thinking from our studio, on furniture,
            kitchens, lighting, and creating homes that feel calm and considered.
          </p>
        </div>
      </header>

      {/* the same blog layout as the homepage, plus an extra grid of posts */}
      <BlogSection showMore />
    </>
  );
}
