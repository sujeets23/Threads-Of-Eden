import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";
import ingredientsImg from "@/assets/ingredients.jpg";
import featuredImg from "@/assets/featured.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Arovia Essentials" },
      { name: "description", content: "Learn about the botanical philosophy, craftsmanship, and pure ingredients behind Arovia Essentials." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Editorial Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-secondary">
        <img 
          src={aboutImg} 
          alt="Arovia Essentials Botanical Studio" 
          className="h-full w-full object-cover brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 mx-auto max-w-[1400px] md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">Our Story</p>
          <h1 className="font-display text-4xl leading-tight text-white md:text-6xl mt-2">
            Nature, distilled to <br />
            <span className="italic">absolute purity.</span>
          </h1>
        </div>
      </section>

      {/* Philosophy & Craftsmanship Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          
          {/* Left Column: Brand Statement & Cards */}
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="eyebrow">The Philosophy</p>
              <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
                Honoring the skin <br />and the earth.
              </h2>
              <p className="text-base leading-8 text-muted-foreground max-w-xl">
                Arovia Essentials was born from a commitment to clean, high-performance skincare. We believe that true luxury lies in simplicity, creating restorative rituals that eliminate synthetic fillers and prioritize 100% active botanical ingredients.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureCard 
                title="Botanical Purity" 
                description="Cold-pressed oils, steam-distilled essential oils, and organic plant extracts selected for maximum nutrient density." 
              />
              <FeatureCard 
                title="Ethical Sourcing" 
                description="Formulations hand-crafted in limited, fresh batches using certified cruelty-free and sustainably harvested ingredients." 
              />
            </div>
          </div>

          {/* Right Column: Narrative & Image Gallery */}
          <div className="space-y-12">
            {/* Detailed Narrative Card */}
            <div className="rounded-[2.5rem] border border-black/10 bg-white p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.04)] space-y-6">
              <p className="eyebrow">Modern Alchemy</p>
              <h3 className="font-display text-3xl md:text-4xl">Quiet luxury crafted in fresh batches.</h3>
              <p className="text-base leading-8 text-muted-foreground">
                We combine ancient apothecary wisdom with modern green chemistry. Every serum, lotion, and oil is crafted to nourish the skin barrier while offering a premium sensory experience through pure therapeutic essential oils. Our containers are made of UV-protective glass to naturally preserve the active botanicals.
              </p>
            </div>

            {/* Gallery concept */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary">
                  <img 
                    src={ingredientsImg} 
                    alt="Raw botanical ingredients" 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#2C5D2E] px-2">Pure Extracts</h4>
                <p className="mt-1 text-xs text-muted-foreground px-2">Fresh, organic petals and herbs ready for distillation.</p>
              </div>

              <div className="rounded-[2rem] border border-black/10 bg-white p-4 shadow-sm">
                <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-secondary">
                  <img 
                    src={featuredImg} 
                    alt="Arovia botanical bottles" 
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#2C5D2E] px-2">Atelier Craft</h4>
                <p className="mt-1 text-xs text-muted-foreground px-2">Thoughtfully packaged in amber glass apothecary jars.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm space-y-4">
      <h3 className="font-display text-xl md:text-2xl">{title}</h3>
      <p className="text-xs leading-6 text-muted-foreground">{description}</p>
    </div>
  );
}
