import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { CheckCircle2, Package, MapPin, Calendar, Clipboard } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";

const searchSchema = z.object({
  orderId: z.string().catch(""),
});

export const Route = createFileRoute("/order-confirmation")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Order Confirmed — Arovia Essentials" },
      { name: "description", content: "Thank you for your purchase. Your luxury botanical order has been confirmed." },
    ],
  }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const { orderId } = Route.useSearch();

  // Load order details from local storage
  const order = useMemo(() => {
    if (!orderId) return null;
    try {
      const orders = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
      return orders.find((o: any) => o.id === orderId) || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [orderId]);

  const copyToClipboard = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      toast.success("Order ID copied to clipboard");
    }
  };

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-6 py-24 text-center">
        <div className="max-w-md rounded-3xl border border-black/10 bg-white p-10 shadow-lg">
          <p className="eyebrow mb-4">Confirmation</p>
          <h1 className="font-display text-4xl">Order not found</h1>
          <p className="mt-4 text-sm text-muted-foreground">The requested order confirmation is not available.</p>
          <div className="mt-8">
            <Link to="/" className="btn-luxe">Return Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-[800px] px-6 py-20 md:px-12 md:py-28">
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2C5D2E]/10 text-[#2C5D2E]"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          
          <div>
            <p className="eyebrow mb-2">Thank you for your purchase</p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              Your ritual is being <br />
              <span className="italic text-[#2C5D2E]">prepared.</span>
            </h1>
          </div>

          <div className="w-full max-w-md rounded-2xl border border-[#2C5D2E]/15 bg-[#f5f7f2] p-5 flex items-center justify-between gap-4">
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Order ID</p>
              <p className="text-base font-semibold text-black mt-1 font-mono">{orderId}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-black/60 hover:bg-black/5 transition-colors"
            >
              <Clipboard className="h-3.5 w-3.5" /> Copy
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Summary */}
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4 flex items-center gap-2">
              <Package className="h-4 w-4" /> Order Summary
            </h2>
            
            <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <img src={item.img} alt={item.name} className="h-12 w-10 object-cover rounded bg-secondary shrink-0" />
                  <div className="flex-1 flex justify-between text-xs">
                    <div>
                      <h4 className="font-medium text-black line-clamp-1">{item.name}</h4>
                      <p className="text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-black">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-black/5 pt-4 space-y-2.5 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-black">₹{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18% GST)</span>
                <span className="font-medium text-black">₹{order.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-black">
                  {order.shipping === 0 ? "Free" : `₹${order.shipping}`}
                </span>
              </div>
              <div className="border-t border-black/5 pt-3 flex justify-between items-end text-sm font-semibold">
                <span className="text-black uppercase tracking-wider">Total Paid</span>
                <span className="text-lg text-[#2C5D2E]">₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm space-y-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Shipping & Delivery
            </h2>

            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground">
              <div>
                <p className="font-semibold text-black uppercase tracking-wider text-[9px] mb-1">Customer</p>
                <p className="text-black font-medium">{order.name}</p>
                <p>{order.phone}</p>
              </div>

              <div>
                <p className="font-semibold text-black uppercase tracking-wider text-[9px] mb-1">Shipping Address</p>
                <p className="text-black font-medium">{order.address}</p>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-[#f7f7f5] p-4 text-xs text-muted-foreground mt-4">
                <Calendar className="h-4 w-4 text-[#2C5D2E] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-black uppercase tracking-wider text-[9px]">Estimated Delivery</p>
                  <p className="mt-1">
                    Your luxury botanical parcel will arrive in 2-3 business days. You can track its preparation in real-time.
                  </p>
                </div>
              </div>

              {order.paymentVerified ? (
                <div className="rounded-xl border border-[#2C5D2E]/15 bg-[#2C5D2E]/5 p-4 text-xs text-muted-foreground mt-4 space-y-1">
                  <p className="font-semibold text-[#2C5D2E] uppercase tracking-wider text-[9px] flex items-center gap-1">
                    🛡️ Secure Verified Payment (Z+)
                  </p>
                  <p className="text-black font-medium">{order.paymentMethod}</p>
                  <p className="text-[10px]">
                    Transaction Ref: <span className="font-mono text-black/75">{order.razorpayPaymentId}</span>
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-black/5 bg-[#f7f7f5] p-4 text-xs text-muted-foreground mt-4 space-y-1">
                  <p className="font-semibold text-black uppercase tracking-wider text-[9px]">
                    Payment Method
                  </p>
                  <p className="text-black font-medium">{order.paymentMethod || "Cash on Delivery"}</p>
                  <p className="text-[10px]">Awaiting signature verification on delivery.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Track Order Button */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            to="/order-tracking"
            search={{ orderId: order.id, email: order.email }}
            className="rounded-full bg-[#2C5D2E] px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-[#2C5D2E]/10 transition hover:bg-[#1a3d1b]"
          >
            Track Order Progress →
          </Link>
          <Link to="/" className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 hover:text-[#2C5D2E] transition-colors">
            Return to Boutique
          </Link>
        </div>
      </section>
    </main>
  );
}
