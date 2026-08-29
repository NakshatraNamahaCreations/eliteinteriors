import Link from "next/link";
import styles from "./BlogSection.module.css";
import { featuredPost, blogPosts, morePosts } from "./blogData";

export default function BlogSection({
  showMore = false,
  withHeader = true,
}: {
  /* show the extra 4-up grid of posts (used on the /blog page) */
  showMore?: boolean;
  /* show the badge + heading row (hide it when the page already has a header) */
  withHeader?: boolean;
}) {
  return (
    <section className={`section ${styles.blogSection}`} id="blog">
      <div className="container">
        {withHeader && (
          <div className={`${styles.blogHead} reveal`}>
            <h2 className={styles.blogTitle}>
              Meet The <span className={styles.gold}>Experts Our</span>
              <br />
              <span className={styles.gold}>Interior</span> Designers
            </h2>
          </div>
        )}

        {/* featured (left) + list (right) */}
        <div className={styles.blogGrid}>
          <Link href={featuredPost.href} className={`${styles.featured} reveal`}>
            <div
              className={styles.featuredImg}
              style={{ backgroundImage: `url(${featuredPost.image})` }}
            >
              <span className={styles.featuredTag}>{featuredPost.tag}</span>
            </div>
            <div className={styles.featuredBody}>
              <p className={styles.postMeta}>
                {featuredPost.date} · By{" "}
                <span className={styles.author}>{featuredPost.author}</span>
              </p>
              <h3 className={styles.featuredTitle}>{featuredPost.title}</h3>
              <p className={styles.postExcerpt}>{featuredPost.excerpt}</p>
            </div>
          </Link>

          <div className={styles.postList}>
            {blogPosts.map((p) => (
              <Link
                href={p.href}
                key={p.title}
                className={`${styles.postRow} reveal`}
              >
                <div
                  className={styles.postThumb}
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <span className={styles.postTag}>{p.tag}</span>
                </div>
                <div className={styles.postInfo}>
                  <p className={styles.postMeta}>
                    {p.date} · By{" "}
                    <span className={styles.author}>{p.author}</span>
                  </p>
                  <h3 className={styles.postTitle}>{p.title}</h3>
                  <p className={styles.postExcerpt}>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* extra posts grid (only on /blog) */}
        {showMore && (
          <div className={styles.moreGrid}>
            {morePosts.map((p) => (
              <Link
                href={p.href}
                key={p.title}
                className={`${styles.gridCard} reveal`}
              >
                <div
                  className={styles.gridImg}
                  style={{ backgroundImage: `url(${p.image})` }}
                >
                  <span className={styles.postTag}>{p.tag}</span>
                </div>
                <div className={styles.gridBody}>
                  <p className={styles.postMeta}>
                    {p.date} · By{" "}
                    <span className={styles.author}>{p.author}</span>
                  </p>
                  <h3 className={styles.gridTitle}>{p.title}</h3>
                  <p className={styles.postExcerpt}>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
