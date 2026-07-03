import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

export function CartDrawer() {
  const { items, cartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    setCartOpen(false);
    router.navigate({ to: "/checkout" });
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-black/5"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-[#2C5D2E]" />
                <span className="text-sm font-semibold uppercase tracking-[0.15em] text-black">
                  Shopping Bag ({cartCount})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-black/40 hover:bg-[#f7f7f5] hover:text-black transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f7f5] text-black/30">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl">Your bag is empty</h3>
                    <p className="mt-2 text-xs text-muted-foreground max-w-[240px] mx-auto">
                      Fill it with our cold-pressed botanical formulations to start your ritual.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="rounded-full border border-[#2C5D2E] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#2C5D2E] transition hover:bg-[#2C5D2E] hover:text-white"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="flex gap-4 border-b border-black/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      <img
                        src={item.product.img}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-2">
                          <h4 className="text-sm font-medium text-black line-clamp-1 leading-snug">
                            {item.product.name}
                          </h4>
                          <span className="text-sm font-semibold text-black shrink-0">
                            {item.product.price}
                          </span>
                        </div>
                        <p className="mt-0.5 text-[10px] uppercase tracking-wider text-[#2C5D2E]/85">
                          {item.product.category}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-black/10 rounded-full bg-[#f7f7f5] px-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.product.id ? item.quantity - 1 : 0)}
                            className="p-1.5 text-black/50 hover:text-black transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-black/50 hover:text-black transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="flex items-center gap-1.5 text-xs text-black/40 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-black/5 bg-[#f7f7f5] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-black/60">
                    Subtotal
                  </span>
                  <span className="text-xl font-semibold text-black">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-normal">
                  Shipping, taxes, and luxury ritual packaging calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-full bg-[#2C5D2E] py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-[#2C5D2E]/10 transition hover:bg-[#1a3d1b]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
