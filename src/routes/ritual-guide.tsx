import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ritual-guide")({
  head: () => ({
    meta: [
      { title: "Garment Care & Longevity Ritual — Threads of Eden" },
      {
        name: "description",
        content:
          "How to care for 280 GSM heavyweight cotton and mercerized piqué polos to preserve color and architectural drape.",
      },
    ],
  }),
  component: RitualGuidePage,
});

const STEPS = [
  {
    step: "01",
    name: "Cold Wash Inside-Out",
    desc: "Turn your polos and tees inside-out before laundering. Use cold water (maximum 30°C) with mild liquid detergent. This prevents friction against outer fibers and protects collar structure.",
  },
  {
    step: "02",
    name: "Gentle Spin & Reshape",
    desc: "Use a gentle spin cycle (800 RPM or lower). When damp, give the collar and side seams a gentle hand pull into their original alignment to set the tailored drape.",
  },
  {
    step: "03",
    name: "Air Dry Flat in Shade",
    desc: "Never tumble dry heavyweight cotton. Lay flat across a drying rack or hang from the hem in a shaded, well-ventilated space to protect organic fibers from direct solar bleaching.",
  },
  {
    step: "04",
    name: "Steam or Cool Iron",
    desc: "A garment steamer is the optimal way to lift creases from 280 GSM cotton without flattening the piqué texture. If ironing, use low-to-medium heat with steam on the reverse side.",
  },
];

function RitualGuidePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="bg-secondary py-20 md:py-32 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4 text-[#2C5D2E]">Longevity Guide</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            The Garment<br />
            <span className="italic text-[#2C5D2E]">care ritual.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            True luxury garments are not disposable. By observing a few considered laundry habits,
            your Threads of Eden tees and polos will age gracefully, becoming softer with every wear.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="space-y-0">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="grid grid-cols-1 gap-4 border-t border-black/10 py-10 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-sm text-[#2C5D2E] md:col-span-2">{s.step}</span>
                <h3 className="font-display text-2xl md:col-span-4 md:text-3xl">{s.name}</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground md:col-span-6">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/shop" className="btn-luxe">
              Explore The Wardrobe
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
