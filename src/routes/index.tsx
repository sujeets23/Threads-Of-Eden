import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import heroBottle from "@/assets/hero-bottle.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import ingredients from "@/assets/ingredients.jpg";
import aboutImg from "@/assets/about.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import featuredImg from "@/assets/featured.jpg";

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
          background: "radial-gradient(circle, oklch(0.76 0.12 82 / 0.55), transparent 70%)",
          borderRadius: 999,
          mixBlendMode: "multiply",
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
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "backdrop-blur-md bg-background/70 border-b border-border/50" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#" className="font-display text-xl tracking-tight">Arovia<span className="text-forest"> Essentials</span></a>
        <nav className="hidden gap-10 md:flex">
          {["Collections", "Ingredients", "Ritual", "Journal", "Boutique"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="eyebrow hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <button className="eyebrow hover:text-foreground transition-colors">Search</button>
          <button className="eyebrow hover:text-foreground transition-colors">Bag (0)</button>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero({ onHover }: { onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 20 });
  const py = useSpring(my, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * 40);
        my.set(((e.clientY - r.top) / r.height - 0.5) * 40);
      }}
      className="relative flex min-h-screen items-end overflow-hidden pb-20 md:pb-32"
    >
      {/* Bottle image with parallax + scale */}
      <motion.div
        className="absolute inset-0"
        style={{ y, scale, opacity }}
      >
        <motion.img
          src={heroBottle}
          alt="Arovia radiance serum on marble with botanical shadows"
          width={1600}
          height={1920}
          style={{ x: px, y: py }}
          className="h-full w-full object-cover animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/80" />
      </motion.div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.4 }}
        className="absolute left-6 right-6 top-24 flex items-center justify-between md:left-12 md:right-12 md:top-28"
      >
        <p className="eyebrow">Est. Kyoto · MMXXIV</p>
        <p className="eyebrow hidden md:block">Chapter 01 — The Botanical Ritual</p>
      </motion.div>

      {/* Headline */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12">
        <div className="max-w-4xl">
          <Reveal delay={0.2}>
            <p className="eyebrow mb-8">Signature Collection — N°01</p>
          </Reveal>
          <h1 className="font-display text-[13vw] leading-[0.9] tracking-[-0.03em] md:text-[8.5vw]">
            <AnimatedWords text="Nature," />
            <br />
            <AnimatedWords text="distilled" delay={0.6} className="italic text-forest/80" />
          </h1>
          <div className="mt-10 flex flex-col items-start gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <Reveal delay={0.9} className="max-w-md">
              <p className="text-base leading-relaxed text-muted-foreground">
                A quiet study of botanical intelligence — rare oils, slow-pressed
                and blended in small batches for skin that remembers its origin.
              </p>
            </Reveal>
            <Reveal delay={1.1}>
              <a
                href="#collections"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="btn-luxe text-foreground"
              >
                Discover the Ritual
                <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow">Scroll</span>
          <motion.div
            className="h-10 w-px bg-foreground/40"
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
    <section className="border-y border-border/60 bg-cream/60 py-6 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-10 eyebrow flex items-center gap-10">
            {it}
            <span className="inline-block h-1 w-1 rounded-full bg-forest/60" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Showcase ------------------------------- */

const PRODUCTS = [
  { name: "Radiance Renewal Serum", img: product1, category: "Serum", price: "€184", note: "N°01 — Aloe · Moringa" },
  { name: "Essence de Vert", img: product2, category: "Facial Oil", price: "€148", note: "N°02 — Sage · Camellia" },
  { name: "Velvet Cleansing Balm", img: product3, category: "Cleanser", price: "€96", note: "N°03 — Rose · Turmeric" },
];

function ShowcaseSection({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section id="collections" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <Reveal>
            <p className="eyebrow mb-6">The Collection</p>
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              Objects of<br /><span className="italic text-forest/80">daily reverence.</span>
            </h2>
          </Reveal>
          <Reveal className="hidden md:block">
            <a href="#" className="eyebrow hover:text-foreground">View all — 12</a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-24 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} onHover={onHover} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, onHover }: { product: typeof PRODUCTS[number]; index: number; onHover: (v: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rot = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  return (
    <Reveal delay={index * 0.15}>
      <div
        ref={ref}
        className="group cursor-pointer"
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
          <motion.img
            src={product.img}
            alt={product.name}
            width={1200}
            height={1500}
            loading="lazy"
            style={{ y, rotate: rot }}
            className="h-[110%] w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-charcoal/90 px-6 py-4 text-cream transition-transform duration-700 ease-out group-hover:translate-y-0">
            <span className="eyebrow" style={{ color: "var(--cream)" }}>Add to bag</span>
            <span aria-hidden>→</span>
          </div>
        </div>
        <div className="mt-6 flex items-start justify-between">
          <div>
            <p className="eyebrow mb-2">{product.category}</p>
            <h3 className="font-display text-2xl">{product.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.note}</p>
          </div>
          <p className="font-display text-xl">{product.price}</p>
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
    <section id="ingredients" ref={ref} className="relative overflow-hidden bg-secondary py-32 md:py-48">
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

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6">Origin — The Living Formula</p>
            <h2 className="font-display text-5xl leading-[1] md:text-6xl">
              Every drop, a<br />
              <span className="italic text-forest">quiet biography</span><br />
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
            <div className="absolute -bottom-8 -left-8 hidden bg-cream p-8 shadow-2xl md:block">
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
      className="grid grid-cols-12 items-baseline gap-4 border-t border-border/60 py-6"
    >
      <span className="col-span-1 font-mono text-xs text-muted-foreground">0{index + 1}</span>
      <span className="col-span-4 font-display text-2xl">{ing.name}</span>
      <span className="col-span-4 hidden text-sm italic text-muted-foreground md:block">{ing.latin}</span>
      <span className="col-span-7 text-sm text-muted-foreground md:col-span-3">{ing.note}</span>
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
    <section id="ritual" className="py-32 md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6">Why Arovia</p>
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              Four principles.<br />
              <span className="italic text-forest/80">One quiet philosophy.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.1}>
              <div className="group">
                <p className="font-mono text-xs text-muted-foreground">— {w.n}</p>
                <h3 className="mt-6 font-display text-3xl transition-transform duration-700 group-hover:-translate-y-1">{w.t}</h3>
                <div className="my-6 h-px w-12 bg-forest/60 transition-all duration-700 group-hover:w-24" />
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
    <section id="journal" className="bg-charcoal py-32 text-cream md:py-48">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-20 flex items-end justify-between">
          <Reveal>
            <p className="eyebrow" style={{ color: "oklch(0.7 0.02 90)" }}>Chapters</p>
            <h2 className="mt-6 font-display text-5xl leading-[1] md:text-7xl">
              Editorial<br /><span className="italic" style={{ color: "var(--gold-soft)" }}>collections.</span>
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
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <p className="eyebrow mb-3" style={{ color: "var(--gold-soft)" }}>{item.tag}</p>
          <h3 className="font-display text-3xl md:text-5xl">{item.title}</h3>
          <div className="mt-6 flex translate-y-4 items-center gap-3 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="eyebrow" style={{ color: "var(--cream)" }}>Read chapter</span>
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
    <section ref={ref} className="relative overflow-hidden bg-cream py-32 md:py-48">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:px-12">
        <div className="relative order-2 md:order-1">
          <Reveal>
            <p className="eyebrow mb-6">Featured — N°01</p>
            <h2 className="font-display text-5xl leading-[1] md:text-7xl">
              Radiance,<br /><span className="italic text-forest">refracted.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 max-w-md">
            <p className="text-base leading-relaxed text-muted-foreground">
              A cold-infused elixir of moringa, sea buckthorn and rare Bulgarian
              rose. Twenty-eight days of maturation. One weightless dropper of
              luminous, self-renewing skin.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12">
            <div className="flex items-center gap-8">
              <p className="font-display text-3xl">€248</p>
              <a
                href="#"
                onMouseEnter={() => onHover(true)}
                onMouseLeave={() => onHover(false)}
                className="btn-luxe text-foreground"
              >
                Acquire
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.45} className="mt-16 grid grid-cols-3 gap-8 border-t border-border pt-10">
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
            className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/30 blur-3xl"
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.a} delay={i * 0.15}>
              <div className="relative h-full rounded-sm border border-white/40 bg-white/40 p-10 backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:bg-white/60">
                <p className="font-display text-2xl leading-snug md:text-3xl">"{q.q}"</p>
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
            <a href="#" className="btn-luxe text-foreground">Our story</a>
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
    <section ref={ref} className="relative overflow-hidden bg-forest text-cream">
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
          className="absolute rounded-full bg-[var(--gold)]"
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

      <div className="relative mx-auto max-w-[1600px] px-6 py-40 text-center md:px-12 md:py-56">
        <Reveal>
          <p className="eyebrow mb-8" style={{ color: "var(--gold-soft)" }}>Begin the ritual</p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mx-auto max-w-4xl font-display text-6xl leading-[1] md:text-8xl">
            Slow beauty,<br />
            <span className="italic" style={{ color: "var(--gold-soft)" }}>quietly obtained.</span>
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
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-[1600px] px-6 py-24 md:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <p className="font-display text-3xl">Arovia Essentials</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed" style={{ color: "oklch(0.75 0.02 85)" }}>
              A quiet study of botanical intelligence. Released twice yearly.
              Composed between Kyoto and Grasse.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-10 flex max-w-md items-center gap-3 border-b border-cream/30 pb-3"
            >
              <input
                type="email"
                placeholder="Your correspondence"
                className="flex-1 bg-transparent text-sm placeholder:text-cream/50 focus:outline-none"
              />
              <button className="eyebrow" style={{ color: "var(--gold-soft)" }}>Subscribe →</button>
            </form>
          </div>
          {[
            { t: "Maison", l: ["Story", "Craft", "Sustainability", "Press"] },
            { t: "Boutique", l: ["Serums", "Oils", "Balms", "Gift Sets"] },
            { t: "Care", l: ["Contact", "Ritual Guide", "Refills", "Delivery"] },
          ].map((col) => (
            <div key={col.t} className="md:col-span-2">
              <p className="eyebrow mb-6" style={{ color: "var(--gold-soft)" }}>{col.t}</p>
              <ul className="space-y-3 text-sm">
                {col.l.map((li) => (
                  <li key={li}>
                    <a href="#" className="transition-colors hover:text-[var(--gold-soft)]">{li}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow mb-6" style={{ color: "var(--gold-soft)" }}>Follow</p>
            <ul className="space-y-3 text-sm">
              {["Instagram", "Journal"].map((li) => (
                <li key={li}>
                  <a href="#" className="transition-colors hover:text-[var(--gold-soft)]">{li}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col justify-between gap-6 border-t border-cream/20 pt-8 md:flex-row">
          <p className="eyebrow" style={{ color: "oklch(0.6 0.02 85)" }}>© MMXXVI Arovia Essentials — All rights reserved</p>
          <p className="eyebrow" style={{ color: "oklch(0.6 0.02 85)" }}>Kyoto · Grasse · Provence</p>
        </div>

        {/* Oversized wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.08, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 select-none text-center font-display text-[18vw] leading-none tracking-[-0.05em] text-cream"
        >
          Arovia
        </motion.p>
      </div>
    </footer>
  );
}
