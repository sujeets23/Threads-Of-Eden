import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Lenis from "lenis";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Product } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Threads of Eden — Woven with purpose. Inspired by grace." },
      {
        name: "description",
        content:
          "Precision-knit Peruvian piqué and 280 GSM heavyweight cotton. Discover architectural t-shirts and luxury polos crafted for the modern connoisseur.",
      },
      { property: "og:title", content: "Threads of Eden — Woven with purpose. Inspired by grace." },
      {
        property: "og:description",
        content: "Precision-knit Peruvian piqué and 280 GSM heavyweight cotton.",
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
          x: sx,
          y: sy,
          translateX: "-50%",
          translateY: "-50%",
          width: hover ? 60 : 14,
          height: hover ? 60 : 14,
          transition: "width 500ms cubic-bezier(.16,1,.3,1), height 500ms cubic-bezier(.16,1,.3,1)",
          background: "radial-gradient(circle, rgba(0,0,0,0.15), transparent 70%)",
          borderRadius: 999,
          mixBlendMode: "normal",
        }}
      />

      <Hero onHover={setHover} />
      <Marquee />
      <ShowcaseSection onHover={setHover} />
      <FabricStory />
      <WhySection />
      <Collections onHover={setHover} />
      <FeaturedProduct onHover={setHover} />
      <Testimonials />
      <AboutSection />
      <CTASection onHover={setHover} />
    </div>
  );
}

/* ------------------------------- Hero ------------------------------- */

function Hero({ onHover }: { onHover: (v: boolean) => void }) {
  const { settings } = useStore();
  const hero = settings.hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] md:min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={hero.imageUrl || "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1800&auto=format&fit=crop&q=85"}
          alt="Threads of Eden luxury cotton t-shirt and polo textiles"
          width={1800}
          height={1200}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay bg-black/40" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 pb-20 md:px-16 md:pb-28 pt-24">
        <div className="max-w-[92vw] sm:max-w-[80vw] md:max-w-3xl text-left">
          {hero.eyebrow && (
            <p className="eyebrow mb-4 text-[#CFF57C] tracking-[0.3em] font-medium">
              {hero.eyebrow}
            </p>
          )}

          <h1 className="font-display text-[12vw] leading-[1.02] tracking-[-0.02em] sm:text-[11vw] sm:tracking-[-0.03em] md:text-[8vw] md:leading-[0.95] md:tracking-[-0.04em] text-white">
            <AnimatedWords text={hero.titleLine1 || "Cotton,"} className="block" />
            <AnimatedWords
              text={hero.titleLine2 || "elevated"}
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
                className="w-fit rounded-full border border-white bg-transparent px-8 py-3.5 text-center text-sm font-medium uppercase tracking-[0.15em] text-white shadow-sm transition-all duration-300 hover:bg-white hover:text-[#2C5D2E]"
              >
                {hero.ctaText || "Discover the Collection"}
                <span className="ml-2 font-sans" aria-hidden>→</span>
              </a>
            </Reveal>

            <Reveal delay={0.6}>
              <a
                href="/admin"
                className="w-fit rounded-full border border-[#CFF57C]/40 bg-black/20 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#CFF57C] backdrop-blur transition hover:bg-[#CFF57C] hover:text-[#1a2e1b]"
              >
                Admin Console
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
  const { settings } = useStore();
  const items =
    settings.marqueeItems && settings.marqueeItems.length > 0
      ? settings.marqueeItems
      : [
          "280 GSM Heavyweight",
          "100% Long-Staple Supima®",
          "Mercerized Piqué Knit",
          "Mother of Pearl Buttons",
          "Pre-Shrunk Organic Cotton",
          "Double-Needle Construction",
          "Milan — Kyoto — Mumbai",
        ];

  return (
    <section className="border-y border-border/60 bg-[#fafafa] py-6 overflow-hidden">
      <div className="mx-auto flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className="mx-6 eyebrow flex items-center gap-6 md:mx-10 md:gap-10 text-black/80">
            {it}
            <span className="inline-block h-1 w-1 rounded-full bg-[#2C5D2E]" />
          </span>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- Showcase ------------------------------- */

function ShowcaseSection({ onHover }: { onHover: (v: boolean) => void }) {
  const { products, categories } = useStore();
  const [selectedCat, setSelectedCat] = useState("All");

  const filtered = selectedCat === "All" ? products : products.filter((p) => p.category === selectedCat);

  return (
    <section id="shop" className="relative py-20 md:py-36">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal>
            <p className="eyebrow mb-4 md:mb-6 text-[#2C5D2E]">The Apparel Suite</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-7xl">
              Precision Cut.<br />
              <span className="italic text-[#2C5D2E]/80">Heavyweight Form.</span>
            </h2>
          </Reveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCat === cat
                    ? "bg-[#2C5D2E] text-white shadow-sm"
                    : "border border-black/10 bg-white text-black/70 hover:border-[#2C5D2E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-x-8 md:gap-y-16">
          {filtered.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onHover={onHover} />
          ))}
        </div>

        {/* Action Link to Full Shop */}
        <div className="mt-16 text-center">
          <a
            href="/shop"
            className="inline-flex items-center gap-3 rounded-full border border-[#2C5D2E] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
          >
            Explore All Styles ({products.length})
            <span aria-hidden>→</span>
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
        <div
          onClick={() => addToCart(product)}
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary md:aspect-[4/5] border border-black/5"
        >
          <motion.img
            src={product.img}
            alt={product.name}
            width={800}
            height={1000}
            loading="lazy"
            style={{ y }}
            className="h-[110%] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10 rounded-full bg-[#1a2e1b]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#CFF57C] backdrop-blur">
              {product.badge}
            </div>
          )}

          {/* Desktop quick-add overlay */}
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-between bg-[#2C5D2E]/95 px-6 py-4 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 md:flex">
            <span className="text-xs font-medium uppercase tracking-[0.15em]">Quick Add to Bag</span>
            <span aria-hidden>→</span>
          </div>

          {/* Mobile quick-add button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#2C5D2E] text-white shadow-lg md:hidden"
            aria-label="Add to bag"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>

        <div className="mt-3 md:mt-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2C5D2E]">
              {product.category}
            </p>
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-[10px] text-muted-foreground uppercase">
                {product.sizes.join(" · ")}
              </span>
            )}
          </div>

          <h3 className="mt-1 text-sm font-medium leading-snug md:text-lg line-clamp-1">
            {product.name}
          </h3>

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
              className="text-xs font-semibold text-[#2C5D2E] hover:underline"
            >
              Details →
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------- Fabric & Craftsmanship Story ------------------------------- */

function FabricStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const fabricList = [
    { name: "Peruvian Pima Cotton", spec: "Gossypium barbadense", note: "Extra-long staple silky touch" },
    { name: "Mercerized Piqué Knit", spec: "Double singed", note: "Resilient non-curling collar" },
    { name: "280 GSM Heavyweight Terry", spec: "Zero-twist yarn", note: "Architectural structured drape" },
    { name: "Long-Staple Supima®", spec: "Top 1% harvest", note: "Deep non-fade organic dyes" },
    { name: "Mother of Pearl Shell", spec: "Australian ocean shell", note: "Natural hand-carved luster" },
  ];

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="craftsmanship" ref={ref} className="relative overflow-hidden bg-secondary py-20 md:py-40">
      {/* Soft color blurs */}
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -150]) }}
        className="absolute -left-20 top-20 h-60 w-60 rounded-full bg-sage/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
        className="absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-[#CFF57C]/20 blur-3xl"
      />

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-4 md:grid-cols-12 md:gap-16 md:px-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 text-[#2C5D2E]">Craftsmanship & Fiber</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-6xl">
              Every thread, an<br />
              <span className="italic text-[#2C5D2E]">exact study</span><br />
              in proportion.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-8">
            <p className="max-w-md text-sm md:text-base leading-relaxed text-muted-foreground">
              We reject synthetic blends, polyester fillers, and flimsy fast-fashion knits.
              Our cotton is sourced from certified organic single-origin farms, combed twice to
              remove short fibers, and woven on vintage circular looms for an uncompromising hand feel.
            </p>
          </Reveal>

          <div className="mt-12 space-y-0">
            {fabricList.map((fab, i) => (
              <motion.div
                key={fab.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-3 items-baseline gap-2 border-t border-border/60 py-4 md:grid-cols-12 md:gap-4 md:py-5"
              >
                <span className="col-span-1 text-[10px] text-muted-foreground md:font-mono md:text-xs">0{i + 1}</span>
                <span className="col-span-1 text-base font-medium md:col-span-5 md:font-display md:text-xl">
                  {fab.name}
                </span>
                <span className="col-span-3 hidden text-xs italic text-muted-foreground md:block">
                  {fab.spec}
                </span>
                <span className="col-span-1 text-xs text-muted-foreground md:col-span-3">
                  {fab.note}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative md:col-span-7">
          <motion.div style={{ y: imgY }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1200&auto=format&fit=crop&q=85"
                alt="Fine knitted cotton polo textiles on studio worktable"
                width={1200}
                height={1500}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 hidden bg-white p-8 shadow-2xl md:block rounded-xl border border-black/5">
              <p className="eyebrow mb-2 text-[#2C5D2E]">Zero Shrinkage</p>
              <p className="font-display text-3xl font-light">280 GSM</p>
              <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">
                Pre-washed & heat-set to ensure your t-shirt stays true to size forever.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Why Section ------------------------------- */

const WHY = [
  {
    n: "01",
    t: "Architectural Drape",
    d: "Our 280 GSM cotton and dense piqué knits hang with structured posture, avoiding flimsy cling.",
  },
  {
    n: "02",
    t: "Mercerized Luster",
    d: "A dual-gas singeing process removes micro-fuzz, creating an ultra-soft silky hand that resists wash fade.",
  },
  {
    n: "03",
    t: "Stay-Flat Rib Collar",
    d: "Double-needle reinforced collar bands and cotton-elastane ribbing engineered never to bacon or roll.",
  },
  {
    n: "04",
    t: "Ethical Organics",
    d: "GOTS-certified 100% organic cotton dyed with low-impact botanical and mineral dyes.",
  },
];

function WhySection() {
  return (
    <section className="py-20 md:py-40">
      <div className="mx-auto max-w-[1600px] px-4 md:px-12">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-6 text-[#2C5D2E]">Design Philosophy</p>
            <h2 className="font-display text-4xl leading-[1] md:text-7xl">
              Four principles.<br />
              <span className="italic text-[#2C5D2E]">One standard of form.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4 md:gap-x-12 md:gap-y-16">
          {WHY.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.1}>
              <div className="group">
                <p className="font-mono text-xs text-muted-foreground">— {w.n}</p>
                <h3 className="mt-4 font-display text-xl transition-transform duration-700 group-hover:-translate-y-1 md:mt-6 md:text-3xl">
                  {w.t}
                </h3>
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
    {
      img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1200&auto=format&fit=crop&q=85",
      title: "The Polo Suite",
      tag: "Mercerized Piqué",
      href: "/shop",
    },
    {
      img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1200&auto=format&fit=crop&q=85",
      title: "Heavyweight Oversized",
      tag: "280 GSM Drop Shoulder",
      href: "/shop",
    },
    {
      img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&auto=format&fit=crop&q=85",
      title: "Textured & Henleys",
      tag: "Waffle Knit & Linen",
      href: "/shop",
    },
  ];

  return (
    <section className="bg-[#1a2e1b] py-28 text-white md:py-44">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <Reveal>
            <p className="eyebrow" style={{ color: "#CFF57C" }}>
              Silhouettes
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1] md:text-7xl">
              Editorial<br />
              <span className="italic text-[#CFF57C]">wardrobe.</span>
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-16">
          <EditorialCard item={items[0]} className="md:col-span-7 md:aspect-[4/5]" onHover={onHover} />
          <EditorialCard item={items[1]} className="md:col-span-5 md:mt-24 md:aspect-[3/4]" onHover={onHover} />
          <EditorialCard item={items[2]} className="md:col-span-12 md:aspect-[16/8]" onHover={onHover} />
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1b]/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
          <p className="eyebrow mb-3 text-[#CFF57C]">{item.tag}</p>
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

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-10 px-4 md:grid-cols-2 md:gap-16 md:px-12">
        <div className="relative order-2 md:order-1">
          <Reveal>
            <p className="eyebrow mb-6 text-[#2C5D2E]">Iconic Signature Piece</p>
            <h2 className="font-display text-3xl leading-[1.05] md:text-6xl">
              {featured.name}
            </h2>
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
                className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E] hover:underline"
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
              ["240 GSM", "Weight"],
              ["100%", "Organic Supima"],
              ["Shell", "Mother of Pearl"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-light">{v}</p>
                <p className="eyebrow mt-1 text-muted-foreground">{l}</p>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative order-1 md:order-2">
          <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-2xl shadow-2xl border border-black/5">
            <img
              src={featured.img}
              alt={featured.name}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Testimonials ------------------------------- */

const QUOTES = [
  {
    q: "The collar holds its crisp shape after 30 washes. Easily the best polo cut in menswear today.",
    a: "GQ Style Report",
  },
  {
    q: "Substantial 280 GSM weight that hangs cleanly without cling. The oversized drape is flawless.",
    a: "Monocle Apparel Review",
  },
  {
    q: "Threads of Eden has distilled what a luxury t-shirt should be: zero logos, extraordinary Peruvian cotton.",
    a: "Esquire Select",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-secondary py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <Reveal>
          <p className="eyebrow mb-6 text-[#2C5D2E]">Critical Reception</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {QUOTES.map((q, i) => (
            <Reveal key={q.a} delay={i * 0.15}>
              <div className="relative h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-700 hover:-translate-y-2 hover:shadow-md md:p-10">
                <p className="font-display text-lg leading-snug md:text-2xl">"{q.q}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="h-px w-8 bg-[#2C5D2E]" />
                  <p className="eyebrow text-muted-foreground">{q.a}</p>
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
  return (
    <section id="atelier" className="py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:px-12">
        <div className="relative md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&auto=format&fit=crop&q=85"
              alt="Atelier workshop with fine cotton garment patterns"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center md:col-span-6 md:pl-8">
          <Reveal>
            <p className="eyebrow mb-6 text-[#2C5D2E]">The House of Threads of Eden</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl leading-[1] md:text-6xl">
              Founded on the belief<br />
              that <span className="italic text-[#2C5D2E]">everyday essentials</span><br />
              deserve bespoke tailoring.
            </h2>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 max-w-md space-y-5 text-sm md:text-base leading-relaxed text-muted-foreground">
            <p>
              We began with a simple question: why should a tailored polo or daily crewneck
              degrade after a few seasons? Threads of Eden combines Old World garment tailoring with
              uncompromising heavyweight Peruvian and Egyptian cotton.
            </p>
            <p>
              Each seam is double-needle blind stitched, each collar is fused with lightweight
              interlining, and every button is natural carved shell.
            </p>
          </Reveal>
          <Reveal delay={0.4} className="mt-10">
            <a href="/about" className="btn-luxe text-foreground">
              Read Our Story
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */

function CTASection({ onHover }: { onHover: (v: boolean) => void }) {
  return (
    <section className="relative overflow-hidden bg-[#2C5D2E] text-white py-24 md:py-36">
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-4 text-[#CFF57C] tracking-[0.3em]">Built to Endure</p>
          <h2 className="font-display text-4xl leading-tight md:text-7xl">
            Upgrade your daily wardrobe.<br />
            <span className="italic text-[#CFF57C]">Experience architectural cotton.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm md:text-base text-white/80 leading-relaxed font-light">
            Complimentary shipping on orders over ₹1,999. Includes reusable organic cotton wash bag.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              onMouseEnter={() => onHover(true)}
              onMouseLeave={() => onHover(false)}
              className="btn-luxe-inverse"
            >
              Shop The Entire Collection
            </a>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/20 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur hover:bg-white hover:text-[#2C5D2E] transition"
            >
              Admin Dashboard
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
