import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability — Arovia Essentials" },
      { name: "description", content: "Learn about Arovia Essentials' commitment to sustainable sourcing, circular design, and carbon-conscious operations." },
    ],
  }),
  component: SustainabilityPage,
});

const PILLARS = [
  {
    icon: "♻️",
    title: "Circular Packaging",
    desc: "All vessels are crafted from recycled glass with refillable options. Our packaging uses FSC-certified paper with soy-based inks.",
    stat: "92%",
    statLabel: "Recyclable Materials",
  },
  {
    icon: "🌍",
    title: "Carbon Neutral",
    desc: "We offset 100% of our shipping emissions and partner with reforestation projects across Southeast Asia.",
    stat: "100%",
    statLabel: "Offset Emissions",
  },
  {
    icon: "🌱",
    title: "Ethical Sourcing",
    desc: "Direct trade relationships with farming communities ensure fair wages, sustainable practices, and ingredient traceability.",
    stat: "34",
    statLabel: "Partner Farms",
  },
  {
    icon: "💧",
    title: "Water Conservation",
    desc: "Our formulation process uses 60% less water than industry standard, with closed-loop recycling in our production facilities.",
    stat: "60%",
    statLabel: "Less Water Used",
  },
];

const GOALS = [
  { year: "2024", goal: "Launched with 100% recyclable glass packaging" },
  { year: "2025", goal: "Achieved carbon-neutral shipping worldwide" },
  { year: "2026", goal: "Introduced refillable vessel program" },
  { year: "2027", goal: "Target: Zero-waste production facility" },
  { year: "2028", goal: "Target: 100% renewable energy operations" },
];

function SustainabilityPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E] transition-colors hover:text-[#2C5D2E]/70">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4">Our Commitment</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Beauty that respects
            <br />
            <span className="italic text-[#2C5D2E]">the earth.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Sustainability isn't a feature — it's the foundation of everything we create. From sourcing to shipping,
            every decision is guided by our responsibility to the planet.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-6">Four Pillars</p>
          <h2 className="font-display text-4xl md:text-5xl">How we honour the earth.</h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="group rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="text-3xl">{p.icon}</span>
                <h3 className="mt-4 font-display text-xl">{p.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{p.desc}</p>
                <div className="mt-6 border-t border-black/5 pt-4">
                  <p className="font-display text-3xl text-[#2C5D2E]">{p.stat}</p>
                  <p className="eyebrow mt-1">{p.statLabel}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#1a2e1b] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4" style={{ color: "#CFF57C" }}>Our Journey</p>
          <h2 className="font-display text-4xl md:text-5xl">Sustainability roadmap.</h2>
          <div className="mt-16 space-y-0">
            {GOALS.map((g, i) => (
              <div key={g.year} className="flex gap-8 border-t border-white/10 py-8">
                <span className="font-display text-2xl text-[#CFF57C]">{g.year}</span>
                <div className="flex-1">
                  <p className="text-base text-white/70">{g.goal}</p>
                  {i >= 3 && <span className="mt-2 inline-block rounded-full bg-[#CFF57C]/20 px-3 py-1 text-xs text-[#CFF57C]">In Progress</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
