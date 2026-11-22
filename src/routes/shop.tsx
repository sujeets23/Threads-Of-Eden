import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/store";
import { Search, ShoppingBag, X } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Kids' & Festive T-Shirts — Threads of Eden" },
      {
        name: "description",
        content:
          "Shop kids' oversized t-shirts, polo t-shirts, round neck tees, and Christmas edition styles for Men, Women, and Kids.",
      },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [christmasDept, setChristmasDept] = useState<"All" | "Men" | "Women" | "Kids">("All");
  const [christmasSub, setChristmasSub] = useState<string>("All");

  const isChristmasActive = (selectedCategory || "").toLowerCase().includes("christmas");

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const pCat = (p.category || "").toLowerCase();
      const isProductChristmas = pCat.includes("christmas");
      const isFilterChristmas = (selectedCategory || "").toLowerCase().includes("christmas");

      let matchCat = false;
      if (selectedCategory === "All") {
        matchCat = true;
      } else if (isFilterChristmas) {
        matchCat = isProductChristmas;
      } else {
        matchCat = p.category === selectedCategory;
      }

      if (!matchCat) return false;

      // Apply Christmas sub-filters
      if (isFilterChristmas) {
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

      const query = (searchQuery || "").toLowerCase();
      if (!query) return true;

      const matchSearch =
        Boolean(p.name && p.name.toLowerCase().includes(query)) ||
        Boolean(p.category && p.category.toLowerCase().includes(query)) ||
        Boolean(p.department && p.department.toLowerCase().includes(query)) ||
        Boolean(p.subCategory && p.subCategory.toLowerCase().includes(query)) ||
        Boolean(p.note && p.note.toLowerCase().includes(query));

      return matchSearch;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^0-9]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^0-9]/g, ""), 10) || 0;
        return pB - pA;
      });
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy, christmasDept, christmasSub]);

  const handleCategorySelect = (item: string) => {
    setSelectedCategory(item);
    if (!item.toLowerCase().includes("christmas")) {
      setChristmasDept("All");
      setChristmasSub("All");
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header Banner */}
      <section className="bg-secondary border-b border-black/5 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4 text-[#47352F]">The Kidswear & Festive Collection</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl leading-[1.02] md:text-6xl">
                T-Shirts for Little Ones & Families,
                <br />
                <span className="italic text-[#47352F]">made for everyday fun & celebrations.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
                Shop playful kids' oversized, polo, round neck, and Christmas edition styles. Explore
                dedicated festive selections for Men, Women, and Kids.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-20">
        {/* Filters and Controls */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const isXmas = item.toLowerCase().includes("christmas");
              return (
                <button
                  key={item}
                  onClick={() => handleCategorySelect(item)}
                  className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedCategory === item
                      ? "bg-[#47352F] text-white shadow-sm"
                      : "border border-black/10 bg-white text-foreground hover:border-[#47352F]"
                  }`}
                >
                  {isXmas ? `🎄 ${item}` : item}
                </button>
              );
            })}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Search styles, categories, fits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-60 rounded-full border border-black/10 bg-white pl-9 pr-4 py-2 text-xs focus:border-[#47352F] focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "featured" || value === "price-asc" || value === "price-desc") {
                  setSortBy(value);
                }
              }}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70 focus:border-[#47352F] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Christmas Sub-Filter Panel */}
        {isChristmasActive && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-2xl border border-[#47352F]/15 bg-[#fbf7f0] p-5 sm:p-6 shadow-sm"
          >
            {/* Sub-Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#47352F]/10 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#8A1822] text-white text-sm shadow-xs">
                  🎄
                </span>
                <div>
                  <h3 className="font-display text-lg text-[#47352F]">
                    Christmas Collection Sub-Filters
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Filter festive styles by department and garment type
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#47352F] border border-[#47352F]/15">
                  {filteredProducts.length} style{filteredProducts.length === 1 ? "" : "s"} found
                </span>
                {(christmasDept !== "All" || christmasSub !== "All") && (
                  <button
                    onClick={() => {
                      setChristmasDept("All");
                      setChristmasSub("All");
                    }}
                    className="text-xs font-semibold text-[#8A1822] hover:underline flex items-center gap-1"
                  >
                    <X className="h-3 w-3" />
                    Reset Sub-Filters
                  </button>
                )}
              </div>
            </div>

            {/* Department Level Tabs: All Festive | Men | Women | Kids */}
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/50 block mb-2">
                  Select Department:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setChristmasDept("All");
                      setChristmasSub("All");
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                      christmasDept === "All"
                        ? "bg-[#8A1822] text-white shadow-xs"
                        : "border border-black/10 bg-white text-black/80 hover:border-[#8A1822]"
                    }`}
                  >
                    All Christmas (
                    {products.filter((p) => (p.category || "").toLowerCase().includes("christmas")).length})
                  </button>

                  <button
                    onClick={() => {
                      setChristmasDept("Men");
                      setChristmasSub("All");
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      christmasDept === "Men"
                        ? "bg-[#8A1822] text-white shadow-xs"
                        : "border border-black/10 bg-white text-black/80 hover:border-[#8A1822]"
                    }`}
                  >
                    <span>Men</span>
                    <span className="text-[10px] opacity-75">
                      (
                      {
                        products.filter(
                          (p) =>
                            (p.category || "").toLowerCase().includes("christmas") &&
                            p.department === "Men",
                        ).length
                      }
                      )
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setChristmasDept("Women");
                      setChristmasSub("All");
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      christmasDept === "Women"
                        ? "bg-[#8A1822] text-white shadow-xs"
                        : "border border-black/10 bg-white text-black/80 hover:border-[#8A1822]"
                    }`}
                  >
                    <span>Women</span>
                    <span className="text-[10px] opacity-75">
                      (
                      {
                        products.filter(
                          (p) =>
                            (p.category || "").toLowerCase().includes("christmas") &&
                            p.department === "Women",
                        ).length
                      }
                      )
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setChristmasDept("Kids");
                      setChristmasSub("All");
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 ${
                      christmasDept === "Kids"
                        ? "bg-[#8A1822] text-white shadow-xs"
                        : "border border-black/10 bg-white text-black/80 hover:border-[#8A1822]"
                    }`}
                  >
                    <span>Kids</span>
                    <span className="text-[10px] opacity-75">
                      (
                      {
                        products.filter(
                          (p) =>
                            (p.category || "").toLowerCase().includes("christmas") &&
                            p.department === "Kids",
                        ).length
                      }
                      )
                    </span>
                  </button>
                </div>
              </div>

              {/* Sub-Category Level Container */}
              <div className="rounded-xl border border-black/5 bg-white/80 p-4">
                {christmasDept === "Men" && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                      Men's Sub-Filters:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setChristmasSub("All")}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                          christmasSub === "All"
                            ? "bg-[#47352F] text-white shadow-xs"
                            : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                        }`}
                      >
                        All Men's
                      </button>
                      {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setChristmasSub(sub)}
                          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                            christmasSub.toLowerCase() === sub.toLowerCase()
                              ? "bg-[#47352F] text-white shadow-xs"
                              : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {christmasDept === "Women" && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                      Women's Sub-Filters:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setChristmasSub("All")}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                          christmasSub === "All"
                            ? "bg-[#47352F] text-white shadow-xs"
                            : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                        }`}
                      >
                        All Women's
                      </button>
                      {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setChristmasSub(sub)}
                          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                            christmasSub.toLowerCase() === sub.toLowerCase()
                              ? "bg-[#47352F] text-white shadow-xs"
                              : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {christmasDept === "Kids" && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                      Kids' Sub-Filters:
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setChristmasSub("All")}
                        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                          christmasSub === "All"
                            ? "bg-[#47352F] text-white shadow-xs"
                            : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                        }`}
                      >
                        All Kids'
                      </button>
                      {["Boys", "Girls"].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => setChristmasSub(sub)}
                          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                            christmasSub.toLowerCase() === sub.toLowerCase()
                              ? "bg-[#47352F] text-white shadow-xs"
                              : "border border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {christmasDept === "All" && (
                  <div className="space-y-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">
                      Browse by Sub-Category:
                    </span>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {/* Men Group */}
                      <div className="rounded-lg bg-black/5 p-3">
                        <span className="text-xs font-bold text-[#47352F] block mb-1.5">
                          Men:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setChristmasDept("Men");
                                setChristmasSub(sub);
                              }}
                              className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black/80 hover:bg-[#8A1822] hover:text-white transition shadow-2xs"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Women Group */}
                      <div className="rounded-lg bg-black/5 p-3">
                        <span className="text-xs font-bold text-[#47352F] block mb-1.5">
                          Women:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {["Round Neck", "Polo", "Hoodies"].map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setChristmasDept("Women");
                                setChristmasSub(sub);
                              }}
                              className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black/80 hover:bg-[#8A1822] hover:text-white transition shadow-2xs"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Kids Group */}
                      <div className="rounded-lg bg-black/5 p-3">
                        <span className="text-xs font-bold text-[#47352F] block mb-1.5">
                          Kids:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {["Boys", "Girls"].map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setChristmasDept("Kids");
                                setChristmasSub(sub);
                              }}
                              className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black/80 hover:bg-[#8A1822] hover:text-white transition shadow-2xs"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="eyebrow text-muted-foreground">No matches found</p>
            <h2 className="mt-4 font-display text-3xl">No products match your filter criteria</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try clearing your sub-filter or searching for another term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setChristmasDept("All");
                setChristmasSub("All");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full bg-[#47352F] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-black/10 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] flex flex-col justify-between">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative aspect-[4/5] overflow-hidden bg-secondary block"
      >
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.badge && (
          <div className="absolute top-4 left-4 rounded-full bg-[#221b18]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#E5CFAC] backdrop-blur">
            {product.badge}
          </div>
        )}

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center">
            <span className="rounded-full bg-black/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#47352F]">
              {product.department && product.subCategory
                ? `${product.department} · ${product.subCategory}`
                : product.category}
            </p>
            {product.sizes && (
              <span className="text-[10px] text-muted-foreground uppercase">
                {product.sizes.join(" · ")}
              </span>
            )}
          </div>

          <Link to="/product/$id" params={{ id: product.id }}>
            <h2 className="mt-2 font-display text-2xl leading-tight line-clamp-1 hover:text-[#47352F] transition-colors">
              {product.name}
            </h2>
          </Link>
          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2">{product.note}</p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-black/5">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.inStock}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#47352F] text-white hover:bg-[#39291F] transition disabled:opacity-40"
              title="Add to bag"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>

            <Link
              to="/product/$id"
              params={{ id: product.id }}
              className="rounded-full border border-[#47352F] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#47352F] transition hover:bg-[#47352F] hover:text-white"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
