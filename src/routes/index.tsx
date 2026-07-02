import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import heroBottle from "@/assets/hero-bottle.jpg";
import ingredients from "@/assets/ingredients.jpg";
import aboutImg from "@/assets/about.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import featuredImg from "@/assets/featured.jpg";
import aroviaLogoText from "@/assets/Images/arovia logo with text.png";
import aroviaLogo from "@/assets/Images/arovia logo.png";
import { PRODUCTS as SHOP_PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arovia Essentials — Nature Distilled, Luxury Refined" },
      { name: "description", content: "Botanical skincare crafted from rare, cold-pressed ingredients. Discover editorial rituals for the modern connoisseur." },
      { property: "og:title", content: "Arovia Essentials" },
      { property: "og:description", content: "Nature distilled. Luxury refined." },
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
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
}

function useCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return { sx, sy };
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------- Page ------------------------------- */

function HomePage() {
  useLenis();
  const { sx, sy } = useCursor();
  const [hover, setHover] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground grain overflow-x-clip">
      {/* Cursor glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{
          x: sx, y: sy, translateX: "-50%", translateY: "-50%",
          width: hover ? 60 : 14, height: hover ? 60 : 14,
          transition: "width 500ms cubic-bezier(.16,1,.3,1), height 500ms cubic-bezier(.16,1,.3,1)",
          background: "radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%)",
          borderRadius: 999,
          mixBlendMode: "normal",
        }}
      />

      <Nav />

      <Hero onHover={setHover} />
      <Marquee />
      <ShowcaseSection onHover={setHover} />
      <IngredientStory />
      <WhySection />
      <Collections onHover={setHover} />
      <FeaturedProduct onHover={setHover} />
      <Testimonials />
      <AboutSection />
      <CTASection onHover={setHover} />
      <Footer />
    </div>
  );
}

/* ------------------------------- Nav ------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Ingredients", href: "#ingredients" },
    { label: "Ritual", href: "#ritual" },
    { label: "Collections", href: "#journal" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 border-b border-black/5 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-12 md:py-5">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 z-10">
            <img src={aroviaLogo} alt="" className="h-8 w-8" style={{ filter: "brightness(0)" }} />
            <span className="text-lg font-medium tracking-[-0.02em]">
              Arovia<span className="text-[#2C5D2E]"> Essentials</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[13px] font-medium uppercase tracking-[0.12em] text-black/50 transition-colors duration-300 hover:text-[#2C5D2E] after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-[#2C5D2E] after:transition-all after:duration-500 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-5 lg:flex">
            <button className="text-[13px] font-medium uppercase tracking-[0.12em] text-black/50 transition-colors hover:text-[#2C5D2E]" aria-label="Search">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className="relative text-[13px] font-medium uppercase tracking-[0.12em] text-black/50 transition-colors hover:text-[#2C5D2E]" aria-label="Shopping bag">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2C5D2E] text-[9px] font-bold text-white">0</span>
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1.5px] w-6 bg-current"
              animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[1.5px] w-6 bg-current"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[1.5px] w-6 bg-current"
              animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-40 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-8 pt-24 pb-8">
              {/* Nav Links */}
              <nav className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-black/5 py-4 text-lg font-medium tracking-[-0.01em] text-black/80 transition-colors active:text-[#2C5D2E]"
                  >
                    {link.label}
                    <svg className="h-4 w-4 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-10 space-y-4">
                <a href="#" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2C5D2E] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  Shopping Bag (0)
                </a>
                <button className="flex w-full items-center justify-center gap-2 rounded-full border border-black/10 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.1em] text-black/60">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  Search
                </button>
              </div>

              {/* Mobile Footer */}
              <div className="mt-12 border-t border-black/5 pt-6">
                <div className="flex items-center gap-2">
                  <img src={aroviaLogo} alt="" className="h-6 w-6 opacity-30" style={{ filter: "brightness(0)" }} />
                  <span className="text-xs text-black/30">Dubai · Bangalore</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero({ onHover }: { onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] overflow-hidden pb-20 md:min-h-screen md:pb-28"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBottle}
          alt="Arovia radiance serum on marble with botanical shadows"
          width={1600}
          height={1920}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      <div className="absolute inset-0 bg-black/20 md:bg-black/10" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pt-24 md:px-12 md:pt-32">
        <div className="max-w-[92vw] sm:max-w-[80vw] md:max-w-3xl">
          <Reveal delay={0.2}>
            <p className="eyebrow mb-4 md:mb-6">Signature Collection — N°01</p>
          </Reveal>
          <h1 className="font-display text-[14vw] leading-[0.95] tracking-[-0.04em] sm:text-[12vw] md:text-[8vw]">
            <AnimatedWords text="Nature," />
            <br />
            <AnimatedWords text="distilled" delay={0.6} className="italic text-[#2C5D2E]/95" />
          </h1>
          <Reveal delay={0.9} className="mt-8 max-w-xl">
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              A luminous first impression for a premium ritual brand — centered
              on a single image, a refined headline and a calm, elegant mood.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Reveal delay={1.1}>
              <a
                href="/shop"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="btn-luxe w-full sm:w-auto"
              >
                Discover the Ritual
                <span aria-hidden>→</span>
              </a>
            </Reveal>
            <Reveal delay={1.3}>
              <a
                href="/shop"
                className="w-full sm:w-auto rounded-full border border-[#2C5D2E] px-6 py-3 text-center text-sm font-medium uppercase tracking-[0.15em] text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
              >
                View the Collection
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="eyebrow">Scroll</span>
          <motion.div
            className="h-8 w-px bg-foreground/40"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedWords({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={`inline-block overflow-hidden align-bottom ${className}`}>
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 + delay }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ------------------------------- Marquee ------------------------------- */

function Marquee() {
  const items = ["Cold-pressed", "Vegan formulated", "Cruelty free", "Small batch", "Recyclable glass", "Kyoto — Grasse — Provence"];
  return (
    <section className="border-y border-border/60 bg-[#fafafa] py-6 overflow-hidden">
      <div className="mx-auto flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-6 eyebrow flex items-center gap-6 md:mx-10 md:gap-10">
            {it}
            <span className="inline-block h-1 w-1 rounded-full bg-black/30" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Showcase ------------------------------- */

const PRODUCTS = SHOP_PRODUCTS;

function ShowcaseSection({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section id="shop" className="relative py-20 md:py-48">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-10 flex items-end justify-between md:mb-24">
          <Reveal>
            <p className="eyebrow mb-4 md:mb-6">Skincare Collection</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-7xl">
              Premium<br /><span className="italic text-[#2C5D2E]/80">botanicals.</span>
            </h2>
          </Reveal>
          <Reveal className="hidden md:block">
            <a href="/shop" className="eyebrow hover:text-[#2C5D2E] transition-colors">View all products →</a>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-x-8 md:gap-y-20">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} onHover={onHover} />
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 text-center md:hidden">
          <a href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#2C5D2E] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white">
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, onHover }: { product: typeof PRODUCTS[number]; index: number; onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <Reveal delay={index * 0.08}>
      <div
        ref={ref}
        className="group cursor-pointer"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary md:aspect-[4/5] md:rounded-none">
          <motion.img
            src={product.img}
            alt={product.name}
            width={800}
            height={1000}
            loading="lazy"
            style={{ y }}
            className="h-[110%] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          {/* Desktop hover overlay */}
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-between bg-[#2C5D2E]/95 px-6 py-4 text-white transition-transform duration-700 ease-out group-hover:translate-y-0 md:flex">
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Add to bag</span>
            <span aria-hidden>→</span>
          </div>
          {/* Mobile quick-add */}
          <button className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C5D2E] text-white shadow-lg md:hidden" aria-label="Add to bag">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <div className="mt-3 md:mt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2C5D2E] md:text-xs">{product.category}</p>
          <h3 className="mt-1 text-sm font-medium leading-snug md:text-xl md:font-light">{product.name}</h3>
          <p className="mt-0.5 hidden text-sm text-muted-foreground md:block">{product.note}</p>
          <p className="mt-1 text-sm font-semibold md:mt-2 md:text-lg md:font-light">{product.price}</p>
          <div className="mt-4">
            <a
              href={`/product/${product.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#2C5D2E] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
            >
              View details
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------- Ingredient Story ------------------------------- */

function IngredientStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const ingredientsList = [
    { name: "Aloe Vera", latin: "Aloe barbadensis", note: "Hydrating cell renewal" },
    { name: "Moringa", latin: "Moringa oleifera", note: "Antioxidant clarity" },
    { name: "Turmeric", latin: "Curcuma longa", note: "Illuminating warmth" },
    { name: "Damask Rose", latin: "Rosa damascena", note: "Elemental softness" },
    { name: "Essential Oils", latin: "Cold-pressed", note: "Aromatic ritual" },
  ];

  // parallax bottle
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="ingredients" ref={ref} className="relative overflow-hidden bg-secondary py-20 md:py-48">
      {/* Floating botanicals */}
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-sage/30 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
        className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-4 md:grid-cols-12 md:gap-16 md:px-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">Origin — The Living Formula</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-6xl">
              Every drop, a<br />
              <span className="italic text-[#2C5D2E]">quiet biography</span><br />
              of the earth.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground">
              Sourced from single-origin harvests and cold-pressed within
              seventy-two hours, our ingredients arrive at your skin as they
              left the field — alive, intact, unrepeatable.
            </p>
          </Reveal>

          <div className="mt-14 space-y-0">
            {ingredientsList.map((ing, i) => (
              <IngredientRow key={ing.name} ing={ing} index={i} />
            ))}
          </div>
        </div>

        <div className="relative md:col-span-7">
          <motion.div style={{ y: imgY }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={ingredients}
                alt="Aloe vera, moringa, rose petals and turmeric on cream linen"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden bg-white p-8 shadow-2xl md:block">
              <p className="eyebrow mb-2">Traceability</p>
              <p className="font-display text-3xl">100%</p>
              <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">
                Every ingredient traceable to a single farm, harvest and season.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IngredientRow({ ing, index }: { ing: { name: string; latin: string; note: string }; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-3 items-baseline gap-2 border-t border-border/60 py-4 md:grid-cols-12 md:gap-4 md:py-6"
    >
      <span className="col-span-1 text-[10px] text-muted-foreground md:font-mono md:text-xs">0{index + 1}</span>
      <span className="col-span-1 text-base font-medium md:col-span-4 md:font-display md:text-2xl">{ing.name}</span>
      <span className="col-span-4 hidden text-sm italic text-muted-foreground md:block">{ing.latin}</span>
      <span className="col-span-1 text-xs text-muted-foreground md:col-span-3">{ing.note}</span>
    </motion.div>
  );
}

/* ------------------------------- Why Arovia ------------------------------- */

const WHY = [
  { n: "01", t: "Slow Craft", d: "Formulated over months, not weeks. Each batch matures before it meets your skin." },
  { n: "02", t: "Rare Botanicals", d: "Wild-harvested and single-origin ingredients selected for their integrity." },
  { n: "03", t: "Quiet Efficacy", d: "Clinically studied actives, delivered without noise or unnecessary claim." },
  { n: "04", t: "Circular Design", d: "Refillable vessels, recycled glass, carbon-conscious shipping." },
];

function WhySection() {
  return (
    <section id="ritual" className="py-20 md:py-48">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">Why Arovia</p>
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              Four principles.<br />
              <span className="italic text-[#2C5D2E]">One quiet philosophy.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 md:gap-x-12 md:gap-y-16">
          {WHY.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.1}>
              <div className="group">
                <p className="font-mono text-xs text-muted-foreground">— {w.n}</p>
                <h3 className="mt-4 font-display text-xl transition-transform duration-700 group-hover:-translate-y-1 md:mt-6 md:text-3xl">{w.t}</h3>
                <div className="my-6 h-px w-12 bg-[#2C5D2E]/60 transition-all duration-700 group-hover:w-24" />
                <p className="text-sm leading-relaxed text-muted-foreground">{w.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Editorial Collections ------------------------------- */

function Collections({ onHover }: { onHover: (v: boolean) => void }) {
  const items = [
    { img: collection1, title: "The Sage Chapter", tag: "Restorative", size: "large" },
    { img: collection2, title: "Dew Study", tag: "Hydration", size: "small" },
    { img: collection3, title: "Golden Silk", tag: "Illumination", size: "medium" },
  ];
  return (
    <section id="journal" className="bg-[#1a2e1b] py-32 text-white md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <Reveal>
            <p className="eyebrow" style={{ color: "#CFF57C" }}>Chapters</p>
            <h2 className="mt-6 font-display text-5xl leading-[1] md:text-7xl">
              Editorial<br /><span className="italic text-[#CFF57C]">collections.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          <EditorialCard item={items[0]} className="md:col-span-7 md:aspect-[4/5]" onHover={onHover} />
          <EditorialCard item={items[1]} className="md:col-span-5 md:mt-32 md:aspect-[3/4]" onHover={onHover} />
          <EditorialCard item={items[2]} className="md:col-span-12 md:aspect-[16/8]" onHover={onHover} />
        </div>
      </div>
    </section>
  );
}

function EditorialCard({ item, className = "", onHover }: { item: { img: string; title: string; tag: string }; className?: string; onHover: (v: boolean) => void }) {
  return (
    <Reveal className={className}>
      <div
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        className="group relative h-full w-full cursor-pointer overflow-hidden"
      >
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1b]/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <p className="eyebrow mb-3 text-[#CFF57C]">{item.tag}</p>
          <h3 className="font-display text-3xl md:text-5xl">{item.title}</h3>
          <div className="mt-6 flex translate-y-4 items-center gap-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="eyebrow text-white">Read chapter</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------- Featured Product ------------------------------- */

function FeaturedProduct({ onHover }: { onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Interactive rotate on drag
  const dragX = useMotionValue(0);
  const dragRot = useTransform(dragX, [-200, 200], [-30, 30]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-20 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="relative order-2 md:order-1">
          <Reveal>
            <p className="eyebrow mb-6">Featured — N°01</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-7xl">
              Radiance,<br /><span className="italic text-[#2C5D2E]">refracted.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 max-w-md">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              A cold-infused elixir of moringa, sea buckthorn and rare Bulgarian
              rose. Twenty-eight days of maturation. One weightless dropper of
              luminous, self-renewing skin.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12">
            <div className="flex items-center gap-8">
              <p className="font-display text-2xl md:text-3xl">₹3,499</p>
              <a
                href="#"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="btn-luxe"
              >
                Acquire
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.45} className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 md:mt-16 md:gap-8 md:pt-10">
            {[["30ml", "Volume"], ["28d", "Maturation"], ["12", "Botanicals"]].map(([v, l]) => (
              <div key={l as string}>
                <p className="font-display text-2xl">{v}</p>
                <p className="eyebrow mt-2">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative order-1 md:order-2">
          <motion.div
            aria-hidden
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
            className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-black/5 blur-3xl"
          />
          <motion.div
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.2}
            style={{ x: dragX, rotate: dragRot, y }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="relative mx-auto aspect-[7/8] max-w-md cursor-grab overflow-hidden active:cursor-grabbing"
          >
            <motion.img
              src={featuredImg}
              alt="Golden radiance serum with soft golden particles"
              width={1400}
              height={1600}
              loading="lazy"
              style={{ rotate }}
              className="h-full w-full object-cover"
            />
          </motion.div>
          <p className="mt-6 text-center eyebrow">Drag to rotate ↔</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------- */

const QUOTES = [
  { q: "A rare thing — skincare that behaves like ritual, not routine.", a: "Vogue Beauty" },
  { q: "The most quietly powerful serum I have used in a decade.", a: "Camille R., Paris" },
  { q: "Arovia does not shout. It simply, patiently, transforms.", a: "Harper's Bazaar" },
];

function Testimonials() {
  return (
    <section className="relative bg-secondary py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6">Words on Arovia</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {QUOTES.map((q, i) => (
            <Reveal key={q.a} delay={i * 0.15}>
              <div className="relative h-full rounded-lg border border-black/10 bg-white p-6 shadow-sm backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-md md:rounded-sm md:p-10">
                <p className="font-display text-lg leading-snug md:text-3xl">"{q.q}"</p>
                <div className="mt-10 flex items-center gap-4">
                  <span className="h-px w-8 bg-forest" />
                  <p className="eyebrow">{q.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- About ------------------------------- */

function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <section id="boutique" ref={ref} className="py-32 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={aboutImg}
              alt="Hands cradling a golden oil bottle and sage sprig"
              width={1400}
              height={1750}
              loading="lazy"
              style={{ y: imgY, scale: 1.15 }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-6 md:pl-8">
          <Reveal>
            <p className="eyebrow mb-6">The House of Arovia</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl leading-[1] md:text-6xl">
              Founded on the belief<br />
              that <span className="italic text-forest">restraint</span><br />
              is the highest luxury.
            </h2>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 max-w-md space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              From a small atelier between Kyoto and Grasse, Arovia composes
              skincare the way a perfumer composes a fragrance — with patience,
              intention, and an unwavering respect for the ingredient.
            </p>
            <p>
              We release two collections a year. We refuse anything less than
              essential. What remains is offered here, quietly.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-12">
            <a href="/about" className="btn-luxe text-foreground">Our story</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */

function CTASection({ onHover }: { onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bottleY = useTransform(scrollYProgress, [0, 1], ["60%", "-20%"]);
  const bottleScale = useTransform(scrollYProgress, [0, 1], [0.7, 1.1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#2C5D2E] text-white">
      {/* Rising bottle */}
      <motion.img
        aria-hidden
        src={heroBottle}
        alt=""
        style={{ y: bottleY, scale: bottleScale }}
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-[120vh] w-auto opacity-25 mix-blend-luminosity"
      />
      {/* Gold particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/30"
          style={{
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 6 + (i % 5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-[1600px] px-4 py-28 text-center md:px-12 md:py-56">
        <Reveal>
          <p className="eyebrow mb-8 text-[#CFF57C]">Begin the ritual</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mx-auto max-w-4xl font-display text-4xl leading-[1.05] md:text-8xl">
            Slow beauty,<br />
            <span className="italic text-[#CFF57C]">quietly obtained.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3} className="mt-14">
          <a
            href="#"
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="btn-luxe-inverse"
          >
            Enter the Boutique
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Footer ------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#1a2e1b] text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10 bg-[#2C5D2E]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between md:px-12">
          <div className="text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#CFF57C]">Stay Connected</p>
            <p className="mt-3 text-2xl font-light tracking-[-0.02em]">Be the first to discover new arrivals & rituals</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-0 overflow-hidden rounded-full border border-white/20"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-3.5 text-sm placeholder:text-white/40 focus:outline-none"
            />
            <button className="bg-[#CFF57C] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a2e1b] transition-opacity hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <img
              src={aroviaLogoText}
              alt="Arovia Essentials"
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Arovia Essentials is a premium botanical skincare brand crafting
              nature-inspired formulations. Founded with a passion for purity and
              sustainability, we blend rare botanicals into rituals that honour
              both your skin and the earth.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <img src={aroviaLogo} alt="Arovia" className="h-8 w-8 opacity-60" />
              <span className="text-xs text-white/30">Crafted with intention since 2024</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Shop</p>
            <ul className="space-y-3.5 text-sm">
              {["All Products", "Serums", "Facial Oils", "Cleansers", "Balms", "Gift Sets", "New Arrivals", "Best Sellers"].map((li) => (
                <li key={li}>
                  <a href="#" className="text-white/55 transition-colors hover:text-[#CFF57C]">{li}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Company</p>
            <ul className="space-y-3.5 text-sm">
              {["About Us", "Our Story", "Ingredients", "Sustainability", "Press & Media", "Careers", "Blog / Journal"].map((li) => (
                <li key={li}>
                  <a href="#" className="text-white/55 transition-colors hover:text-[#CFF57C]">{li}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Support</p>
            <ul className="space-y-3.5 text-sm">
              {["Contact Us", "Shipping Info", "Returns & Exchanges", "Order Tracking", "FAQ", "Ritual Guide", "Size Guide"].map((li) => (
                <li key={li}>
                  <a href="#" className="text-white/55 transition-colors hover:text-[#CFF57C]">{li}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Legal</p>
            <ul className="space-y-3.5 text-sm">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((li) => (
                <li key={li}>
                  <a href="#" className="text-white/55 transition-colors hover:text-[#CFF57C]">{li}</a>
                </li>
              ))}
            </ul>

            <p className="mb-6 mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Follow Us</p>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Twitter">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Our Offices</p>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dubai Office */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Dubai, United Arab Emirates</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  Business Bay, Dubai<br />
                  United Arab Emirates
                </p>
                <a href="mailto:dubai@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  dubai@aroviaessentials.com
                </a>
              </div>
            </div>
            {/* Bangalore Office */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Bangalore, India</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  Karnataka, India
                </p>
                <a href="mailto:india@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  india@aroviaessentials.com
                </a>
              </div>
            </div>
            {/* General Contact */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">General Enquiries</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  For partnerships, wholesale,<br />
                  and media enquiries
                </p>
                <a href="mailto:hello@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  hello@aroviaessentials.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges & Payment */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {["🌿 100% Vegan", "🐰 Cruelty Free", "♻️ Sustainable Packaging", "🧪 Dermatologically Tested", "🌍 Carbon Neutral Shipping"].map((badge) => (
                <span key={badge} className="text-xs text-white/40">{badge}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">We accept</span>
              {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((pm) => (
                <span key={pm} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/40">{pm}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={aroviaLogo} alt="Arovia" className="h-5 w-5 opacity-40" />
            <p className="text-xs tracking-wide text-white/30">© 2026 Arovia Essentials — All rights reserved</p>
          </div>
          <p className="text-xs tracking-wide text-white/25">Dubai, UAE · Bangalore, India</p>
        </div>

        {/* Oversized wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.04, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 select-none text-center text-[16vw] font-extralight leading-none tracking-[-0.06em] text-[#CFF57C]"
        >
          Arovia
        </motion.p>
      </div>
    </footer>
  );
}
