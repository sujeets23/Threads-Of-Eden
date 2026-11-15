import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/store";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Boutique — Threads of Eden Luxury T-Shirts & Polos" },
      {
        name: "description",
        content:
          "Explore luxury piqué polos, 280 GSM heavyweight oversized tees, and Supima cotton crewnecks.",
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

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.note.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
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
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header Banner */}
      <section className="bg-secondary border-b border-black/5 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <p className="eyebrow mb-4 text-[#2C5D2E]">The Apparel Archive</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl leading-[1.02] md:text-6xl">
                Luxury T-Shirts & Polos,<br />
                <span className="italic text-[#2C5D2E]">engineered to endure.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
                Peruvian piqué knits, 280 GSM heavyweight interlock, and California Supima®.
                Discover modern silhouettes with architectural drape.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin"
                className="rounded-full border border-[#2C5D2E] bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#2C5D2E] hover:bg-[#2C5D2E] hover:text-white transition shadow-sm"
              >
                Manage in Admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-12 md:py-20">
        {/* Filters and Controls */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setSelectedCategory(item)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCategory === item
                    ? "bg-[#2C5D2E] text-white shadow-sm"
                    : "border border-black/10 bg-white text-foreground hover:border-[#2C5D2E]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Search styles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 sm:w-60 rounded-full border border-black/10 bg-white pl-9 pr-4 py-2 text-xs focus:border-[#2C5D2E] focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-black/70 focus:border-[#2C5D2E] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="eyebrow text-muted-foreground">No matches found</p>
            <h2 className="mt-4 font-display text-3xl">No products match your filter criteria</h2>
            <p className="mt-2 text-sm text-muted-foreground">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 rounded-full bg-[#2C5D2E] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white"
            >
              Reset Filters
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
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {product.badge && (
          <div className="absolute top-4 left-4 rounded-full bg-[#1a2e1b]/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#CFF57C] backdrop-blur">
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
      </div>

      <div className="p-7 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2C5D2E]">
              {product.category}
            </p>
            {product.sizes && (
              <span className="text-[10px] text-muted-foreground uppercase">
                {product.sizes.join(" · ")}
              </span>
            )}
          </div>

          <h2 className="mt-2 font-display text-2xl leading-tight line-clamp-1">{product.name}</h2>
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2C5D2E] text-white hover:bg-[#1a3d1b] transition disabled:opacity-40"
              title="Add to bag"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>

            <Link
              to={`/product/${product.id}`}
              className="rounded-full border border-[#2C5D2E] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
