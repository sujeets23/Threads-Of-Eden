import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
import logo from "@/assets/top right logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Threads of Eden" },
      {
        name: "description",
        content:
          "More than apparel, a quiet testimony. Learn about the story, purpose, and heart behind Threads of Eden.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
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
            MORE THAN APPAREL, A QUIET TESTIMONY
          </h1>
          <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#47352F]">
            Woven with Purpose · Inspired by Grace
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-16 md:py-28">
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          {/* Brand Logo Insignia */}
          <div className="mb-12 flex justify-center">
            <img
              src={logo}
              alt="Threads of Eden"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Story Content */}
          <div className="space-y-8 text-base sm:text-lg leading-[1.8] text-black/85 font-normal">
            <p>
              Threads of Eden didn't start in a boardroom. It started with a conversation, the kind
              that happens late at night, when your heart is full and your faith is stirring.
            </p>

            <p>
              We've always believed that our faith isn't meant to stay hidden, it's meant to be seen,
              lived, and shared. One day, we looked around and thought: Why isn't there a clothing
              brand that reflects what we believe? Something stylish, meaningful, and unapologetically
              rooted in the Word?
            </p>

            <p>
              That question became a spark. And over coffee cups, prayers, and a lot of scribbled
              ideas, Threads of Eden was born.
            </p>

            <p>
              We're not fashion moguls or marketing pros, we're just a bunch of believers who wanted
              to build something that would glorify God and connect people through Scripture. Our hope
              is simple: that every piece you wear would start a conversation, inspire a moment, or
              remind someone — even yourself — of the truth of who God is.
            </p>

            <p className="text-black/80 italic border-l-2 border-[#47352F] pl-5 my-8 text-base">
              The name Eden reminds us of timeless grace, fellowship, and purpose—because God's Word
              is timeless.
            </p>

            <div className="pt-6 border-t border-black/10">
              <p className="font-semibold text-black">With hope,</p>
              <p className="font-display text-xl text-[#47352F] font-medium mt-1">
                The Threads of Eden Team
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-16 text-center pt-8 border-t border-black/10">
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
