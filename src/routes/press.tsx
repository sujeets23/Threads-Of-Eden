import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & Media — Threads of Eden" },
      { name: "description", content: "Press kit, media enquiries, and featured coverage for Threads of Eden." },
    ],
  }),
  component: PressPage,
});

const PRESS_MENTIONS = [
  { outlet: "GQ Style", quote: "The collar holds its crisp shape after 30 washes. Easily the best polo cut in menswear today.", date: "June 2026" },
  { outlet: "Monocle", quote: "Threads of Eden does not shout. It simply, patiently, perfects the everyday heavyweight silhouette.", date: "May 2026" },
  { outlet: "Esquire Select", quote: "Extraordinary Peruvian piqué and zero branding — quiet luxury executed to perfection.", date: "April 2026" },
  { outlet: "Vogue Men", quote: "Finally, an essential t-shirt line built with architectural weight and tailored permanence.", date: "March 2026" },
  { outlet: "Financial Times", quote: "From California Supima to Milanese knitwear — the craftsmanship story behind Threads of Eden.", date: "February 2026" },
];

function PressPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Media</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Press &<br /><span className="italic text-[#2C5D2E]">media.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            For press enquiries, interview requests, and media kits, contact our communications team.
          </p>
          <div className="mt-8">
            <a href="mailto:press@threadandroots.com" className="btn-luxe">Media Enquiries →</a>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-6">Featured Coverage</p>
          <div className="space-y-0">
            {PRESS_MENTIONS.map((p) => (
              <div key={p.outlet} className="group border-t border-black/10 py-10 transition-colors hover:bg-secondary/50">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <p className="eyebrow text-[#2C5D2E]">{p.outlet}</p>
                    <p className="mt-3 font-display text-2xl leading-snug md:text-3xl">"{p.quote}"</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#2C5D2E] py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <p className="eyebrow mb-6 text-[#CFF57C]">Press Kit</p>
          <h2 className="font-display text-4xl md:text-5xl">Need brand assets?</h2>
          <p className="mt-4 text-sm text-white/70">Download our press kit with logos, product images, and brand guidelines.</p>
          <div className="mt-10">
            <a href="mailto:press@threadandroots.com" className="btn-luxe-inverse">Request Press Kit →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
