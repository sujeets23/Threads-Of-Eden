import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Arovia Essentials" },
      { name: "description", content: "Join the Arovia Essentials team. Explore open positions in Dubai and Bangalore." },
    ],
  }),
  component: CareersPage,
});

const POSITIONS = [
  { title: "Senior Formulation Chemist", location: "Bangalore, India", type: "Full-time", dept: "R&D" },
  { title: "Brand Marketing Manager", location: "Dubai, UAE", type: "Full-time", dept: "Marketing" },
  { title: "E-commerce Specialist", location: "Remote", type: "Full-time", dept: "Digital" },
  { title: "Visual Content Creator", location: "Dubai, UAE", type: "Contract", dept: "Creative" },
  { title: "Supply Chain Coordinator", location: "Bangalore, India", type: "Full-time", dept: "Operations" },
];

const VALUES = [
  { icon: "🌿", title: "Purpose-Driven", desc: "Every role contributes to a mission of creating beauty that respects nature." },
  { icon: "✨", title: "Growth Culture", desc: "We invest in learning, mentorship, and cross-functional collaboration." },
  { icon: "🌍", title: "Global Perspective", desc: "Work across Dubai and Bangalore with a team spanning continents." },
  { icon: "💚", title: "Wellbeing First", desc: "Flexible hours, wellness stipend, and generous time-off policies." },
];

function CareersPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Join Us</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Build the future of<br /><span className="italic text-[#2C5D2E]">botanical beauty.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            We're looking for passionate individuals who believe beauty can be both luxurious and responsible.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-6">Why Arovia</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
                <span className="text-3xl">{v.icon}</span>
                <h3 className="mt-4 font-display text-xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1a2e1b] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4" style={{ color: "#CFF57C" }}>Open Positions</p>
          <h2 className="font-display text-4xl md:text-5xl">Current opportunities.</h2>
          <div className="mt-16 space-y-0">
            {POSITIONS.map((p) => (
              <div key={p.title} className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <span className="text-xs text-white/50">{p.location}</span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-white/50">{p.type}</span>
                    <span className="text-xs text-white/50">•</span>
                    <span className="text-xs text-[#CFF57C]">{p.dept}</span>
                  </div>
                </div>
                <a href="mailto:careers@aroviaessentials.com" className="btn-luxe-inverse text-center">Apply →</a>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-white/10 pt-8">
            <p className="text-sm text-white/50">Don't see a role that fits? Send your résumé to <a href="mailto:careers@aroviaessentials.com" className="text-[#CFF57C]">careers@aroviaessentials.com</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}
