import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, Compass, Sparkles, BookOpen } from "lucide-react";
import logo from "@/assets/top right logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Threads of Eden" },
      {
        name: "description",
        content:
          "Woven with Purpose. Inspired by Grace. Learn about the story, mission, vision, and heart behind Threads of Eden.",
      },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Editorial Header */}
      <section className="bg-secondary border-b border-black/5 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12 text-center">
          <Link
            to="/"
            className="eyebrow mb-6 inline-flex items-center gap-2 text-[#47352F] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>

          <p className="eyebrow mb-3 tracking-[0.3em] text-[#47352F]">ABOUT US</p>
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black max-w-3xl mx-auto leading-[1.08]">
            MORE THAN WHAT YOU WEAR
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#47352F]">
            Woven with Purpose · Inspired by Grace
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[840px] px-6 md:px-12">
          {/* Brand Logo Insignia */}
          <div className="mb-12 flex justify-center">
            <img
              src={logo}
              alt="Threads of Eden"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Core Brand Manifesto Banner */}
          <div className="rounded-3xl border border-[#47352F]/15 bg-[#fbf7f0] p-8 sm:p-10 text-center shadow-xs mb-16">
            <p className="text-lg sm:text-2xl font-light leading-relaxed text-[#221b18] italic">
              “Every thread tells a story. Every design carries a purpose. And every day is an opportunity to reflect His goodness in the way we live.”
            </p>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
              <span className="rounded-full bg-[#47352F] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Wear your story
              </span>
              <span className="rounded-full bg-[#47352F] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Walk in grace
              </span>
              <span className="rounded-full bg-[#47352F] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white">
                Live with purpose
              </span>
            </div>
            <p className="mt-5 text-xs font-medium tracking-wider text-[#47352F]/80 uppercase">
              Inspired by Genesis 1:27, Ephesians 2:10 & Colossians 3:23
            </p>
          </div>

          {/* Section: More Than What You Wear */}
          <div className="space-y-6 text-base sm:text-lg leading-[1.85] text-black/85 font-normal">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221b18] tracking-tight uppercase">
              More Than What You Wear
            </h2>
            <p>
              At Threads of Eden, we believe clothing is more than fabric and fashion. It’s a way to
              express yourself, carry your values, and tell your story.
            </p>
            <p>
              Inspired by the beauty of creation and the grace of God, we bring you thoughtfully
              designed clothing and accessories that combine modern style with meaningful
              inspiration.
            </p>
            <p>
              Our hope is simple—to make pieces you’ll love wearing and messages that remind you of what
              truly matters.
            </p>
            <div className="rounded-2xl border-l-4 border-[#47352F] bg-[#f7f2eb] p-5 my-6 text-base font-medium text-[#47352F]">
              You are created with purpose. You are loved beyond measure. And your story is worth
              wearing.
            </div>
          </div>

          {/* Section: Our Story */}
          <div className="mt-16 pt-12 border-t border-black/10 space-y-6 text-base sm:text-lg leading-[1.85] text-black/85 font-normal">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221b18] tracking-tight uppercase">
              Our Story
            </h2>
            <p>
              Threads of Eden was born from a simple thought: what we wear can be beautiful, at the
              same time it can also be a way to glorify our Lord and Saviour Jesus Christ.
            </p>
            <p>
              Inspired by the beauty of creation and the grace of God, we wanted to create a brand that
              brings together fashion, comfort, and meaning. Not loud, not complicated—just
              thoughtfully designed clothing and accessories that tell a story of hope, identity, and
              purpose.
            </p>
            <p>
              The name <strong>Eden</strong> reminds us of beginnings, beauty, and God’s original design.
              <strong> Threads</strong> represent the everyday things woven into our lives—our
              experiences, our dreams, and the stories we carry.
            </p>
            <p>
              We may not always have everything figured out, but we believe every day is a gift, every
              person has a purpose, and grace is always worth wearing.
            </p>
          </div>

          {/* Section: Mission & Vision Cards */}
          <div className="mt-16 pt-12 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#47352F]/10 text-[#47352F] mb-6">
                  <Compass className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#221b18] mb-3">
                  Our Mission
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-black/80">
                  Our mission is to create clothing and accessories that blend meaningful inspiration
                  with everyday style. We want every piece to remind people that they are loved,
                  uniquely created, and called to live with purpose—while offering products that feel
                  comfortable, timeless, and beautiful.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-black/5 text-xs font-semibold text-[#47352F] uppercase tracking-wider">
                Inspired by Colossians 3:23 — Work with all your heart
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#47352F]/10 text-[#47352F] mb-6">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#221b18] mb-3">
                  Our Vision
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-black/80">
                  To build a brand that goes beyond fashion—a brand that inspires hope, spreads
                  kindness, celebrates individuality, and reflects grace in everyday life. We envision
                  Threads of Eden becoming a part of people’s journeys, where what they wear is not just
                  a style statement, but a quiet expression of faith, love, and purpose.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-black/5 text-xs font-semibold text-[#47352F] uppercase tracking-wider">
                Beyond fashion — A quiet expression of faith & love
              </p>
            </div>
          </div>

          {/* Section: Our Inspiration (Scriptures) */}
          <div className="mt-16 pt-12 border-t border-black/10">
            <div className="text-center mb-10">
              <p className="eyebrow mb-2 text-[#47352F]">FOUNDED IN FAITH</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#221b18] uppercase">
                Our Inspiration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#47352F]/20 bg-[#fbf7f0] p-6 text-center">
                <BookOpen className="h-5 w-5 text-[#47352F] mx-auto mb-3" />
                <p className="text-base sm:text-lg font-light italic text-[#221b18] leading-relaxed">
                  “For we are God’s handiwork, created in Christ Jesus to do good works.”
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#47352F]">
                  — Ephesians 2:10
                </p>
              </div>

              <div className="rounded-2xl border border-[#47352F]/20 bg-[#fbf7f0] p-6 text-center">
                <Sparkles className="h-5 w-5 text-[#47352F] mx-auto mb-3" />
                <p className="text-base sm:text-lg font-light italic text-[#221b18] leading-relaxed">
                  “Whatever you do, work at it with all your heart, as working for the Lord.”
                </p>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#47352F]">
                  — Colossians 3:23
                </p>
              </div>
            </div>
          </div>

          {/* Signoff */}
          <div className="mt-16 pt-10 border-t border-black/10 text-center space-y-2">
            <p className="font-semibold text-black text-base">This is Threads of Eden.</p>
            <p className="font-display text-2xl sm:text-3xl text-[#47352F] font-bold">
              Woven with Purpose. Inspired by Grace.
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-black/60 pt-2">
              With hope & grace, The Threads of Eden Team
            </p>
          </div>

          {/* Action CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 rounded-full bg-[#47352F] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#39291F] shadow-md"
            >
              <span>Explore The Collection</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
