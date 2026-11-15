import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Atelier — Threads of Eden" },
      {
        name: "description",
        content:
          "Discover the architectural garment philosophy and enduring cotton craftsmanship behind Threads of Eden.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-secondary">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=85"
          alt="Threads of Eden Garment Workshop & Tailoring Patterns"
          className="h-full w-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 mx-auto max-w-[1400px] md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#CFF57C]">
            Our Story & Craft
          </p>
          <h1 className="font-display text-4xl leading-tight text-white md:text-6xl mt-2">
            Form, elevated to <br />
            <span className="italic">quiet permanence.</span>
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-6">
            <p className="eyebrow text-[#2C5D2E]">The Atelier Manifesto</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Rejecting the flimsy.<br />
              Honoring the cloth.
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              Threads of Eden was founded with a single objective: to rescue the foundational
              wardrobe piece — the polo and the everyday t-shirt — from the cycles of planned
              obsolescence and synthetic blending.
            </p>
            <p className="text-base leading-8 text-muted-foreground">
              We engineer garments with architectural weight. By employing dense 280 GSM weaves,
              double-mercerized Egyptian piqué, and pre-shrunk organic yarns, our garments hang
              with clean authority and outlast standard basics season after season.
            </p>
            <div className="pt-4">
              <Link to="/shop" className="btn-luxe">
                Explore The Wardrobe
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">
                Pillar 01
              </span>
              <h3 className="font-display text-2xl font-medium">Extra-Long Staple Cotton</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Only the longest 1% of harvested fibers make our yarns, ensuring exceptional
                tear strength and velvety smoothness without synthetic finishes.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">
                Pillar 02
              </span>
              <h3 className="font-display text-2xl font-medium">Engineered Collars</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Our polo collars are built with tailored collar stands and interlining so they
                never roll, crease, or lose their crisp silhouette after laundering.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">
                Pillar 03
              </span>
              <h3 className="font-display text-2xl font-medium">Ocean Shell Hardware</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Authentic Australian mother-of-pearl shell buttons, laser-etched and cross-stitched
                with reinforced buttonholes that will not pull free.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">
                Pillar 04
              </span>
              <h3 className="font-display text-2xl font-medium">Circular Responsibility</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Zero micro-plastics, non-toxic organic botanical dyes, and 100% recyclable
                uncoated paper and cotton drawstring packaging.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
