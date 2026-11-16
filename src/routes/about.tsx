import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Threads of Eden Kidswear" },
      {
        name: "description",
        content:
          "Meet Threads of Eden: playful, comfortable t-shirts made for kids' everyday adventures.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Editorial Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-secondary">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=85"
          alt="Threads of Eden kidswear collection"
          className="h-full w-full object-cover brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-12 left-6 right-6 mx-auto max-w-[1400px] md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E5CFAC]">
            Our Story
          </p>
          <h1 className="font-display text-4xl leading-tight text-white md:text-6xl mt-2">
            Little styles for <br />
            <span className="italic">big adventures.</span>
          </h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-6">
            <p className="eyebrow text-[#47352F]">The Threads of Eden Story</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-5xl">
              Made for play.<br />
              Ready for every day.
            </h2>
            <p className="text-base leading-8 text-muted-foreground">
              Threads of Eden brings playful, comfortable t-shirts to kids' everyday wardrobes.
              Our collection focuses on the styles families reach for most: oversized tees,
              classic polos, round necks, and festive Christmas prints.
            </p>
            <p className="text-base leading-8 text-muted-foreground">
              We believe getting dressed should feel easy. That means soft-feel fabrics,
              comfortable fits, and age-based sizes for growing kids—whether they are heading
              to school, meeting friends, or celebrating the holidays.
            </p>
            <div className="pt-4">
              <Link to="/shop" className="btn-luxe">
                Explore Kids' T-Shirts
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                Style 01
              </span>
              <h3 className="font-display text-2xl font-medium">Everyday Comfort</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Easy-to-wear t-shirts designed for comfort through school, weekends, and play.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                Style 02
              </span>
              <h3 className="font-display text-2xl font-medium">Classic Favorites</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Choose from oversized t-shirts, collared polos, and classic round neck styles.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                Style 03
              </span>
              <h3 className="font-display text-2xl font-medium">Sizes for Growing Kids</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Find age-based sizes from 2-3Y to 12-13Y, with a guide to help you choose.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                Style 04
              </span>
              <h3 className="font-display text-2xl font-medium">Holiday Cheer</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Festive Christmas edition tees bring a little extra fun to the season.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
