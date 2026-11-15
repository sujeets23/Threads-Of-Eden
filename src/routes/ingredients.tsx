import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Fabrics & Fiber Craftsmanship — Threads of Eden" },
      {
        name: "description",
        content:
          "Discover the single-origin cotton harvests, mercerized piqué knits, and artisanal hardware behind every Threads of Eden garment.",
      },
    ],
  }),
  component: IngredientsPage,
});

const FABRICS = [
  {
    name: "Peruvian Pima Cotton",
    latin: "Gossypium barbadense",
    origin: "Piura Valley, Peru",
    benefit:
      "Grown in northern coastal valleys where constant sunshine and fertile soil yield fibers over 35mm long. Resulting yarns have unmatched silky luster, softness, and exceptional tensile durability.",
    icon: "🌱",
  },
  {
    name: "240 GSM Mercerized Piqué",
    latin: "Double-singed knit",
    origin: "Biella, Italy & Coimbatore, India",
    benefit:
      "A tight honeycomb piqué structure treated with a sodium bath that swells the fibers, locking in pigment and removing surface fuzz. Yields a structured collar that never curls or bacons.",
    icon: "🧶",
  },
  {
    name: "California Supima®",
    latin: "Extra-long staple",
    origin: "San Joaquin Valley, California",
    benefit:
      "Licensed extra-long staple organic cotton representing less than 1% of world crops. Inherently pill-resistant and noticeably cooler to the touch than standard upland cotton.",
    icon: "✨",
  },
  {
    name: "280 GSM Heavyweight Interlock",
    latin: "Zero-twist combed yarn",
    origin: "Osaka & Tirupur",
    benefit:
      "A dual-face knitted construction with equal weight and smoothness on both outer and inner sides. Creates a clean architectural drape that holds its boxy structure throughout the day.",
    icon: "🛡️",
  },
  {
    name: "Australian Mother of Pearl",
    latin: "Pinctada maxima",
    origin: "Broome, Western Australia",
    benefit:
      "Naturally iridescent ocean shell buttons, individually laser-etched and hand-polished. Far more durable, temperature-neutral, and luxurious than plastic or resin imitations.",
    icon: "🐚",
  },
  {
    name: "French Flax Linen",
    latin: "Linum usitatissimum",
    origin: "Normandy, France",
    benefit:
      "Sourced from the damp maritime climates of northern France. Provides superior air permeability, natural antimicrobial coolness, and softens beautifully with each laundering.",
    icon: "🌾",
  },
];

function IngredientsPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Editorial Hero */}
      <section className="bg-secondary py-20 md:py-32 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4 text-[#2C5D2E]">Single-Origin Materials</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            The Living Fiber —<br />
            <span className="italic text-[#2C5D2E]">pure, traceable cotton.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            A garment can only ever be as noble as the fiber from which it is spun.
            We source exclusively from certified organic farmers and historic textile mills.
          </p>
        </div>
      </section>

      {/* Fabric Cards Grid */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {FABRICS.map((fab) => (
              <div
                key={fab.name}
                className="group flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{fab.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2C5D2E]">
                      {fab.origin}
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-2xl font-medium">{fab.name}</h2>
                  <p className="mt-1 text-xs italic text-muted-foreground">{fab.latin}</p>
                  <p className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground">
                    {fab.benefit}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono">100% Traceable</span>
                  <Link to="/shop" className="font-semibold text-[#2C5D2E] hover:underline">
                    View Styles →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Sourcing Pledge */}
          <div className="mt-20 rounded-2xl bg-[#1a2e1b] p-8 md:p-14 text-white">
            <div className="max-w-2xl">
              <p className="eyebrow text-[#CFF57C] mb-4">Our Fiber Pledge</p>
              <h3 className="font-display text-3xl md:text-5xl">Zero Synthetic Compromise.</h3>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-white/70">
                You will never find virgin polyester, acrylic, or microplastics in our core t-shirts and polos.
                Every drop of dye is Oeko-Tex certified non-toxic, and all water used in our mercerization
                treatment is recycled through closed-loop filtration systems.
              </p>
              <div className="mt-8">
                <Link to="/shop" className="btn-luxe-inverse">
                  Explore The Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
