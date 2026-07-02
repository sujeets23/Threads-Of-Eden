import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Arovia Essentials" },
      { name: "description", content: "Meet the founders, craftsmanship, and story behind Arovia Essentials." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div className="space-y-8">
            <p className="eyebrow">Our story</p>
            <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
              Founded by siblings who believe
              <br />
              less is more.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
              Arovia Essentials was born from a shared belief in premium simplicity.
              The founders began crafting ritual products from a small atelier, guided
              by the idea that every ingredient must earn its place.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              <FeatureCard title="Sibling founders" description="A brother and sister unite heritage and modernity through curated botanicals." />
              <FeatureCard title="Handcrafted rituals" description="Every formula is made in limited batches with thoughtful ingredient sourcing." />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
              <p className="eyebrow mb-4">Founded by siblings</p>
              <h2 className="font-display text-4xl">A house shaped by family, craft, and quiet luxury.</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                Their shared path was formed around botanical knowledge, spa heritage,
                and a desire to make luxury feel calm instead of loud.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-[2rem] border border-black/10 bg-[#f7f7f5] p-8">
                <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#e9e6dd]" />
                <p className="mt-5 text-sm text-muted-foreground">Gallery concept image placeholder</p>
              </div>
              <div className="rounded-[2rem] border border-black/10 bg-[#f7f7f5] p-8">
                <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#e9e6dd]" />
                <p className="mt-5 text-sm text-muted-foreground">Product atelier placeholder</p>
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
    <div className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
      <h3 className="font-display text-2xl">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
