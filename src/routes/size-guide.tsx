import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — Arovia Essentials" },
      { name: "description", content: "Product sizes, volumes, and usage estimates for Arovia Essentials skincare." },
    ],
  }),
  component: SizeGuidePage,
});

const SIZES = [
  { product: "Radiance Renewal Serum", volume: "30ml", usage: "3–4 drops per application", lasts: "~60 days", type: "Dropper bottle" },
  { product: "Essence de Vert Oil", volume: "30ml", usage: "4–5 drops per application", lasts: "~45 days", type: "Recyclable glass bottle" },
  { product: "Velvet Cleansing Balm", volume: "100ml", usage: "Almond-sized amount", lasts: "~90 days", type: "Glass jar" },
  { product: "Hydra Glow Moisturizer", volume: "50ml", usage: "Pearl-sized amount", lasts: "~75 days", type: "Polished glass jar" },
  { product: "Botanical Night Cream", volume: "50ml", usage: "Generous layer", lasts: "~60 days", type: "Glass jar with refill" },
  { product: "Sun Shield SPF 50+", volume: "50ml", usage: "Two finger lengths", lasts: "~30 days", type: "Recyclable tube" },
];

function SizeGuidePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Reference</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Size<br /><span className="italic text-[#2C5D2E]">guide.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Understand our product sizes, recommended usage amounts, and how long each product lasts with daily use.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-5 gap-4 border-b border-black/10 pb-4">
              <p className="eyebrow text-[#2C5D2E]">Product</p>
              <p className="eyebrow text-[#2C5D2E]">Volume</p>
              <p className="eyebrow text-[#2C5D2E]">Per Application</p>
              <p className="eyebrow text-[#2C5D2E]">Lasts Approx.</p>
              <p className="eyebrow text-[#2C5D2E]">Packaging</p>
            </div>
            {SIZES.map((s) => (
              <div key={s.product} className="grid grid-cols-5 gap-4 border-b border-black/5 py-6">
                <p className="font-display text-lg">{s.product}</p>
                <p className="text-sm text-muted-foreground">{s.volume}</p>
                <p className="text-sm text-muted-foreground">{s.usage}</p>
                <p className="text-sm text-muted-foreground">{s.lasts}</p>
                <p className="text-sm text-muted-foreground">{s.type}</p>
              </div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {SIZES.map((s) => (
              <div key={s.product} className="rounded-[1.7rem] border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl">{s.product}</h3>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-[#2C5D2E]">Volume</p><p className="text-sm">{s.volume}</p></div>
                  <div><p className="text-xs text-[#2C5D2E]">Per Use</p><p className="text-sm">{s.usage}</p></div>
                  <div><p className="text-xs text-[#2C5D2E]">Lasts</p><p className="text-sm">{s.lasts}</p></div>
                  <div><p className="text-xs text-[#2C5D2E]">Packaging</p><p className="text-sm">{s.type}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
