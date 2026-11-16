import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Threads of Eden Apparel Archive" },
      {
        name: "description",
        content:
          "Essays on textile history, 280 GSM heavyweight cotton, circular knitting, and architectural menswear design.",
      },
    ],
  }),
  component: BlogPage,
});

const POSTS = [
  {
    title: "Understanding GSM: Why 280 GSM is the Golden Ratio for Tees",
    excerpt:
      "A technical breakdown of fabric weight, yarn twist, and why dense interlock weaves eliminate the cling of cheap fast-fashion cotton.",
    category: "Textile Science",
    date: "October 2026",
    readTime: "5 min read",
  },
  {
    title: "The Anatomy of a Crisp Polo Collar: Fused Stands vs. Knitted Rib",
    excerpt:
      "Why most polo collars curl into 'bacon collar' after two washes, and how our tailored interlined collar stand prevents distortion.",
    category: "Craftsmanship",
    date: "September 2026",
    readTime: "4 min read",
  },
  {
    title: "Peruvian Pima vs. California Supima®: A Comparative Study",
    excerpt:
      "An in-depth look at extra-long staple cotton varieties and how soil composition in Piura Valley creates unparalleled silkiness.",
    category: "Fibers",
    date: "August 2026",
    readTime: "6 min read",
  },
  {
    title: "The Return of the Waffle Henley: Heritage Workwear Reimagined",
    excerpt:
      "How mid-century military thermal underwear evolved into one of the most versatile layering pieces in modern menswear.",
    category: "Silhouettes",
    date: "July 2026",
    readTime: "4 min read",
  },
  {
    title: "From Shell to Button: Australian Mother-of-Pearl Craft",
    excerpt:
      "A visit to Broome, where sustainable ocean shell harvesting provides the iridescent buttons hand-stitched onto our piqué polos.",
    date: "June 2026",
    category: "Hardware",
    readTime: "5 min read",
  },
  {
    title: "Zero-Twist Ring-Spun Yarns and Longevity",
    excerpt:
      "Exploring how gentle fiber alignment during spinning yields garments that soften rather than degrade over decades of wear.",
    category: "Production",
    date: "May 2026",
    readTime: "3 min read",
  },
];

function BlogPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="bg-secondary py-20 md:py-32 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#47352F]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4 text-[#47352F]">The Journal</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Essays in Form &<br />
            <span className="italic text-[#47352F]">heavyweight cotton.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Reflections from our atelier on textile engineering, tailoring proportion, and the
            art of building a permanent wardrobe.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post) => (
              <article
                key={post.title}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-semibold uppercase tracking-wider text-[#47352F]">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl leading-snug group-hover:text-[#47352F] transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-black/50">{post.date}</span>
                  <Link to="/shop" className="font-semibold text-[#47352F] hover:underline">
                    Read Essay →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
