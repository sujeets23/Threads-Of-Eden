import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ritual-guide")({
  head: () => ({
    meta: [
      { title: "Ritual Guide — Arovia Essentials" },
      { name: "description", content: "Your complete guide to the Arovia Essentials skincare ritual. Morning and evening routines for radiant skin." },
    ],
  }),
  component: RitualGuidePage,
});

const MORNING = [
  { step: "01", name: "Cleanse", product: "Velvet Cleansing Balm", desc: "Begin with damp skin. Massage a small amount in circular motions for 60 seconds, then rinse with lukewarm water." },
  { step: "02", name: "Treat", product: "Radiance Renewal Serum", desc: "Apply 3–4 drops to face and neck. Pat gently — never rub — to allow actives to absorb." },
  { step: "03", name: "Moisturise", product: "Hydra Glow Moisturizer", desc: "Warm a pearl-sized amount between palms and press into skin. Focus on drier areas." },
  { step: "04", name: "Protect", product: "Sun Shield SPF 50+", desc: "Apply generously as the final step. Wait 2 minutes before makeup application." },
];

const EVENING = [
  { step: "01", name: "Double Cleanse", product: "Velvet Cleansing Balm", desc: "First pass removes makeup and SPF. Second pass cleanses skin. Always gentle, always thorough." },
  { step: "02", name: "Treat", product: "Radiance Renewal Serum", desc: "Evening application allows actives to work overnight during your skin's natural repair cycle." },
  { step: "03", name: "Nourish", product: "Essence de Vert Oil", desc: "Warm 4–5 drops between fingertips and press into skin. Let the botanical oils seal in all previous layers." },
  { step: "04", name: "Restore", product: "Botanical Night Cream", desc: "The final layer. Apply to face and décolletage. Let the retinol and bakuchiol work while you sleep." },
];

function RitualGuidePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Your Guide</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            The Arovia<br /><span className="italic text-[#2C5D2E]">ritual.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Skincare is not a task — it's a ritual. Follow our morning and evening guides for radiant, healthy skin.
          </p>
        </div>
      </section>

      {/* Morning Ritual */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4 text-[#2C5D2E]">☀️ Morning Ritual</p>
          <h2 className="font-display text-4xl md:text-5xl">Start your day with intention.</h2>
          <div className="mt-16 space-y-0">
            {MORNING.map((s) => (
              <div key={s.step} className="grid grid-cols-1 gap-4 border-t border-black/10 py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-mono text-xs text-muted-foreground md:col-span-1">{s.step}</span>
                <h3 className="font-display text-2xl md:col-span-2">{s.name}</h3>
                <p className="text-sm font-medium text-[#2C5D2E] md:col-span-3">{s.product}</p>
                <p className="text-sm leading-7 text-muted-foreground md:col-span-6">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evening Ritual */}
      <section className="bg-[#1a2e1b] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4" style={{ color: "#CFF57C" }}>🌙 Evening Ritual</p>
          <h2 className="font-display text-4xl md:text-5xl">End your day with care.</h2>
          <div className="mt-16 space-y-0">
            {EVENING.map((s) => (
              <div key={s.step} className="grid grid-cols-1 gap-4 border-t border-white/10 py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-mono text-xs text-white/40 md:col-span-1">{s.step}</span>
                <h3 className="font-display text-2xl md:col-span-2">{s.name}</h3>
                <p className="text-sm font-medium text-[#CFF57C] md:col-span-3">{s.product}</p>
                <p className="text-sm leading-7 text-white/60 md:col-span-6">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2C5D2E] py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl md:text-5xl">Ready to begin?</h2>
          <div className="mt-10">
            <Link to="/shop" className="btn-luxe-inverse">Shop the Ritual →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
