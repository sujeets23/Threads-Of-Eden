import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { Check, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Product — Threads of Eden` },
      {
        name: "description",
        content:
          "Shop kids' t-shirts with product details, age-based sizes, and easy add-to-bag checkout.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const params = Route.useParams();
  const { getProduct, products } = useStore();
  const product = useMemo(() => getProduct(params.id), [params.id, getProduct]);
  const { addToCart } = useCart();

  const standardSizes =
    product?.sizes && product.sizes.length > 0
      ? product.sizes
      : ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];
  const standardColors =
    product?.colors && product.colors.length > 0
      ? product.colors
      : [{ name: "Warm Brown", hex: "#47352F" }];

  const [selectedSize, setSelectedSize] = useState<string>(standardSizes[0] || "4-5Y");
  const [selectedColor, setSelectedColor] = useState<string>(standardColors[0]?.name || "Standard");
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (product) {
      if (standardSizes[0]) setSelectedSize(standardSizes[0]);
      if (standardColors[0]?.name) setSelectedColor(standardColors[0].name);
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [product?.id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
      .slice(0, 3);
  }, [products, product]);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-[#fbf7f0] p-10 shadow-lg">
          <p className="eyebrow mb-4 text-[#47352F]">Style Not Found</p>
          <h1 className="font-display text-4xl">This product is no longer active</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Please return to our kids' t-shirt collection to explore current styles.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/shop" className="btn-luxe">
              Back to Catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize, selectedColor);
    }
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        {/* Breadcrumb Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/50 hover:text-[#47352F] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Styles</span>
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.06)] aspect-[4/5]">
              <img src={product.img} alt={product.name} className="h-full w-full object-cover" />

              {product.badge && (
                <div className="absolute top-6 left-6 rounded-full bg-[#221b18]/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#E5CFAC] backdrop-blur">
                  {product.badge}
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E5CFAC]">
                  {product.category} Archive
                </p>
                <p className="mt-1 text-sm text-white/80">{product.note}</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="eyebrow text-[#47352F]">{product.category}</p>
                {product.department && product.subCategory && (
                  <span className="rounded-full bg-[#47352F]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#47352F]">
                    {product.department} · {product.subCategory}
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl leading-tight md:text-5xl">{product.name}</h1>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Pricing & Stock status */}
            <div className="flex items-baseline gap-4 border-b border-black/10 pb-6">
              <span className="text-3xl font-semibold text-black">{product.price}</span>
              {product.originalPrice && (
                <span className="text-base text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                {product.inStock ? "In Stock" : "Sold Out"}
              </span>
            </div>

            {/* Color Swatch Selection */}
            {standardColors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/60">
                    Selected Color: <strong className="text-black">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {standardColors.map((col) => {
                    const isSelected = selectedColor === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColor(col.name)}
                        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                          isSelected
                            ? "border-[#47352F] bg-[#47352F]/10 text-[#47352F] ring-2 ring-[#47352F]/30"
                            : "border-black/10 bg-white text-black/70 hover:border-black/30"
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Select Size: <strong className="text-black">{selectedSize}</strong>
                </span>
                <Link
                  to="/size-guide"
                  className="text-xs font-medium text-[#47352F] hover:underline"
                >
                  Size Guide & Measurements →
                </Link>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {standardSizes.map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-14 rounded-xl border py-3 text-xs font-bold uppercase transition ${
                        isSelected
                          ? "border-[#47352F] bg-[#47352F] text-white shadow-sm"
                          : "border-black/10 bg-white text-black/80 hover:border-[#47352F]"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag CTA */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl border border-black/10 bg-[#fbf7f0] p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-[#47352F] hover:bg-black/5"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-black">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold text-[#47352F] hover:bg-black/5"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full rounded-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 ${
                  addedAnimation
                    ? "bg-[#E5CFAC] text-[#221b18]"
                    : "bg-[#47352F] text-white hover:bg-[#39291F]"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {addedAnimation
                  ? "✓ Added to Shopping Bag"
                  : product.inStock
                    ? `Add to Bag (${quantity} · ${selectedSize} · ${selectedColor})`
                    : "Currently Sold Out"}
              </button>
            </div>

            {/* Washing & Care Guide */}
            <div className="rounded-[1.5rem] border border-black/10 bg-[#fbf7f0] p-6 space-y-2">
              <h3 className="font-display text-base font-semibold text-[#47352F]">
                Care & Washing Tips
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Gentle machine wash inside out in cold water. Reshape while damp and air dry in
                shade to preserve vibrant colors and playful prints. Do not iron directly on
                graphics.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 border-t border-black/10 pt-16">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="eyebrow text-[#47352F]">Discover More</p>
                <h2 className="font-display text-3xl md:text-4xl">Related Kidswear Styles</h2>
              </div>
              <Link
                to="/shop"
                className="text-xs font-semibold uppercase tracking-wider text-[#47352F] hover:underline"
              >
                View Full Shop →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  to="/product/$id"
                  params={{ id: rel.id }}
                  className="group rounded-3xl border border-black/10 bg-[#fbf7f0] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                    <img
                      src={rel.img}
                      alt={rel.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {rel.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-[#221b18]/90 px-3 py-1 text-[10px] font-semibold text-[#E5CFAC]">
                        {rel.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#47352F]">
                      {rel.category}
                    </p>
                    <h3 className="mt-1 font-display text-lg text-black group-hover:text-[#47352F] line-clamp-1">
                      {rel.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold">{rel.price}</span>
                      <span className="text-xs font-medium text-[#47352F] group-hover:underline">
                        View Product →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
