import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients — Arovia Essentials" },
      { name: "description", content: "Discover the rare, cold-pressed botanicals and single-origin ingredients behind every Arovia Essentials formula." },
    ],
  }),
  component: IngredientsPage,
});

const INGREDIENTS = [
  {
    name: "Aloe Vera",
    latin: "Aloe barbadensis",
    origin: "Rajasthan, India",
    benefit: "Deep hydration and cell renewal. Our organic aloe is hand-harvested and cold-pressed within 24 hours to preserve maximum potency.",
    icon: "🌿",
  },
  {
    name: "Moringa",
    latin: "Moringa oleifera",
    origin: "Tamil Nadu, India",
    benefit: "Rich in antioxidants and vitamins A, C, E. Purifies and clarifies the skin while providing essential nourishment.",
    icon: "🍃",
  },
  {
    name: "Turmeric",
    latin: "Curcuma longa",
    origin: "Kerala, India",
    benefit: "Natural anti-inflammatory that illuminates and evens skin tone. Wild-harvested from high-altitude farms for superior curcumin content.",
    icon: "✨",
  },
  {
    name: "Damask Rose",
    latin: "Rosa damascena",
    origin: "Grasse, France",
    benefit: "Deeply soothing and restorative. Each batch uses petals hand-picked at dawn when their essential oil content is highest.",
    icon: "🌹",
  },
  {
    name: "Jojoba Oil",
    latin: "Simmondsia chinensis",
    origin: "Sonoran Desert, USA",
    benefit: "Mirrors the skin's natural sebum for effortless absorption. Balances oil production without clogging pores.",
    icon: "💧",
  },
  {
    name: "Sea Buckthorn",
    latin: "Hippophae rhamnoides",
    origin: "Ladakh, India",
    benefit: "One of nature's richest sources of Omega-7. Promotes skin elasticity and delivers a luminous, healthy glow.",
    icon: "🫐",
  },
  {
    name: "Camellia Seed Oil",
    latin: "Camellia oleifera",
    origin: "Kyoto, Japan",
    benefit: "A centuries-old Japanese beauty secret. Lightweight oil rich in oleic acid that deeply nourishes without heaviness.",
    icon: "🌸",
  },
  {
    name: "Green Tea Extract",
    latin: "Camellia sinensis",
    origin: "Uji, Japan",
    benefit: "Packed with EGCG polyphenols that protect against environmental damage and reduce inflammation.",
    icon: "🍵",
  },
];

const PRINCIPLES = [
  { title: "Single-Origin Sourcing", desc: "Every ingredient is traceable to a single farm, harvest, and season." },
  { title: "Cold-Pressed Within 72 Hours", desc: "Ingredients arrive at your skin as they left the field — alive and intact." },
  { title: "No Synthetics, Ever", desc: "Zero parabens, sulfates, phthalates, or artificial fragrances in any formulation." },
  { title: "Certified Organic", desc: "All key botanicals are certified organic or wild-harvested sustainably." },
];

function IngredientsPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E] transition-colors hover:text-[#2C5D2E]/70">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4">The Living Formula</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Every drop, a quiet
            <br />
            <span className="italic text-[#2C5D2E]">biography of the earth.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            We believe the best skincare begins with the best ingredients. Sourced from single-origin harvests
            across three continents, each botanical is selected for its integrity, potency, and story.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-6">Our Sourcing Principles</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients Grid */}
      <section className="bg-[#1a2e1b] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4" style={{ color: "#CFF57C" }}>Key Botanicals</p>
          <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">
            Nature's finest,<br /><span className="italic text-[#CFF57C]">carefully chosen.</span>
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {INGREDIENTS.map((ing) => (
              <div key={ing.name} className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#CFF57C]/30">
                <span className="text-3xl">{ing.icon}</span>
                <h3 className="mt-4 font-display text-xl">{ing.name}</h3>
                <p className="mt-1 text-xs italic text-white/40">{ing.latin}</p>
                <p className="mt-1 text-xs text-[#CFF57C]/70">{ing.origin}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{ing.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#2C5D2E] py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <p className="eyebrow mb-6 text-[#CFF57C]">Experience the difference</p>
          <h2 className="font-display text-4xl md:text-5xl">Ready to begin your botanical ritual?</h2>
          <div className="mt-10">
            <Link to="/shop" className="btn-luxe-inverse">Shop Now →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
