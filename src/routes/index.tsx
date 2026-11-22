import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/store";
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Heart,
  ChevronRight,
  ShoppingBag,
  CheckCircle2,
  RefreshCw,
  Flame,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Threads of Eden — Faith-Rooted Apparel & Festive Essentials" },
      {
        name: "description",
        content:
          "Woven in Grace, Crafted for Purpose. Premium Christian faith t-shirts, hoodies, polos, and Christmas drops with 24-hour express dispatch and 7-day replacement guarantee.",
      },
      { property: "og:title", content: "Threads of Eden — Woven in Grace. Crafted for Purpose." },
      {
        property: "og:description",
        content:
          "Christian faith apparel, oversized tees, polos, and holiday collections for Men, Women & Kids. Dispatched in 24 hours.",
      },
    ],
  }),
  component: HomePage,
});

/* ------------------------------- Utilities ------------------------------- */

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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
  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return { sx, sy };
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
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Home Page ------------------------------- */

function HomePage() {
  useLenis();
  const { sx, sy } = useCursor();
  const [hover, setHover] = useState(false);
  const { cartCount, cartTotal, setCartOpen } = useCart();

  return (
    <div className="relative min-h-screen bg-[#fbf7f0] text-foreground overflow-x-clip selection:bg-[#47352F] selection:text-white">
      {/* Interactive Cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: hover ? 50 : 12,
          height: hover ? 50 : 12,
          transition: "width 300ms cubic-bezier(.16,1,.3,1), height 300ms cubic-bezier(.16,1,.3,1)",
          background: "radial-gradient(circle, rgba(71,53,47,0.2), transparent 70%)",
          borderRadius: 999,
        }}
      />

      {/* Hero Section */}
      <Hero onHover={setHover} />

      {/* Zepto/Blinkit Speed & Trust Bar */}
      <SpeedAndTrustBar />

      {/* Zepto/Blinkit Visual Category Bubbles */}
      <VisualCategoryBubbles />

      {/* Flash Sale / Christmas Deals Banner */}
      <FlashSaleBanner />

      {/* Quick-Commerce Product Shelves */}
      <ProductCatalogSection onHover={setHover} />

      {/* Verified Believer Reviews & Testimonials */}
      <CustomerReviewsSection />

      {/* Faith Philosophy Editorial Banner */}
      <FaithEditorialBanner onHover={setHover} />

      {/* Floating Zepto-style Quick Cart Bar */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 sm:left-auto z-40"
        >
          <div className="flex items-center justify-between gap-5 rounded-2xl bg-[#221b18] text-white px-5 py-3.5 shadow-2xl border border-[#E5CFAC]/25 backdrop-blur-md min-w-[320px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#47352F] text-white">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#E5CFAC]">
                  {cartCount} {cartCount === 1 ? "Item" : "Items"} in Bag
                </p>
                <p className="text-sm font-bold text-white">₹{cartTotal.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="rounded-full bg-[#E5CFAC] px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#221b18] hover:bg-white transition flex items-center gap-1.5 shadow-sm"
            >
              <span>View Bag</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ------------------------------- Hero Section ------------------------------- */

function Hero({ onHover }: { onHover: (v: boolean) => void }) {
  const { settings } = useStore();
  const hero = settings?.hero || {
    titleLine1: "Woven in Grace.",
    titleLine2: "Crafted for Purpose.",
    subtitle:
      "“She is clothed in strength and dignity, and she laughs without fear of the future.” — Proverbs 31:25",
    eyebrow: "† Woven with Purpose · Inspired by Grace",
    ctaText: "Shop Faith & Festive Drops",
    ctaLink: "#shop",
    imageUrl:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&auto=format&fit=crop&q=85",
  };

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] md:min-h-[92vh] flex flex-col justify-end overflow-hidden pt-24"
    >
      {/* Background with Christian Imagery */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={
            hero.imageUrl ||
            "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&auto=format&fit=crop&q=85"
          }
          alt="Threads of Eden Christian Faith Apparel"
          className="h-full w-full object-cover object-center"
        />
        {/* Warm editorial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 md:px-12 md:pb-24">
        <div className="max-w-3xl text-left">
          {/* Eyebrow & Live Dispatch Pill */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#E5CFAC] backdrop-blur-md border border-white/20">
              <span>†</span>
              <span>{hero.eyebrow || "Woven with Purpose · Inspired by Grace"}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-black backdrop-blur">
              <span className="animate-pulse">⚡</span>
              <span>24h Express Dispatch</span>
            </span>
          </div>

          {/* Hero Main Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.04] tracking-tight text-white">
            <span className="block font-medium">{hero.titleLine1 || "Woven in Grace."}</span>
            <span className="block italic text-[#E5CFAC] font-normal">
              {hero.titleLine2 || "Crafted for Purpose."}
            </span>
          </h1>

          {/* Scripture Verse Card */}
          <div className="mt-5 rounded-2xl border border-white/20 bg-black/40 p-4 sm:p-5 backdrop-blur-md max-w-2xl">
            <div className="flex items-start gap-3">
              <span className="text-2xl text-[#E5CFAC] leading-none shrink-0" aria-hidden>
                “
              </span>
              <div>
                <p className="text-sm sm:text-base font-light italic leading-relaxed text-white/95">
                  She is clothed in strength and dignity, and she laughs without fear of the future.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#E5CFAC]">
                    — Proverbs 31:25
                  </p>
                  <span className="text-[11px] text-white/70">
                    Faith-rooted cotton apparel for believers
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA & Delivery Trust Pill */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#shop"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="inline-flex items-center gap-2.5 rounded-full bg-[#E5CFAC] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-[#221b18] shadow-lg transition duration-300 hover:bg-white hover:scale-[1.02]"
            >
              <span>{hero.ctaText || "Shop Faith & Festive Drops"}</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/30 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20 transition"
            >
              <span>Our Story</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Zepto/Blinkit Speed & Trust Bar ----------------- */

function SpeedAndTrustBar() {
  const trustPoints = [
    {
      icon: "⚡",
      title: "24-Hour Dispatch",
      subtitle: "Shipped swiftly from our atelier",
    },
    {
      icon: "⭐",
      title: "4.9★ from 12,500+ Believers",
      subtitle: "Verified customer satisfaction",
    },
    {
      icon: "🕊️",
      title: "100% Combed Cotton",
      subtitle: "Bio-washed, pre-shrunk & breathable",
    },
    {
      icon: "🛡️",
      title: "7-Day Replacement Guarantee",
      subtitle: "Hassle-free unboxing claim support",
    },
  ];

  return (
    <section className="border-y border-black/10 bg-[#f4ece1] py-4">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trustPoints.map((tp, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-xl bg-white/70 p-3 shadow-xs border border-black/5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#47352F]/10 text-xl">
                {tp.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#221b18] truncate leading-tight">{tp.title}</p>
                <p className="text-[11px] text-[#47352F]/80 truncate mt-0.5">{tp.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Zepto/Blinkit Visual Category Bubbles ----------------- */

function VisualCategoryBubbles() {
  const bubbles = [
    {
      name: "Christmas Drops",
      tag: "FLAT 25% OFF",
      tagBg: "bg-red-600",
      img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
    },
    {
      name: "Men's Hoodies",
      tag: "TRENDING",
      tagBg: "bg-[#47352F]",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
      department: "Men",
      subCategory: "Hoodies",
    },
    {
      name: "Men's Polos",
      tag: "CLASSIC",
      tagBg: "bg-blue-700",
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=300&auto=format&fit=crop&q=80",
      category: "Polo T-Shirts",
    },
    {
      name: "Men's Crewnecks",
      tag: "POPULAR",
      tagBg: "bg-[#47352F]",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&auto=format&fit=crop&q=80",
      category: "Round Neck T-Shirts",
    },
    {
      name: "Women's Hoodies",
      tag: "COZY",
      tagBg: "bg-purple-700",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
      department: "Women",
      subCategory: "Hoodies",
    },
    {
      name: "Women's Polos",
      tag: "NEW",
      tagBg: "bg-emerald-700",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
      department: "Women",
      subCategory: "Polo",
    },
    {
      name: "Women's Tees",
      tag: "GRACE",
      tagBg: "bg-[#47352F]",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=300&auto=format&fit=crop&q=80",
      category: "Round Neck T-Shirts",
    },
    {
      name: "Boys' Tees",
      tag: "PLAY-READY",
      tagBg: "bg-sky-600",
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
      department: "Kids",
      subCategory: "Boys",
    },
    {
      name: "Girls' Tees",
      tag: "SWEET",
      tagBg: "bg-pink-600",
      img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=300&auto=format&fit=crop&q=80",
      category: "Christmas Edition",
      department: "Kids",
      subCategory: "Girls",
    },
    {
      name: "Oversized Tees",
      tag: "SAVE ₹300",
      tagBg: "bg-amber-700",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&auto=format&fit=crop&q=80",
      category: "Oversized T-Shirts",
    },
  ];

  return (
    <section className="py-8 bg-[#fbf7f0] border-b border-black/5">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <h2 className="text-base sm:text-lg font-bold text-[#221b18] tracking-tight">
              Explore By Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-[#47352F] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Horizontal scrollable visual bubble row */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          {bubbles.map((b, i) => (
            <a
              key={i}
              href="#shop"
              className="flex flex-col items-center shrink-0 w-20 sm:w-24 group text-center cursor-pointer"
            >
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 border-transparent group-hover:border-[#47352F] shadow-sm bg-white transition-all duration-300 group-hover:scale-105">
                <img src={b.img} alt={b.name} className="h-full w-full object-cover" />
                <span
                  className={`absolute top-1 left-1/2 -translate-x-1/2 ${b.tagBg} text-[9px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-xs`}
                >
                  {b.tag}
                </span>
              </div>
              <span className="mt-2 text-xs font-semibold text-[#221b18] group-hover:text-[#47352F] transition-colors leading-tight line-clamp-2">
                {b.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Zepto/Blinkit Live Flash Sale Banner ----------------- */

function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 18, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format2 = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="bg-gradient-to-r from-[#8A1822] via-[#47352F] to-[#221b18] py-4 text-white shadow-inner">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-black font-bold text-lg">
              ⚡
            </span>
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300">
                Christmas Harvest Flash Deal · Extra 25% OFF
              </p>
              <p className="text-xs text-white/80">
                Use code <span className="font-mono font-bold text-white underline">GRACE25</span> at checkout for instant savings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/20">
              <span className="text-amber-300">{format2(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="text-amber-300">{format2(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="text-amber-300">{format2(timeLeft.seconds)}s</span>
            </div>

            <a
              href="#shop"
              className="rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#221b18] hover:bg-amber-300 transition shrink-0"
            >
              Shop Deals
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Product Catalog Section (Multi-Shelf Quick-Commerce) ----------------- */

function ProductCatalogSection({ onHover }: { onHover: (v: boolean) => void }) {
  const { products, categories } = useStore();
  const [selectedCat, setSelectedCat] = useState("All");
  const [christmasDept, setChristmasDept] = useState<"All" | "Men" | "Women" | "Kids">("All");
  const [christmasSub, setChristmasSub] = useState<string>("All");

  const isChristmas = (selectedCat || "").toLowerCase().includes("christmas");

  const handleCategorySelect = (cat: string) => {
    setSelectedCat(cat);
    if (!cat.toLowerCase().includes("christmas")) {
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
    <section id="shop" className="py-12 md:py-20 bg-[#fbf7f0]">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        {/* Section Title & Category Filter Tabs */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-black/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#47352F]">
                † Christian Faith Apparel & Festive Drops
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                ⚡ In Stock & 24h Ready
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#221b18] tracking-tight">
              Curated Daily Drops
            </h2>
          </div>

          {/* Quick-Commerce Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((cat) => {
              const isXmas = (cat || "").toLowerCase().includes("christmas");
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    selectedCat === cat
                      ? "bg-[#47352F] text-white shadow-sm"
                      : "border border-black/10 bg-white text-black/80 hover:border-[#47352F]"
                  }`}
                >
                  {isXmas ? `🎄 ${cat}` : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Christmas Sub-Filter Panel */}
        {isChristmas && (
          <div className="mb-10 rounded-2xl border border-[#47352F]/15 bg-[#f4ede3] p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#47352F]/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-base">🎄</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#47352F]">
                  Christmas Department & Style Filters
                </span>
              </div>
              {(christmasDept !== "All" || christmasSub !== "All") && (
                <button
                  onClick={() => {
                    setChristmasDept("All");
                    setChristmasSub("All");
                  }}
                  className="text-xs font-semibold text-[#8A1822] hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Department Level Tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold text-black/70 mr-1">Department:</span>
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

            {/* Sub-Filters Container */}
            <div className="rounded-xl bg-white p-3 border border-black/5">
              {christmasDept === "Men" && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-[#47352F]">Men's Sub-Filters:</span>
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
                  <span className="text-xs font-semibold text-[#47352F]">Women's Sub-Filters:</span>
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
                  <span className="text-xs font-semibold text-[#47352F]">Kids' Sub-Filters:</span>
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

        {/* Zepto/Blinkit Interactive Product Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onHover={onHover} />
          ))}
        </div>

        {/* Catalog Footer Action */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 rounded-full bg-[#47352F] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#34241f] shadow-md"
          >
            <span>Explore Entire Collection ({products.length} Styles)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ----------------- Zepto/Blinkit Interactive Product Card ----------------- */

function ProductCard({
  product,
  index,
  onHover,
}: {
  product: Product;
  index: number;
  onHover: (v: boolean) => void;
}) {
  const { items, addToCart, updateQuantity } = useCart();

  // Check if item is already in cart to display interactive stepper
  const cartItem = items.find((i) => i.product.id === product.id);
  const cartQty = cartItem ? cartItem.quantity : 0;

  // Strikethrough & discount calculations
  const numericPrice = parseInt((product.price || "").replace(/[^0-9]/g, ""), 10) || 799;
  const originalNumericPrice = product.originalPrice
    ? parseInt(product.originalPrice.replace(/[^0-9]/g, ""), 10) || numericPrice + 300
    : numericPrice + 300;
  const discountPercent = Math.round(
    ((originalNumericPrice - numericPrice) / originalNumericPrice) * 100,
  );

  return (
    <Reveal delay={index * 0.03}>
      <div
        className="group relative flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#47352F]/40"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div>
          {/* Product Image Tile */}
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#f7f2eb]"
          >
            <img
              src={product.img}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Fast Dispatch Badge */}
            <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1 rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#221b18] shadow-xs backdrop-blur">
              <span className="text-amber-600">⚡</span>
              <span>24h Dispatch</span>
            </div>

            {/* Discount / Custom Badge */}
            {product.badge ? (
              <div className="absolute top-2.5 right-2.5 z-10 rounded-md bg-[#8A1822] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                {product.badge}
              </div>
            ) : discountPercent > 0 ? (
              <div className="absolute top-2.5 right-2.5 z-10 rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                {discountPercent}% OFF
              </div>
            ) : null}
          </Link>

          {/* Product Information */}
          <div className="mt-3">
            {/* Category / Department Tag */}
            <div className="flex items-center justify-between text-[11px] text-[#47352F]/80 font-semibold uppercase tracking-wider">
              <span>
                {product.department && product.subCategory
                  ? `${product.department} · ${product.subCategory}`
                  : product.category}
              </span>
              <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                <span>4.9</span>
              </span>
            </div>

            {/* Product Title */}
            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="mt-1 block hover:text-[#47352F]"
            >
              <h3 className="text-xs sm:text-sm font-semibold text-[#221b18] line-clamp-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Subtle Scripture or Fabric Note */}
            <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-1">
              {product.note || "100% Combed Cotton · Woven in Grace"}
            </p>
          </div>
        </div>

        {/* Price & Zepto-style + ADD / Quantity Stepper Button */}
        <div className="mt-3.5 flex items-center justify-between border-t border-black/5 pt-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-[#221b18]">{product.price}</span>
              <span className="text-xs text-muted-foreground line-through">
                ₹{originalNumericPrice}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-700">
              Save ₹{originalNumericPrice - numericPrice}
            </span>
          </div>

          {/* Interactive Stepper or + ADD Button */}
          {cartQty > 0 ? (
            <div
              className="flex items-center rounded-xl border-2 border-[#47352F] bg-[#fbf7f0] shadow-xs overflow-hidden"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    cartQty - 1,
                    cartItem?.selectedSize,
                    cartItem?.selectedColor,
                  )
                }
                className="h-8 w-8 flex items-center justify-center text-[#47352F] hover:bg-[#47352F]/10 font-bold text-sm transition"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="px-2 text-xs font-bold text-[#47352F] min-w-[20px] text-center">
                {cartQty}
              </span>
              <button
                type="button"
                onClick={() =>
                  updateQuantity(
                    product.id,
                    cartQty + 1,
                    cartItem?.selectedSize,
                    cartItem?.selectedColor,
                  )
                }
                className="h-8 w-8 flex items-center justify-center text-[#47352F] hover:bg-[#47352F]/10 font-bold text-sm transition"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product);
              }}
              className="inline-flex h-8 items-center gap-1 rounded-xl border border-[#47352F] bg-white px-3.5 text-xs font-bold uppercase tracking-wider text-[#47352F] hover:bg-[#47352F] hover:text-white transition shadow-2xs"
            >
              <span>+</span>
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ----------------- Verified Believer Reviews & Testimonials ----------------- */

function CustomerReviewsSection() {
  const reviews = [
    {
      name: "David M.",
      location: "Bengaluru, India",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      product: "Faith Over Fear Hoodie · Men / Black",
      rating: 5,
      date: "3 days ago",
      text: "The 380 GSM fleece is unbelievably soft and warm. Wore this to our church youth retreat and got so many compliments. Dispatched within 24 hours just like promised on the site!",
    },
    {
      name: "Sarah K.",
      location: "Mumbai, India",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      product: "Proverbs 31:25 Oversized Tee · Women / Cream",
      rating: 5,
      date: "5 days ago",
      text: "The Scripture print is crisp, and the combed cotton feels breathable even in humid weather. It’s rare to find Christian apparel this chic, comfortable, and well-tailored.",
    },
    {
      name: "Priya & Mathew R.",
      location: "Kochi, Kerala",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      product: "Nativity Peace Christmas Tee · Kids (6-7Y)",
      rating: 5,
      date: "1 week ago",
      text: "Ordered matching festive tees for our family Christmas photo. The kids loved how gentle the fabric was on their skin. Delivery was blazing fast!",
    },
    {
      name: "Joshua T.",
      location: "Chennai, India",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      product: "Lion of Judah Classic Polo · Men / Navy",
      rating: 5,
      date: "1 week ago",
      text: "Top tier collar fit and durable embroidery. Feels like luxury retail but with a message that reminds me who I walk with every day.",
    },
    {
      name: "Hannah G.",
      location: "Hyderabad, India",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      product: "Grace Upon Grace Drop-Shoulder Tee · Women / Sage",
      rating: 5,
      date: "2 weeks ago",
      text: "Customer care is so transparent and kind. The unboxing experience felt like opening a gift blessed with prayer. 10/10 recommend to all believers.",
    },
    {
      name: "Reuben P.",
      location: "Pune, India",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      product: "Light of the World Christmas Tee · Boys (8-9Y)",
      rating: 5,
      date: "2 weeks ago",
      text: "7-day replacement guarantee gave me total peace of mind. Arrived neatly folded with scripture tags. My son wears it every Sunday!",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f4ece1] border-y border-black/10">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        {/* Header & Metrics */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#47352F]">
                4.9 / 5.0 Rating · 12,500+ Verified Believers
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#221b18]">
              Loved by Believers Nationwide
            </h2>
            <p className="mt-2 text-sm text-[#47352F]/80 max-w-xl">
              Real reviews from believers who wear their testimony daily. 99.4% recommendation rate.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-xs border border-black/5 shrink-0">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-black">
                100% Verified Purchases
              </p>
              <p className="text-[11px] text-muted-foreground">Photos & reviews from real orders</p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6 shadow-xs hover:shadow-md transition"
            >
              <div>
                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{rev.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-[#221b18]/90 italic">
                  “{rev.text}”
                </p>

                {/* Product Tag */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#f7f2eb] px-2.5 py-1 text-[11px] font-semibold text-[#47352F]">
                  <span>🏷️</span>
                  <span>{rev.product}</span>
                </div>
              </div>

              {/* Reviewer Details */}
              <div className="mt-6 flex items-center gap-3 border-t border-black/5 pt-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="h-10 w-10 rounded-full object-cover border border-[#47352F]/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-[#221b18]">{rev.name}</p>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800">
                      ✓ Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- Faith Philosophy Editorial Banner ----------------- */

function FaithEditorialBanner({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section className="relative overflow-hidden bg-[#221b18] text-white py-20 md:py-32">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#E5CFAC] mb-4">
            † Faith Woven Into Fabric
          </p>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-normal leading-tight text-white max-w-4xl mx-auto">
            More than apparel,
            <br />
            <span className="italic text-[#E5CFAC]">a quiet daily testimony.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-white/80 leading-relaxed font-light">
            Every piece is designed with prayer, printed on ultra-soft combed cotton, and packaged
            with scripture cards to remind you and those around you of God's timeless grace.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#shop"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="inline-flex items-center gap-2 rounded-full bg-[#E5CFAC] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#221b18] hover:bg-white transition shadow-lg"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 transition"
            >
              <span>Read Our Testimony</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
