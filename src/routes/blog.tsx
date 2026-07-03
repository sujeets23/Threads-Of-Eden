import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Arovia Essentials" },
      { name: "description", content: "Explore botanical wisdom, skincare rituals, and behind-the-scenes stories from Arovia Essentials." },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    title: "The Art of Cold-Pressing: Why Temperature Matters",
    excerpt: "Discover how our cold-press extraction preserves the living enzymes and delicate molecules that heat-based methods destroy.",
    category: "Ingredients",
    date: "June 2026",
    readTime: "5 min read",
  },
  {
    title: "Building a Morning Ritual That Transforms",
    excerpt: "A step-by-step guide to layering your botanical products for maximum absorption and luminosity.",
    category: "Rituals",
    date: "May 2026",
    readTime: "4 min read",
  },
  {
    title: "From Farm to Bottle: Visiting Our Moringa Partners",
    excerpt: "A journey to Tamil Nadu, where our moringa is hand-harvested at dawn by third-generation farming families.",
    category: "Origin Stories",
    date: "April 2026",
    readTime: "7 min read",
  },
  {
    title: "Understanding Your Skin Barrier",
    excerpt: "The science behind a healthy skin barrier and how botanical oils support its natural defence mechanisms.",
    category: "Science",
    date: "March 2026",
    readTime: "6 min read",
  },
  {
    title: "Sustainable Packaging: Our Glass Refill Program",
    excerpt: "How our refillable vessel program reduces waste by 73% compared to single-use packaging.",
    category: "Sustainability",
    date: "February 2026",
    readTime: "3 min read",
  },
  {
    title: "The Damask Rose Harvest in Grasse",
    excerpt: "Each May, 10,000 petals are hand-picked at dawn in the perfume capital of the world for our rose formulations.",
    category: "Origin Stories",
    date: "January 2026",
    readTime: "5 min read",
  },
];

function BlogPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">The Journal</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Stories, rituals &<br /><span className="italic text-[#2C5D2E]">botanical wisdom.</span>
          </h1>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {POSTS.map((post) => (
              <article key={post.title} className="group rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#2C5D2E]/10 px-3 py-1 text-xs font-medium text-[#2C5D2E]">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h2 className="mt-6 font-display text-2xl leading-tight group-hover:text-[#2C5D2E] transition-colors">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="eyebrow text-[#2C5D2E] opacity-0 transition-opacity group-hover:opacity-100">Read →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
