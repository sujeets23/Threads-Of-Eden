import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Arovia Essentials" },
      { name: "description", content: "Explore premium botanical skincare with refined filters and detailed product cards." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [category, setCategory] = useState<string>("All");
  const categories = ["All", "Serum", "Facial Oil", "Cleanser", "Moisturizer", "Night Care", "Sunscreen"];
  const filteredProducts = category === "All" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category);

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Boutique</p>
            <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
              Premium skincare,
              <br />
              thoughtfully curated.
            </h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full border px-5 py-3 text-sm transition ${
                  category === item
                    ? "border-[#2C5D2E] bg-[#2C5D2E] text-white"
                    : "border-black/10 bg-white text-foreground hover:border-[#2C5D2E]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ProductCard({ product }: { product: (typeof PRODUCTS)[number] }) {
  return (
    <article className="group overflow-hidden rounded-[1.7rem] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <img
        src={product.img}
        alt={product.name}
        className="h-[420px] w-full object-cover"
      />
      <div className="p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2C5D2E]">{product.category}</p>
        <h2 className="mt-4 font-display text-2xl leading-tight">{product.name}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{product.note}</p>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-lg font-semibold">{product.price}</span>
          <a
            href={`/product/${product.id}`}
            className="rounded-full border border-[#2C5D2E] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
          >
            View details
          </a>
        </div>
      </div>
    </article>
  );
}
