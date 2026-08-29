export type BlogPost = {
  tag: string;
  image: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  href: string;
};

export const featuredPost: BlogPost = {
  tag: "Tips & Trick",
  image: "/blog-extra-space.jpg",
  date: "Dec 25, 2025",
  author: "Admin",
  title: "Four Ways for Creating Extra Space in Small Homes",
  excerpt:
    "Smart layouts, multi-use furniture, and the right lighting can make even compact homes feel open and effortless. Here are four ideas our designers use to add breathing room without adding square footage.",
  href: "/blog/creating-extra-space",
};

export const blogPosts: BlogPost[] = [
  {
    tag: "Interiors",
    image: "/gallery/project-07.jpg",
    date: "Dec 25, 2025",
    author: "Admin",
    title: "How to Choose the Right Furniture for Your Home",
    excerpt:
      "Modest, recently established interior practice that helps you choose pieces balancing comfort, scale, and style, for a home that feels considered.",
    href: "/blog/choosing-furniture",
  },
  {
    tag: "Kitchen",
    image: "/gallery/project-03.jpg",
    date: "Dec 22, 2025",
    author: "Admin",
    title: "Modular Kitchen Trends Worth Knowing in 2026",
    excerpt:
      "From handle-less cabinets to warm wood tones and smart storage, here are the modular kitchen ideas shaping modern Bangalore homes.",
    href: "/blog/kitchen-trends",
  },
  {
    tag: "Lighting",
    image: "/gallery/project-09.jpg",
    date: "Dec 18, 2025",
    author: "Admin",
    title: "Layered Lighting: The Secret to a Warm Interior",
    excerpt:
      "Ambient, task, and accent lighting work together to set the mood of a room. Learn how to layer light for calm, inviting spaces.",
    href: "/blog/layered-lighting",
  },
];

/* extra posts shown only on the dedicated /blog page (grid below the feature) */
export const morePosts: BlogPost[] = [
  {
    tag: "Bedroom",
    image: "/gallery/project-18.jpg",
    date: "Dec 14, 2025",
    author: "Admin",
    title: "Designing a Bedroom That Feels Calm and Private",
    excerpt:
      "Soft palettes, smart wardrobes, and considered lighting turn a bedroom into a true retreat. Here's how we approach it.",
    href: "/blog/calm-bedroom",
  },
  {
    tag: "Pooja Room",
    image: "/gallery/project-06.jpg",
    date: "Dec 10, 2025",
    author: "Admin",
    title: "Modern Pooja Room Ideas for Compact Homes",
    excerpt:
      "From wall-mounted units to dedicated corners, thoughtful detailing brings warmth and serenity to any home.",
    href: "/blog/pooja-room-ideas",
  },
  {
    tag: "Ceiling",
    image: "/gallery/project-08.jpg",
    date: "Dec 04, 2025",
    author: "Admin",
    title: "False Ceilings That Transform a Room's Mood",
    excerpt:
      "Cove lighting, gypsum patterns, and clever profiles can completely change how a space feels, without major renovation.",
    href: "/blog/false-ceiling-ideas",
  },
  {
    tag: "Living Room",
    image: "/gallery/project-02.jpg",
    date: "Nov 28, 2025",
    author: "Admin",
    title: "Living Room Layouts That Welcome Guests",
    excerpt:
      "Seating flow, focal points, and balance, the small choices that make a living room feel open and inviting.",
    href: "/blog/living-room-layouts",
  },
];
