import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag, Search, User as UserIcon, X, ArrowRight, Sparkles } from "lucide-react";
import logo from "@/assets/top right logo.png";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { cartCount, setCartOpen } = useCart();
  const { settings, products } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Prevent body scroll when menu or search is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K & Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Real-time product search matching
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const list = Array.isArray(products) ? products : [];
    return list
      .filter((p) => {
        if (!p) return false;
        const name = (p.name || "").toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const dept = (p.department || "").toLowerCase();
        const sub = (p.subCategory || "").toLowerCase();
        const note = (p.note || "").toLowerCase();
        return (
          name.includes(q) ||
          cat.includes(q) ||
          dept.includes(q) ||
          sub.includes(q) ||
          note.includes(q)
        );
      })
      .slice(0, 6);
  }, [products, searchQuery]);

  const popularSearches = [
    "Men T-Shirts",
    "Kids T-Shirts",
    "Women T-Shirts",
    "Unisex Hoodie",
    "LED Photo Frame",
    "Regular Photo Frame",
  ];

  const handleSelectProduct = (productId: string) => {
    setSearchOpen(false);
    navigate({ to: "/product/$id", params: { id: productId } });
  };

  const navLinks = [
    { label: "Shop", href: "/shop" },
    { label: "Size & Fit Guide", href: "/size-guide" },
    { label: "About Us", href: "/about" },
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
              className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02]"
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

          {/* Desktop Search Bar & Actions */}
          <div className="hidden items-center gap-3.5 lg:flex">
            {/* Search Bar Pill Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2.5 rounded-full border border-[#432f26]/20 bg-[#f7f2eb]/80 px-4 py-2 text-xs text-[#432f26]/75 transition-all hover:border-[#432f26]/40 hover:bg-white hover:shadow-xs group"
              title="Search styles (Cmd+K)"
            >
              <Search className="h-3.5 w-3.5 text-[#432f26]/60 transition-transform group-hover:scale-110" />
              <span className="text-[12px] font-medium tracking-wide">Search styles...</span>
              <kbd className="hidden md:inline-flex items-center rounded bg-black/5 px-1.5 py-0.5 text-[10px] font-mono text-[#432f26]/60">
                ⌘K
              </kbd>
            </button>

            {/* Account / Sign In & Sign Up */}
            {user ? (
              <a
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#432f26]/25 bg-[#432f26]/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#432f26] hover:bg-[#432f26] hover:text-[#fbf7f0] transition"
                title={`Signed in as ${user.name}`}
              >
                <UserIcon className="h-3.5 w-3.5" />
                <span>{user.name.split(" ")[0]}</span>
              </a>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#432f26] hover:underline px-2 py-1"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>Sign In</span>
                </a>
                <a
                  href="/signup"
                  className="inline-flex items-center gap-1 rounded-full bg-[#432f26] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#fbf7f0] hover:bg-[#34241f] transition shadow-xs"
                >
                  <span>Sign Up</span>
                </a>
              </div>
            )}

            {/* Bag Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[13px] font-medium uppercase tracking-[0.12em] text-[#2d221c]/70 transition-colors hover:text-[#432f26] p-1.5"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#432f26] text-[9px] font-bold text-[#fbf7f0]">
                {cartCount}
              </span>
            </button>
          </div>

          {/* Mobile Right Container */}
          <div className="flex items-center gap-2.5 lg:hidden">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-black/70 hover:text-black"
              aria-label="Search catalog"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile Bag */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-1.5 text-black/70 hover:text-black"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#432f26] text-[9px] font-bold text-white">
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

      {/* Live Interactive Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center pt-20 sm:pt-28 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSearchOpen(false)}
            />

            {/* Search Box Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl rounded-2xl bg-[#fbf7f0] border border-black/10 shadow-2xl overflow-hidden"
            >
              {/* Search Header Input */}
              <div className="relative flex items-center border-b border-black/10 px-5 py-4 bg-white">
                <Search className="h-5 w-5 text-[#47352F]/60 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kids' tees, polos, Christmas hoodies..."
                  className="w-full bg-transparent px-3 text-sm sm:text-base font-normal text-black placeholder:text-black/40 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-black/40 hover:text-black mr-2"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-lg bg-black/5 px-2 py-1 text-[11px] font-semibold uppercase text-black/60 hover:bg-black/10 transition shrink-0"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results Body */}
              <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-5">
                {!searchQuery.trim() ? (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#47352F]/70 mb-3">
                      Popular Searches:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-medium text-black/80 hover:border-[#47352F] hover:bg-[#47352F] hover:text-white transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#47352F]/70 mb-3">
                      Matching Products ({searchResults.length}):
                    </p>
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelectProduct(product.id)}
                        className="flex items-center justify-between gap-4 rounded-xl p-2.5 hover:bg-white transition cursor-pointer border border-transparent hover:border-black/5 group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={product.img}
                            alt={product.name}
                            className="h-14 w-12 rounded-lg object-cover bg-secondary shrink-0 border border-black/5"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-black truncate group-hover:text-[#47352F] transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {product.department && product.subCategory
                                ? `${product.department} · ${product.subCategory}`
                                : product.category}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="text-sm font-bold text-black">{product.price}</p>
                            {product.originalPrice && (
                              <p className="text-[11px] text-muted-foreground line-through">
                                {product.originalPrice}
                              </p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-black/30 group-hover:text-[#47352F] transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 pt-3 border-t border-black/5 text-center">
                      <Link
                        to="/shop"
                        onClick={() => setSearchOpen(false)}
                        className="text-xs font-bold text-[#47352F] hover:underline"
                      >
                        View all products in shop catalog →
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm font-semibold text-black">No products found</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      We couldn't find any items matching "{searchQuery}". Try searching for Polo,
                      Christmas, or Hoodies.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
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
            className="fixed inset-y-0 right-0 z-[95] flex w-[85%] max-w-sm flex-col bg-[#fbf7f0] shadow-2xl lg:hidden"
          >
            <div data-lenis-prevent className="flex-1 overflow-y-auto px-8 pt-20 pb-8">
              {/* Mobile Drawer Top Brand */}
              <div className="mb-6 flex items-center justify-between border-b border-black/5 pb-4">
                <img src={logo} alt="Threads of Eden" className="h-10 w-auto object-contain" />
              </div>

              {/* Mobile Search Button in Drawer */}
              <div className="mb-6">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl border border-[#432f26]/20 bg-white px-4 py-3 text-xs text-[#432f26]/75 shadow-2xs text-left"
                >
                  <Search className="h-4 w-4 text-[#432f26]" />
                  <span>Search styles, categories...</span>
                </button>
              </div>

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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </motion.a>
                ))}

                {user ? (
                  <motion.a
                    href="/login"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-black/5 py-4 text-base font-semibold text-[#47352F]"
                  >
                    <span className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      My Account ({user.name.split(" ")[0]})
                    </span>
                    <span className="rounded-full bg-[#c39a5b]/20 px-2 py-0.5 text-[10px] font-bold text-[#47352F]">
                      PROFILE
                    </span>
                  </motion.a>
                ) : (
                  <>
                    <motion.a
                      href="/login"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.32 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-black/5 py-4 text-base font-semibold text-[#47352F]"
                    >
                      <span className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        Sign In
                      </span>
                      <span className="rounded-full bg-[#47352F]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#47352F]">
                        LOGIN
                      </span>
                    </motion.a>

                    <motion.a
                      href="/signup"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.36 }}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between border-b border-black/5 py-4 text-base font-semibold text-[#47352F]"
                    >
                      <span className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        Create Account
                      </span>
                      <span className="rounded-full bg-[#c39a5b]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#47352F]">
                        SIGN UP
                      </span>
                    </motion.a>
                  </>
                )}
              </nav>

              {/* Mobile Actions */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCartOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#47352F] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#fbf7f0]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shopping Bag ({cartCount})
                </button>
              </div>

              {/* Mobile Footer */}
              <div className="mt-12 border-t border-black/5 pt-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#47352F] text-[#fbf7f0] font-serif text-[10px] font-bold">
                    T&R
                  </span>
                  <span className="text-xs text-black/60 font-medium">
                    Threads of Eden · Woven with purpose
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
