import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/store";
import heroVideo from "@/assets/hero-video.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Threads of Eden — Woven with purpose. Inspired by grace." },
      {
        name: "description",
        content:
          "Threads of Eden — Woven with Purpose. Inspired by Grace. Meaningful clothing and accessories designed for everyday life and faith.",
      },
      { property: "og:title", content: "Threads of Eden — Woven with Purpose. Inspired by Grace." },
      {
        property: "og:description",
        content:
          "More than clothing, we believe every thread can carry meaning. Wear your story. Walk in grace.",
      },
    ],
  }),
  component: HomePage,
});

/* ------------------------------- Utilities ------------------------------- */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}

function useCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });
  const [inWindow, setInWindow] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setInWindow(true);
    };
    const leave = () => setInWindow(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return { sx, sy, inWindow };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Page ------------------------------- */

function HomePage() {
  useLenis();
  const { sx, sy, inWindow } = useCursor();
  const [hover, setHover] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground grain overflow-x-clip">
      {/* Cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          x: sx,
          y: sy,
          opacity: inWindow ? 1 : 0,
          width: hover ? 60 : 14,
          height: hover ? 60 : 14,
          transition: "width 400ms cubic-bezier(.16,1,.3,1), height 400ms cubic-bezier(.16,1,.3,1), opacity 300ms ease",
          background: "radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%)",
          borderRadius: 999,
          mixBlendMode: "normal",
        }}
      />

      <Hero onHover={setHover} />
      <ShopByCategorySection onHover={setHover} />
      <Marquee />
      <HomepageAboutUs onHover={setHover} />
      <ShowcaseSection onHover={setHover} />
      <Collections onHover={setHover} />
      <FeaturedProduct onHover={setHover} />
      <CTASection onHover={setHover} />
    </div>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero({ onHover }: { onHover: (v: boolean) => void }) {
  const { settings } = useStore();
  const hero = settings?.hero || {
    titleLine1: "Woven with",
    titleLine2: "Purpose & Grace",
    subtitle:
      "More than clothing, we believe every thread can carry meaning. Bringing together modern clothing and accessories with timeless values, creating pieces inspired by faith, purpose, and the beauty of God’s creation.",
    eyebrow: "THREADS OF EDEN",
    ctaText: "Explore The Collection",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1800&auto=format&fit=crop&q=85",
  };
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] md:min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute -top-12 inset-x-0 h-[115%]" style={{ y: bgY }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
          {hero.videoUrl && hero.videoUrl !== heroVideo && (
            <source src={hero.videoUrl} type="video/mp4" />
          )}
        </video>
        <div className="absolute inset-0 hero-overlay bg-black/45" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-16 md:pb-28 pt-24">
        <div className="max-w-[92vw] sm:max-w-[80vw] md:max-w-3xl text-left">
          {hero.eyebrow && (
            <p className="eyebrow mb-4 text-[#E5CFAC] tracking-[0.3em] font-medium">
              {hero.eyebrow}
            </p>
          )}

          <h1 className="font-display text-[12vw] leading-[1.02] tracking-[-0.02em] sm:text-[11vw] sm:tracking-[-0.03em] md:text-[8vw] md:leading-[0.95] md:tracking-[-0.04em] text-white">
            <AnimatedWords text={hero.titleLine1 || "Made for"} className="block" />
            <AnimatedWords
              text={hero.titleLine2 || "little movers"}
              delay={0.25}
              className="block italic text-white/90"
            />
          </h1>

          {hero.subtitle && (
            <p className="mt-6 max-w-xl text-sm sm:text-base text-white/80 leading-relaxed font-light">
              {hero.subtitle}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-4 sm:mt-12 items-center">
            <Reveal delay={0.5}>
              <a
                href={hero.ctaLink || "/shop"}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="w-fit rounded-full border border-white bg-transparent px-8 py-3.5 text-center text-sm font-medium uppercase tracking-[0.15em] text-white shadow-sm transition-all duration-300 hover:bg-white hover:text-[#47352F]"
              >
                {hero.ctaText || "Discover the Collection"}
                <span className="ml-2 font-sans" aria-hidden>
                  →
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-white/60">Scroll</span>
          <motion.div
            className="h-8 w-px bg-white/40"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedWords({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 + delay }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ------------------------ Shop By Category ------------------------ */

interface CategoryTile {
  title: string;
  discount: string;
  img: string;
  link: string;
}

function ShopByCategorySection({ onHover }: { onHover: (v: boolean) => void }) {
  const categoryTiles: CategoryTile[] = [
    {
      title: "Men T-Shirts",
      discount: "40-70% OFF",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=Men+T-Shirts",
    },
    {
      title: "Kids T-Shirts",
      discount: "40-80% OFF",
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=Kids+T-Shirts",
    },
    {
      title: "Women T-Shirts",
      discount: "40-70% OFF",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=Women+T-Shirts",
    },
    {
      title: "Unisex Hoodie",
      discount: "30-60% OFF",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=Unisex+Hoodie",
    },
    {
      title: "LED Photo Frame",
      discount: "30-50% OFF",
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=LED+Photo+Frame",
    },
    {
      title: "Regular Photo Frame",
      discount: "30-50% OFF",
      img: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=600&auto=format&fit=crop&q=80",
      link: "/shop?category=Regular+Photo+Frame",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 border-b border-black/5">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        {/* Section Heading */}
        <div className="mb-6 md:mb-8">
          <h2 className="font-sans text-lg sm:text-2xl md:text-[24px] font-bold tracking-[0.2em] text-[#221b18] uppercase">
            SHOP BY CATEGORY
          </h2>
        </div>

        {/* 6-column Grid matching reference */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
          {categoryTiles.map((cat, idx) => (
            <Reveal key={cat.title} delay={idx * 0.03}>
              <a
                href={cat.link}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="group block border-[1.5px] border-[#eedac5] bg-[#fffaf5] p-2 sm:p-2.5 transition-all duration-300 hover:border-[#47352F] hover:shadow-md"
              >
                {/* Product/Model Image */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#f4ece3]">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content Panel */}
                <div className="pt-3 pb-1.5 text-center">
                  <h3 className="text-xs sm:text-[13px] font-semibold text-[#221b18] leading-tight truncate">
                    {cat.title}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base font-extrabold text-black tracking-tight">
                    {cat.discount}
                  </p>
                  <span className="mt-0.5 inline-block text-[11px] font-semibold text-black/75 transition-colors group-hover:text-[#47352F] group-hover:underline">
                    Shop Now
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Marquee ------------------------------- */

function Marquee() {
  const { settings } = useStore();
  const items =
    settings.marqueeItems && settings.marqueeItems.length > 0
      ? settings.marqueeItems
      : [
          "7-Day Return Policy",
          "Soft cotton comfort",
          "Kids sizes 2-13Y",
          "Oversized, polos & round necks",
          "Hassle-free 7-day returns",
          "Festive Christmas tees",
          "Playful colors and prints",
        ];

  return (
    <section className="border-y border-border/60 bg-[#f5efe8] py-6 overflow-hidden">
      <div className="mx-auto flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] w-max select-none">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="mx-6 eyebrow flex items-center gap-6 md:mx-10 md:gap-10 text-black/80"
          >
            {it}
            <span className="inline-block h-1 w-1 rounded-full bg-[#47352F]" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------ Homepage Short About Us ------------------------ */

function HomepageAboutUs({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section className="bg-[#fbf7f0] py-20 md:py-28 border-b border-black/5 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Left Column: Brand Statement */}
          <div className="md:col-span-5 text-center md:text-left">
            <Reveal>
              <p className="eyebrow mb-3 text-[#47352F] tracking-[0.3em]">
                HOMEPAGE — SHORT ABOUT US
              </p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#221b18] leading-[1.05]">
                THREADS OF EDEN
              </h2>
              <p className="mt-3 text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-[#47352F]">
                Woven with Purpose. Inspired by Grace.
              </p>

              <div className="mt-8 pt-8 border-t border-[#47352F]/15 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#47352F] border border-[#47352F]/15 shadow-2xs">
                  Genesis 1:27
                </span>
                <span className="rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#47352F] border border-[#47352F]/15 shadow-2xs">
                  Ephesians 2:10
                </span>
                <span className="rounded-full bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#47352F] border border-[#47352F]/15 shadow-2xs">
                  Colossians 3:23
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Narrative Copy */}
          <div className="md:col-span-7">
            <Reveal delay={0.15}>
              <div className="space-y-5 text-base sm:text-lg leading-[1.8] text-black/85 font-light">
                <p>
                  More than clothing, we believe every thread can carry meaning. At Threads of Eden,
                  we bring together modern clothing and accessories with timeless values, creating
                  pieces inspired by faith, purpose, and the beauty of God’s creation.
                </p>
                <p className="text-[#221b18] font-medium">
                  Designed for everyday life, made to reflect what matters most.
                </p>
                <div className="pt-2">
                  <p className="font-display text-2xl text-[#47352F] font-semibold italic">
                    Wear your story. Walk in grace.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/about"
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  className="rounded-full bg-[#47352F] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#34241e] shadow-sm"
                >
                  Read Our Story →
                </a>
                <a
                  href="/shop"
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  className="rounded-full border border-[#47352F] bg-transparent px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#47352F] transition-all hover:bg-[#47352F]/10"
                >
                  Explore Collection
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Showcase ------------------------------- */

function ShowcaseSection({ onHover }: { onHover: (v: boolean) => void }) {
  const { products, categories } = useStore();
  const [selectedCat, setSelectedCat] = useState("All");
  const [christmasDept, setChristmasDept] = useState<"All" | "Men" | "Women" | "Kids">("All");
  const [christmasSub, setChristmasSub] = useState<string>("All");

  const isChristmas = (selectedCat || "").toLowerCase().includes("christmas");

  const handleCategorySelect = (cat: string) => {
    setSelectedCat(cat);
    if (!(cat || "").toLowerCase().includes("christmas")) {
      setChristmasDept("All");
      setChristmasSub("All");
    }
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const pCat = (p.category || "").toLowerCase();
      const isProductChristmas = pCat.includes("christmas");
      let matchCat = false;
      if (selectedCat === "All") {
        matchCat = true;
      } else if (isChristmas) {
        matchCat = isProductChristmas;
      } else {
        matchCat = p.category === selectedCat;
      }

      if (!matchCat) return false;

      if (isChristmas) {
        if (christmasDept !== "All") {
          if (!p.department || p.department.toLowerCase() !== christmasDept.toLowerCase()) {
            return false;
          }
        }
        if (christmasSub !== "All") {
          if (!p.subCategory || p.subCategory.toLowerCase() !== christmasSub.toLowerCase()) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, selectedCat, isChristmas, christmasDept, christmasSub]);

  return (
    <section id="shop" className="relative py-20 md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 md:mb-6 text-[#47352F]">The Curated Collection</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-7xl">
              Woven with purpose.
              <br />
              <span className="italic text-[#47352F]/80">Inspired by grace & memory.</span>
            </h2>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isXmas = (cat || "").toLowerCase().includes("christmas");
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedCat === cat
                      ? "bg-[#47352F] text-white shadow-sm"
                      : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                  }`}
                >
                  {isXmas ? `🎄 ${cat}` : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Christmas Sub-Filter Bar if Christmas Category is Active */}
        {isChristmas && (
          <div className="mb-12 rounded-2xl border border-[#47352F]/15 bg-[#fbf7f0] p-5 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#47352F]/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎄</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#47352F]">
                  Christmas Sub-Filters
                </span>
              </div>
              {(christmasDept !== "All" || christmasSub !== "All") && (
                <button
                  onClick={() => {
                    setChristmasDept("All");
                    setChristmasSub("All");
                  }}
                  className="text-xs font-medium text-[#8A1822] hover:underline"
                >
                  Reset Sub-Filters
                </button>
              )}
            </div>

            {/* Department Level Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-black/60 mr-1">Department:</span>
              {(["All", "Men", "Women", "Kids"] as const).map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setChristmasDept(dept);
                    setChristmasSub("All");
                  }}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                    christmasDept === dept
                      ? "bg-[#8A1822] text-white shadow-xs"
                      : "border border-black/10 bg-white text-black/80 hover:border-[#8A1822]"
                  }`}
                >
                  {dept === "All" ? "All Festive" : dept}
                </button>
              ))}
            </div>

            {/* Subcategory Pills */}
            <div className="rounded-xl bg-white/80 p-3 border border-black/5">
              {christmasDept === "Men" && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#47352F]">Men's:</span>
                  <button
                    onClick={() => setChristmasSub("All")}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      christmasSub === "All" ? "bg-[#47352F] text-white" : "bg-black/5 text-black/70"
                    }`}
                  >
                    All Men's
                  </button>
                  {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setChristmasSub(sub)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        christmasSub.toLowerCase() === sub.toLowerCase()
                          ? "bg-[#47352F] text-white"
                          : "bg-black/5 text-black/70 hover:bg-[#47352F]/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {christmasDept === "Women" && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#47352F]">Women's:</span>
                  <button
                    onClick={() => setChristmasSub("All")}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      christmasSub === "All" ? "bg-[#47352F] text-white" : "bg-black/5 text-black/70"
                    }`}
                  >
                    All Women's
                  </button>
                  {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setChristmasSub(sub)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        christmasSub.toLowerCase() === sub.toLowerCase()
                          ? "bg-[#47352F] text-white"
                          : "bg-black/5 text-black/70 hover:bg-[#47352F]/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {christmasDept === "Kids" && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#47352F]">Kids':</span>
                  <button
                    onClick={() => setChristmasSub("All")}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      christmasSub === "All" ? "bg-[#47352F] text-white" : "bg-black/5 text-black/70"
                    }`}
                  >
                    All Kids'
                  </button>
                  {["Boys", "Girls"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setChristmasSub(sub)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                        christmasSub.toLowerCase() === sub.toLowerCase()
                          ? "bg-[#47352F] text-white"
                          : "bg-black/5 text-black/70 hover:bg-[#47352F]/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              {christmasDept === "All" && (
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#47352F]">Men:</span>
                    {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setChristmasDept("Men");
                          setChristmasSub(sub);
                        }}
                        className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] text-black/80 hover:bg-[#8A1822] hover:text-white transition"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#47352F]">Women:</span>
                    {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setChristmasDept("Women");
                          setChristmasSub(sub);
                        }}
                        className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] text-black/80 hover:bg-[#8A1822] hover:text-white transition"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-[#47352F]">Kids:</span>
                    {["Boys", "Girls"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setChristmasDept("Kids");
                          setChristmasSub(sub);
                        }}
                        className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] text-black/80 hover:bg-[#8A1822] hover:text-white transition"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-x-8 md:gap-y-16">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onHover={onHover} />
          ))}
        </div>

        {/* Action Link to Full Shop */}
        <div className="mt-16 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 rounded-full border border-[#47352F] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#47352F] transition hover:bg-[#47352F] hover:text-white"
          >
            Explore All Styles ({products.length})<span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  onHover,
}: {
  product: Product;
  index: number;
  onHover: (v: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const { addToCart } = useCart();

  return (
    <Reveal delay={index * 0.05}>
      <div
        ref={ref}
        className="group cursor-pointer"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <a
          href={`/product/${product.id}`}
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary md:aspect-[4/5] border border-black/5 block"
        >
          <motion.div style={{ y }} className="h-[115%] w-full -mt-[7%]">
            <img
              src={product.img}
              alt={product.name}
              width={800}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </motion.div>

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 rounded-full bg-[#221b18]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E5CFAC] backdrop-blur">
              {product.badge}
            </div>
          )}

          {/* Desktop quick-add overlay */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-between bg-[#47352F]/95 px-6 py-4 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 md:flex hover:bg-[#34241f]"
          >
            <span className="text-xs font-medium uppercase tracking-[0.15em]">
              Quick Add to Bag
            </span>
            <span aria-hidden>+</span>
          </button>

          {/* Mobile quick-add button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#47352F] text-white shadow-lg md:hidden"
            aria-label="Add to bag"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </a>

        <div className="mt-3 md:mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#47352F]">
              {product.department && product.subCategory
                ? `${product.department} · ${product.subCategory}`
                : product.category}
            </p>
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-[10px] text-muted-foreground uppercase">
                {product.sizes.join(" · ")}
              </span>
            )}
          </div>

          <a
            href={`/product/${product.id}`}
            className="hover:text-[#47352F] transition-colors block"
          >
            <h3 className="mt-1 text-sm font-medium leading-snug md:text-lg line-clamp-1">
              {product.name}
            </h3>
          </a>

          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{product.note}</p>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold md:text-base">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
            </div>
            <a
              href={`/product/${product.id}`}
              className="text-xs font-semibold text-[#47352F] hover:underline"
            >
              Details →
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------- Editorial Collections ------------------------------- */

function Collections({ onHover }: { onHover: (v: boolean) => void }) {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=85",
      title: "Men's Collection",
      tag: "Timeless tees rooted in faith",
      href: "/shop?category=Men+T-Shirts",
    },
    {
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&auto=format&fit=crop&q=85",
      title: "Women's Collection",
      tag: "Graceful silhouettes & comfort",
      href: "/shop?category=Women+T-Shirts",
    },
    {
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=1200&auto=format&fit=crop&q=85",
      title: "Kids' Collection",
      tag: "Playful designs made with purpose",
      href: "/shop?category=Kids+T-Shirts",
    },
    {
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&auto=format&fit=crop&q=85",
      title: "Devotional Keepsakes",
      tag: "Illuminated LED & solid wood frames",
      href: "/shop?category=LED+Photo+Frame",
    },
  ];

  return (
    <section className="bg-[#221b18] py-28 text-white md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <Reveal>
            <p className="eyebrow" style={{ color: "#E5CFAC" }}>
              Silhouettes
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1] md:text-7xl">
              Editorial
              <br />
              <span className="italic text-[#E5CFAC]">wardrobe.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          {items.map((item) => (
            <EditorialCard
              key={item.title}
              item={item}
              className="md:col-span-6 md:aspect-[4/5]"
              onHover={onHover}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialCard({
  item,
  className = "",
  onHover,
}: {
  item: { img: string; title: string; tag: string; href: string };
  className?: string;
  onHover: (v: boolean) => void;
}) {
  return (
    <Reveal className={className}>
      <a
        href={item.href}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className="group relative block h-full w-full overflow-hidden rounded-2xl"
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#221b18]/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <p className="eyebrow mb-3 text-[#E5CFAC]">{item.tag}</p>
          <h3 className="font-display text-3xl md:text-5xl">{item.title}</h3>
          <div className="mt-6 flex translate-y-4 items-center gap-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="eyebrow text-white">Explore range</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </a>
    </Reveal>
  );
}

/* ------------------------------- Featured Product ------------------------------- */

function FeaturedProduct({ onHover }: { onHover: (v: boolean) => void }) {
  const { products } = useStore();
  const featured = products.find((p) => p.isFeatured) || products[0];
  const { addToCart } = useCart();

  if (!featured) return null;

  return (
    <section className="relative overflow-hidden bg-[#fbf7f0] py-20 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="relative order-2 md:order-1">
          <Reveal>
            <p className="eyebrow mb-6 text-[#47352F]">Iconic Signature Piece</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-6xl">{featured.name}</h2>
          </Reveal>

          <Reveal delay={0.15} className="mt-6 max-w-md">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {featured.description}
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <div className="flex items-center gap-6">
              <p className="font-display text-3xl font-light">{featured.price}</p>
              <button
                onClick={() => addToCart(featured)}
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="btn-luxe"
              >
                Add to Bag
              </button>
              <a
                href={`/product/${featured.id}`}
                className="text-xs font-semibold uppercase tracking-wider text-[#47352F] hover:underline"
              >
                Full Details →
              </a>
            </div>
          </Reveal>

          <Reveal
            delay={0.45}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 md:mt-14 md:gap-8 md:pt-10"
          >
            {[
              ["Premium", "Organic Cotton"],
              ["6", "Curated Categories"],
              ["Faith-Rooted", "Inspired by Grace"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-light">{v}</p>
                <p className="eyebrow mt-1 text-muted-foreground">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative order-1 md:order-2">
          <a
            href={`/product/${featured.id}`}
            className="block relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-2xl shadow-2xl border border-black/5 group"
          >
            <img
              src={featured.img}
              alt={featured.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */

function CTASection({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section className="relative overflow-hidden bg-[#47352F] text-white py-24 md:py-36">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-4 text-[#E5CFAC] tracking-[0.3em]">
            WEAR YOUR STORY · WALK IN GRACE
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl leading-tight">
            Every thread tells a story.
            <br />
            <span className="italic text-[#E5CFAC]">Every design carries a purpose.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-white/85 leading-relaxed font-light">
            And every day is an opportunity to reflect His goodness in the way we live. We are here to
            remind you that you were beautifully created, deeply loved, and made with purpose.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-[#E5CFAC]/90">
            “For we are God’s handiwork, created in Christ Jesus to do good works.” — Ephesians 2:10
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="btn-luxe-inverse"
            >
              Explore The Collection
            </a>
            <a
              href="/about"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="rounded-full border border-white/60 bg-transparent px-8 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white hover:text-[#47352F]"
            >
              Our Story & Inspiration
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
