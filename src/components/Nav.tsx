import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { Link } from "@tanstack/react-router";
import { Settings, ShoppingBag, Search } from "lucide-react";
import logo from "@/assets/Images/logo.jpeg";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();
  const { settings } = useStore();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Fabrics & Fiber", href: "/ingredients" },
    { label: "Size & Fit Guide", href: "/size-guide" },
    { label: "Atelier Story", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-xl bg-[#f7f2eb]/90 border-b border-[#432f26]/10 shadow-xs"
            : "bg-[#f7f2eb]/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-12 md:py-5">
          {/* Logo */}
          <a href="/" className="z-10 flex items-center gap-3">
            <img
              src={logo}
              alt="Threads of Eden logo"
              className="h-14 w-auto object-contain md:h-16"
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[12px] font-medium uppercase tracking-[0.14em] text-[#2d221c]/70 transition-colors duration-300 hover:text-[#432f26] after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:w-0 after:bg-[#432f26] after:transition-all after:duration-500 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 lg:flex">
            {/* Admin Panel Direct Link */}
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#432f26]/25 bg-[#432f26]/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#432f26] hover:bg-[#432f26] hover:text-white transition"
              title="Open Admin Console"
            >
              <Settings className="h-3.5 w-3.5" />
              <span>Admin Panel</span>
            </a>

            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[13px] font-medium uppercase tracking-[0.12em] text-[#2d221c]/70 transition-colors hover:text-[#432f26] p-1"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#432f26] text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile Right Container */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1 text-black/70"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#432f26] text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
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
                    className="flex items-center justify-between border-b border-black/5 py-4 text-base font-medium tracking-tight text-black/80 transition-colors active:text-[#47352F]"
                  >
                    {link.label}
                    <svg
                      className="h-4 w-4 text-black/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </motion.a>
                ))}

                <motion.a
                  href="/admin"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between border-b border-black/5 py-4 text-base font-semibold text-[#47352F]"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Admin Panel
                  </span>
                  <span className="rounded-full bg-[#47352F]/10 px-2 py-0.5 text-[10px] font-bold text-[#47352F]">
                    MANAGER
                  </span>
                </motion.a>
              </nav>

              {/* Mobile Actions */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#47352F] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shopping Bag ({cartCount})
                </button>
              </div>

              {/* Mobile Footer */}
              <div className="mt-12 border-t border-black/5 pt-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#47352F] text-white font-serif text-[10px] font-bold">
                    T&R
                  </span>
                  <span className="text-xs text-black/60 font-medium">Threads of Eden · Woven with purpose</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
