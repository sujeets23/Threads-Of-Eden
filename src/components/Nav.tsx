import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import aroviaLogo from "@/assets/Images/arovia logo.png";
import { useCart } from "@/context/CartContext";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

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
    { label: "Ingredients", href: "/ingredients" },
    { label: "Ritual", href: "/ritual-guide" },
    { label: "Collections", href: "/blog" },
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
            <button onClick={() => setCartOpen(true)} className="relative text-[13px] font-medium uppercase tracking-[0.12em] text-black/50 transition-colors hover:text-[#2C5D2E]" aria-label="Shopping bag">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2C5D2E] text-[9px] font-bold text-white">{cartCount}</span>
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
                <button onClick={() => { setMobileOpen(false); setCartOpen(true); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2C5D2E] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-white w-full">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  Shopping Bag ({cartCount})
                </button>
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
