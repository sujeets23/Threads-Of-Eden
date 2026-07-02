import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { getProductById } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} — Arovia Essentials` },
      { name: "description", content: "Explore the product details, ingredients, and add-to-bag experience for Arovia Essentials." },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const params = useParams();
  const product = useMemo(() => getProductById(params.id), [params.id]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-lg">
          <p className="eyebrow mb-4">Product not found</p>
          <h1 className="font-display text-4xl">This product is not available</h1>
          <p className="mt-4 text-sm text-muted-foreground">Please return to the boutique and select another ritual.</p>
          <div className="mt-8">
            <a href="/shop" className="btn-luxe">Back to Shop</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-[1400px] px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
            <img src={product.img} alt={product.name} className="h-[560px] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/30 via-transparent to-transparent p-6 text-white">
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">{product.category}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-4">{product.category}</p>
              <h1 className="font-display text-5xl leading-tight md:text-6xl">{product.name}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-6 rounded-[1.5rem] border border-black/10 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-3xl font-semibold">{product.price}</span>
                <button className="btn-luxe">Add to bag</button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.details.map((detail) => (
                  <div key={detail} className="rounded-2xl bg-[#f7f7f5] p-4 text-sm text-muted-foreground">
                    {detail}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-black/10 bg-secondary p-8">
              <h2 className="font-display text-3xl">Ingredients & Ritual</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Each formula is crafted to support a slow, considered ritual. Layer this product after cleansing and before your final oil or cream, allowing the botanical actives to absorb naturally.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
