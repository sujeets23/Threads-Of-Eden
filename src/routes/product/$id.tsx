import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { useCart } from "@/context/CartContext";
import { Check, ShieldCheck, RefreshCw, Truck, ArrowLeft, Edit3 } from "lucide-react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Product — Threads of Eden` },
      {
        name: "description",
        content:
          "Explore luxury t-shirt details, fabric specifications, sizing, and add-to-bag experience.",
      },
    ],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const params = Route.useParams();
  const { getProduct } = useStore();
  const product = useMemo(() => getProduct(params.id), [params.id, getProduct]);
  const { addToCart } = useCart();

  const standardSizes = product?.sizes && product.sizes.length > 0 ? product.sizes : ["S", "M", "L", "XL"];
  const standardColors =
    product?.colors && product.colors.length > 0
      ? product.colors
      : [{ name: "Forest Green", hex: "#2C5D2E" }];

  const [selectedSize, setSelectedSize] = useState<string>(standardSizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState<string>(standardColors[0]?.name || "Standard");
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-lg">
          <p className="eyebrow mb-4 text-[#2C5D2E]">Style Not Found</p>
          <h1 className="font-display text-4xl">This product is no longer active</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Please return to our boutique catalog to explore our current t-shirts and polos.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/shop" className="btn-luxe">
              Back to Catalog
            </Link>
            <Link to="/admin" className="rounded-full border border-black/20 px-6 py-3 text-xs font-semibold uppercase tracking-wider">
              Admin Console
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <section className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        {/* Breadcrumb & Admin Edit Bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/50 hover:text-[#2C5D2E] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Styles</span>
          </Link>

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs font-medium text-black/70 hover:bg-[#2C5D2E] hover:text-white hover:border-[#2C5D2E] transition shadow-xs"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Edit in Admin</span>
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Left: Product Images Gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_30px_90px_rgba(0,0,0,0.06)] aspect-[4/5]">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover"
              />

              {product.badge && (
                <div className="absolute top-6 left-6 rounded-full bg-[#1a2e1b]/95 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#CFF57C] backdrop-blur">
                  {product.badge}
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 via-transparent to-transparent p-8 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">
                  {product.category} Archive
                </p>
                <p className="mt-1 text-sm text-white/80">{product.note}</p>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-2 text-[#2C5D2E]">{product.category}</p>
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
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
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
                        className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${isSelected
                            ? "border-[#2C5D2E] bg-[#2C5D2E]/10 text-[#2C5D2E] ring-2 ring-[#2C5D2E]/30"
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
                  className="text-xs font-medium text-[#2C5D2E] hover:underline"
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
                      className={`min-w-14 rounded-xl border py-3 text-xs font-bold uppercase transition ${isSelected
                          ? "border-[#2C5D2E] bg-[#2C5D2E] text-white shadow-sm"
                          : "border-black/10 bg-white text-black/80 hover:border-[#2C5D2E]"
                        }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={!product.inStock}
                className={`w-full rounded-full py-4 text-center text-xs font-bold uppercase tracking-[0.2em] shadow-lg transition-all duration-300 ${addedAnimation
                    ? "bg-[#CFF57C] text-[#1a2e1b]"
                    : "bg-[#2C5D2E] text-white hover:bg-[#1a3d1b]"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {addedAnimation
                  ? "✓ Added to Shopping Bag"
                  : product.inStock
                    ? `Add to Bag (${selectedSize} · ${selectedColor})`
                    : "Currently Sold Out"}
              </button>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 border-y border-black/5 py-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4 text-[#2C5D2E]" />
                <span className="text-[11px] text-muted-foreground">Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-[#2C5D2E]" />
                <span className="text-[11px] text-muted-foreground">14-Day Free Exchange</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#2C5D2E]" />
                <span className="text-[11px] text-muted-foreground">Zero Shrink Guarantee</span>
              </div>
            </div>

            {/* Fabric Details & Construction */}
            <div className="rounded-[1.5rem] border border-black/10 bg-white p-7 shadow-sm space-y-4">
              <h3 className="font-display text-xl font-medium">Garment Specifications</h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {product.details?.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 rounded-xl bg-[#f7f7f5] p-3 text-xs text-black/80"
                  >
                    <Check className="h-3.5 w-3.5 text-[#2C5D2E] shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Washing & Care Guide */}
            <div className="rounded-[1.5rem] border border-black/10 bg-secondary p-7 space-y-3">
              <h3 className="font-display text-lg">Care & Preservation</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                To maintain the 280 GSM fibers and silken mercerization, machine wash inside-out
                in cold water with gentle liquid detergent. Reshape gently while damp and flat dry
                or hang in shade. Never tumble dry on high heat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
