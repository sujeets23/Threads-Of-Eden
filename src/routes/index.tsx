import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/store";
import {
  ArrowRight,
  ChevronRight,
  ShoppingBag,
  Star,
  Sparkles,
  Filter,
  Check,
  RotateCcw,
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

  // Shared Category & Sub-Filter state for connected navigation
  const [selectedCat, setSelectedCat] = useState("All");
  const [christmasDept, setChristmasDept] = useState<"All" | "Men" | "Women" | "Kids">("All");
  const [christmasSub, setChristmasSub] = useState<string>("All");

  const handleSelectCategory = (
    cat: string,
    dept: "All" | "Men" | "Women" | "Kids" = "All",
    sub: string = "All",
  ) => {
    setSelectedCat(cat);
    setChristmasDept(dept);
    setChristmasSub(sub);
    const shopEl = document.getElementById("shop");
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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

      {/* Enhanced Categories Section */}
      <EnhancedCategoriesSection
        activeCategory={selectedCat}
        activeDept={christmasDept}
        activeSub={christmasSub}
        onSelectCategory={handleSelectCategory}
        onHover={setHover}
      />

      {/* Flash Sale / Christmas Deals Banner */}
      <FlashSaleBanner />

      {/* Quick-Commerce Product Shelves */}
      <ProductCatalogSection
        selectedCat={selectedCat}
        setSelectedCat={setSelectedCat}
        christmasDept={christmasDept}
        setChristmasDept={setChristmasDept}
        christmasSub={christmasSub}
        setChristmasSub={setChristmasSub}
        onHover={setHover}
      />

      {/* Faith Philosophy Editorial Banner (testimonials section removed) */}
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

/* ----------------- Enhanced Categories Section ----------------- */

interface CategoryCardItem {
  id: string;
  name: string;
  departmentLabel?: string;
  tag: string;
  tagBg: string;
  subtitle: string;
  img: string;
  targetCategory: string;
  targetDept?: "All" | "Men" | "Women" | "Kids";
  targetSub?: string;
  badge?: string;
}

function EnhancedCategoriesSection({
  activeCategory,
  activeDept,
  activeSub,
  onSelectCategory,
  onHover,
}: {
  activeCategory: string;
  activeDept: "All" | "Men" | "Women" | "Kids";
  activeSub: string;
  onSelectCategory: (
    cat: string,
    dept?: "All" | "Men" | "Women" | "Kids",
    sub?: string,
  ) => void;
  onHover: (v: boolean) => void;
}) {
  const { products } = useStore();
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<
    "All" | "Christmas" | "Men" | "Women" | "Kids"
  >("All");

  const categoriesList: CategoryCardItem[] = [
    {
      id: "cat-christmas",
      name: "Christmas Special Drops",
      departmentLabel: "Festive Collection",
      tag: "FLAT 25% OFF",
      tagBg: "bg-red-600",
      subtitle: "Men, Women & Kids Holiday Tees & Hoodies",
      img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "All",
      badge: "CODE: GRACE25",
    },
    {
      id: "cat-men-hoodies",
      name: "Men's Faith Hoodies",
      departmentLabel: "Men's Department",
      tag: "380 GSM FLEECE",
      tagBg: "bg-[#47352F]",
      subtitle: "Warm, heavyweight fleece with scripture",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "Men",
      targetSub: "Hoodies",
    },
    {
      id: "cat-polos",
      name: "Classic Polo T-Shirts",
      departmentLabel: "Men & Kids",
      tag: "PIQUÉ COTTON",
      tagBg: "bg-blue-700",
      subtitle: "Tailored ribbed collars & structured silhouette",
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Polo T-Shirts",
      targetDept: "All",
    },
    {
      id: "cat-oversized",
      name: "Heavyweight Oversized Tees",
      departmentLabel: "Streetwear Fit",
      tag: "240 GSM DROP",
      tagBg: "bg-amber-800",
      subtitle: "Relaxed drop-shoulder streetwear comfort",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Oversized T-Shirts",
      targetDept: "All",
    },
    {
      id: "cat-women-hoodies",
      name: "Women's Grace Hoodies",
      departmentLabel: "Women's Department",
      tag: "COZY LUXE",
      tagBg: "bg-purple-800",
      subtitle: "Flattering drape with uplifting faith quotes",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "Women",
      targetSub: "Hoodies",
    },
    {
      id: "cat-women-polos",
      name: "Women's Festive Polos",
      departmentLabel: "Women's Department",
      tag: "NEW DROP",
      tagBg: "bg-emerald-700",
      subtitle: "Pre-shrunk cotton piqué for casual Sundays",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "Women",
      targetSub: "Polo",
    },
    {
      id: "cat-round-neck",
      name: "Everyday Round Neck Tees",
      departmentLabel: "Daily Wear",
      tag: "100% COTTON",
      tagBg: "bg-[#47352F]",
      subtitle: "Breathable bio-washed cotton for daily rituals",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Round Neck T-Shirts",
      targetDept: "All",
    },
    {
      id: "cat-boys",
      name: "Boys' Adventure Tees",
      departmentLabel: "Kids (2-13Y)",
      tag: "PLAY-READY",
      tagBg: "bg-sky-700",
      subtitle: "Reinforced seams for play and Sunday school",
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "Kids",
      targetSub: "Boys",
    },
    {
      id: "cat-girls",
      name: "Girls' Cheerful Tees",
      departmentLabel: "Kids (2-13Y)",
      tag: "SOFT PASTELS",
      tagBg: "bg-pink-700",
      subtitle: "Gentle on skin with joyful holiday designs",
      img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&auto=format&fit=crop&q=80",
      targetCategory: "Christmas Edition T-Shirts",
      targetDept: "Kids",
      targetSub: "Girls",
    },
  ];

  // Helper to count available items per category card
  const getCategoryCount = (item: CategoryCardItem) => {
    return products.filter((p) => {
      const pCat = (p.category || "").toLowerCase();
      const targetCat = item.targetCategory.toLowerCase();
      const isXmasTarget = targetCat.includes("christmas");

      if (isXmasTarget) {
        if (!pCat.includes("christmas")) return false;
        if (item.targetDept && item.targetDept !== "All") {
          if (!p.department || p.department.toLowerCase() !== item.targetDept.toLowerCase()) {
            return false;
          }
        }
        if (item.targetSub && item.targetSub !== "All") {
          if (!p.subCategory || p.subCategory.toLowerCase() !== item.targetSub.toLowerCase()) {
            return false;
          }
        }
        return true;
      }
      return pCat === targetCat;
    }).length;
  };

  // Filter category cards based on selected department pill
  const filteredCategories = useMemo(() => {
    if (selectedDeptFilter === "All") return categoriesList;
    if (selectedDeptFilter === "Christmas") {
      return categoriesList.filter((c) => c.targetCategory.toLowerCase().includes("christmas"));
    }
    if (selectedDeptFilter === "Men") {
      return categoriesList.filter(
        (c) =>
          c.targetDept === "Men" ||
          c.name.toLowerCase().includes("men") ||
          c.targetCategory.toLowerCase().includes("polo") ||
          c.targetCategory.toLowerCase().includes("oversized"),
      );
    }
    if (selectedDeptFilter === "Women") {
      return categoriesList.filter(
        (c) =>
          c.targetDept === "Women" ||
          c.name.toLowerCase().includes("women") ||
          c.targetCategory.toLowerCase().includes("round neck"),
      );
    }
    if (selectedDeptFilter === "Kids") {
      return categoriesList.filter(
        (c) =>
          c.targetDept === "Kids" ||
          c.name.toLowerCase().includes("boys") ||
          c.name.toLowerCase().includes("girls") ||
          c.targetCategory.toLowerCase().includes("polo"),
      );
    }
    return categoriesList;
  }, [selectedDeptFilter]);

  // Quick 1-tap horizontal bubble list
  const quickBubbles = [
    {
      name: "Christmas Special",
      tag: "25% OFF",
      bg: "bg-red-600",
      img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "All" as const,
      sub: "All",
    },
    {
      name: "Men's Hoodies",
      tag: "HOT",
      bg: "bg-[#47352F]",
      img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "Men" as const,
      sub: "Hoodies",
    },
    {
      name: "Men's Polos",
      tag: "CLASSIC",
      bg: "bg-blue-700",
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&auto=format&fit=crop&q=80",
      cat: "Polo T-Shirts",
      dept: "All" as const,
      sub: "All",
    },
    {
      name: "Oversized Fits",
      tag: "240 GSM",
      bg: "bg-amber-800",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&auto=format&fit=crop&q=80",
      cat: "Oversized T-Shirts",
      dept: "All" as const,
      sub: "All",
    },
    {
      name: "Women's Hoodies",
      tag: "COZY",
      bg: "bg-purple-700",
      img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "Women" as const,
      sub: "Hoodies",
    },
    {
      name: "Women's Polos",
      tag: "ELEGANT",
      bg: "bg-emerald-700",
      img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "Women" as const,
      sub: "Polo",
    },
    {
      name: "Boys' Tees",
      tag: "PLAY",
      bg: "bg-sky-600",
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "Kids" as const,
      sub: "Boys",
    },
    {
      name: "Girls' Tees",
      tag: "CUTE",
      bg: "bg-pink-600",
      img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=200&auto=format&fit=crop&q=80",
      cat: "Christmas Edition T-Shirts",
      dept: "Kids" as const,
      sub: "Girls",
    },
    {
      name: "Round Necks",
      tag: "DAILY",
      bg: "bg-[#47352F]",
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&auto=format&fit=crop&q=80",
      cat: "Round Neck T-Shirts",
      dept: "All" as const,
      sub: "All",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-[#fbf7f0] border-b border-black/10">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 border-b border-black/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-600">⚡</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#47352F]">
                24-Hour Express Dispatch · Instant Categorized Browse
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#221b18] tracking-tight">
              Explore Collections & Categories
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#47352F]/80 max-w-2xl leading-relaxed">
              Tap any category to filter our catalog instantly. Woven from 100% combed cotton,
              pre-shrunk fleece, and premium piqué knit.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#47352F] hover:underline shrink-0"
          >
            <span>View Full Shop ({products.length} Items)</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Quick-Commerce Horizontal 1-Tap Pill Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#47352F]/70">
              Quick 1-Tap Browse:
            </span>
            <span className="text-[11px] text-[#47352F]/60">Swipe horizontally ➔</span>
          </div>

          <div className="flex items-start gap-3.5 sm:gap-5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
            {quickBubbles.map((bubble, idx) => {
              const isXmasTarget = bubble.cat.toLowerCase().includes("christmas");
              const isCurrentActive =
                isXmasTarget && activeCategory.toLowerCase().includes("christmas")
                  ? (bubble.dept === "All" || activeDept === bubble.dept) &&
                    (bubble.sub === "All" || activeSub === bubble.sub)
                  : activeCategory.toLowerCase() === bubble.cat.toLowerCase();

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectCategory(bubble.cat, bubble.dept, bubble.sub)}
                  className={`flex flex-col items-center shrink-0 w-20 sm:w-24 group text-center cursor-pointer transition-all ${
                    isCurrentActive ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden border-2 shadow-xs bg-white transition-all duration-300 ${
                      isCurrentActive
                        ? "border-[#47352F] ring-2 ring-[#47352F]/30 shadow-md"
                        : "border-black/10 group-hover:border-[#47352F]"
                    }`}
                  >
                    <img src={bubble.img} alt={bubble.name} className="h-full w-full object-cover" />
                    <span
                      className={`absolute top-1 left-1/2 -translate-x-1/2 ${bubble.bg} text-[9px] font-bold uppercase tracking-wider text-white px-1.5 py-0.5 rounded-full whitespace-nowrap shadow-xs`}
                    >
                      {bubble.tag}
                    </span>
                  </div>
                  <span
                    className={`mt-2 text-xs font-bold transition-colors leading-tight line-clamp-2 ${
                      isCurrentActive
                        ? "text-[#47352F] underline"
                        : "text-[#221b18] group-hover:text-[#47352F]"
                    }`}
                  >
                    {bubble.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-black/10 pb-4">
          <span className="text-xs font-bold text-[#47352F] uppercase tracking-wider mr-2">
            Filter View:
          </span>
          {(
            [
              { id: "All", label: "🌟 All Categories" },
              { id: "Christmas", label: "🎄 Christmas Special (25% OFF)" },
              { id: "Men", label: "👔 Men's Collection" },
              { id: "Women", label: "👗 Women's Grace" },
              { id: "Kids", label: "👶 Kids' Playwear" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedDeptFilter(tab.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                selectedDeptFilter === tab.id
                  ? "bg-[#47352F] text-white shadow-xs"
                  : "border border-black/10 bg-white text-black/75 hover:border-[#47352F]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Enhanced Visual Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredCategories.map((card, idx) => {
            const count = getCategoryCount(card);
            const isXmasTarget = card.targetCategory.toLowerCase().includes("christmas");
            const isCardActive =
              isXmasTarget && activeCategory.toLowerCase().includes("christmas")
                ? (card.targetDept === "All" || activeDept === card.targetDept) &&
                  (!card.targetSub || card.targetSub === "All" || activeSub === card.targetSub)
                : activeCategory.toLowerCase() === card.targetCategory.toLowerCase();

            return (
              <Reveal key={card.id} delay={idx * 0.04}>
                <div
                  onClick={() =>
                    onSelectCategory(card.targetCategory, card.targetDept || "All", card.targetSub || "All")
                  }
                  onMouseEnter={() => onHover(true)}
                  onMouseLeave={() => onHover(false)}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    isCardActive
                      ? "border-[#47352F] ring-2 ring-[#47352F]/40 shadow-md bg-[#fcf9f4]"
                      : "border-black/10 hover:border-[#47352F]/60"
                  }`}
                >
                  {/* Top Image Showcase */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7f2eb]">
                    <img
                      src={card.img}
                      alt={card.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                    {/* Tag Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span
                        className={`rounded-md ${card.tagBg} px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs`}
                      >
                        {card.tag}
                      </span>
                      {card.badge && (
                        <span className="rounded-md bg-amber-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#221b18] shadow-xs">
                          {card.badge}
                        </span>
                      )}
                    </div>

                    {/* Live Count Pill */}
                    <div className="absolute bottom-3 left-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#221b18] shadow-xs backdrop-blur flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>{count > 0 ? `${count} Styles Available` : "Curated Drops"}</span>
                    </div>

                    {isCardActive && (
                      <div className="absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[#47352F] text-white shadow-sm">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Card Body Information */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <div>
                      {card.departmentLabel && (
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#47352F]">
                          {card.departmentLabel}
                        </p>
                      )}
                      <h3 className="mt-1 text-base sm:text-lg font-bold text-[#221b18] group-hover:text-[#47352F] transition-colors leading-snug">
                        {card.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#47352F]/75 leading-relaxed line-clamp-2">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#47352F] flex items-center gap-1 group-hover:underline">
                        <span>{isCardActive ? "Selected" : "Filter Catalog"}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="text-[11px] font-medium text-muted-foreground">
                        24h Dispatch
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
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

function ProductCatalogSection({
  selectedCat,
  setSelectedCat,
  christmasDept,
  setChristmasDept,
  christmasSub,
  setChristmasSub,
  onHover,
}: {
  selectedCat: string;
  setSelectedCat: (cat: string) => void;
  christmasDept: "All" | "Men" | "Women" | "Kids";
  setChristmasDept: (dept: "All" | "Men" | "Women" | "Kids") => void;
  christmasSub: string;
  setChristmasSub: (sub: string) => void;
  onHover: (v: boolean) => void;
}) {
  const { products, categories } = useStore();

  const isChristmas = (selectedCat || "").toLowerCase().includes("christmas");

  const handleCategorySelect = (cat: string) => {
    setSelectedCat(cat);
    if (!cat.toLowerCase().includes("christmas")) {
      setChristmasDept("All");
      setChristmasSub("All");
    }
  };

  const handleResetFilters = () => {
    setSelectedCat("All");
    setChristmasDept("All");
    setChristmasSub("All");
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

  const hasActiveFilters =
    selectedCat !== "All" || christmasDept !== "All" || christmasSub !== "All";

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
          <div className="flex flex-wrap items-center gap-2">
            {categories.slice(0, 6).map((cat) => {
              const isXmas = (cat || "").toLowerCase().includes("christmas");
              const isCurrent = selectedCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    isCurrent
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

        {/* Active Filter Indicator Banner if any filter is set */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#47352F]/20 bg-white px-4 py-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#221b18]">
              <Filter className="h-4 w-4 text-[#47352F]" />
              <span>Active Filter:</span>
              <span className="rounded-md bg-[#47352F]/10 px-2 py-0.5 font-bold text-[#47352F]">
                {selectedCat}
              </span>
              {christmasDept !== "All" && (
                <span className="rounded-md bg-[#8A1822]/10 px-2 py-0.5 font-bold text-[#8A1822]">
                  {christmasDept}
                </span>
              )}
              {christmasSub !== "All" && (
                <span className="rounded-md bg-[#8A1822]/10 px-2 py-0.5 font-bold text-[#8A1822]">
                  {christmasSub}
                </span>
              )}
              <span className="text-muted-foreground">({filtered.length} Styles found)</span>
            </div>

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#8A1822] hover:underline"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset to All Styles</span>
            </button>
          </div>
        )}

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
                  Reset Sub-Filters
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
