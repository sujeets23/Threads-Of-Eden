import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Check, Clock, Package, Truck, Home, AlertCircle, ShoppingBag, MapPin } from "lucide-react";

const searchSchema = z.object({
  orderId: z.string().catch(""),
  email: z.string().catch(""),
});

export const Route = createFileRoute("/order-tracking")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Track Your Order — Threads of Eden" },
      { name: "description", content: "Track your luxury apparel shipment in real-time." },
    ],
  }),
  component: OrderTrackingPage,
});

type OrderStatus = "Placed" | "Processing" | "Shipped" | "Delivered";

interface Order {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  items: {
    id: string;
    name: string;
    price: string;
    quantity: number;
    img: string;
  }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
}

const statusSteps: { status: OrderStatus; label: string; desc: string; icon: any }[] = [
  {
    status: "Placed",
    label: "Order Placed",
    desc: "Your order has been logged into the Threads of Eden atelier register.",
    icon: Clock,
  },
  {
    status: "Processing",
    label: "Inspecting & Packaging",
    desc: "Our team is inspecting, folding, and packaging your garments in organic cotton wash bags.",
    icon: Package,
  },
  {
    status: "Shipped",
    label: "Dispatched",
    desc: "Your parcel is in transit via premium express courier.",
    icon: Truck,
  },
  {
    status: "Delivered",
    label: "Arrived",
    desc: "Garments successfully delivered to your wardrobe.",
    icon: Home,
  },
];

function OrderTrackingPage() {
  const { orderId: searchOrderId, email: searchEmail } = Route.useSearch();

  const [orderIdInput, setOrderIdInput] = useState(searchOrderId || "");
  const [emailInput, setEmailInput] = useState(searchEmail || "");
  const [activeQuery, setActiveQuery] = useState<{ id: string; email: string } | null>(
    searchOrderId && searchEmail ? { id: searchOrderId, email: searchEmail } : null
  );

  const [searched, setSearched] = useState(!!(searchOrderId && searchEmail));
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time periodically for real-time order status calculation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Retrieve matching order
  const order = useMemo<Order | null>(() => {
    if (!activeQuery) return null;
    try {
      const orders: Order[] = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
      const matched = orders.find(
        (o) =>
          o.id.toLowerCase() === activeQuery.id.toLowerCase().trim() &&
          o.email.toLowerCase() === activeQuery.email.toLowerCase().trim()
      );
      return matched || null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [activeQuery]);

  // Dynamically compute/update status based on time elapsed since creation
  const computedStatus = useMemo<OrderStatus>(() => {
    if (!order) return "Placed";

    const createdTime = new Date(order.createdAt).getTime();
    const elapsedSeconds = Math.max(0, (currentTime.getTime() - createdTime) / 1000);

    let status: OrderStatus = "Placed";
    if (elapsedSeconds >= 120) {
      status = "Delivered";
    } else if (elapsedSeconds >= 60) {
      status = "Shipped";
    } else if (elapsedSeconds >= 20) {
      status = "Processing";
    }

    // Sync back to localStorage if status has changed
    if (order.status !== status) {
      try {
        const orders: Order[] = JSON.parse(localStorage.getItem("arovia_orders") || "[]");
        const updated = orders.map((o) => (o.id === order.id ? { ...o, status } : o));
        localStorage.setItem("arovia_orders", JSON.stringify(updated));
        order.status = status; // local mutation for direct view update
      } catch (e) {
        console.error("Error syncing status to localStorage", e);
      }
    }

    return status;
  }, [order, currentTime]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery({ id: orderIdInput, email: emailInput });
    setSearched(true);
  };

  // Stepper helper
  const getStepIndex = (status: OrderStatus) => {
    if (status === "Placed") return 0;
    if (status === "Processing") return 1;
    if (status === "Shipped") return 2;
    return 3;
  };

  const currentStepIndex = getStepIndex(computedStatus);

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-6 inline-flex items-center gap-2 text-[#2C5D2E] hover:text-black transition-colors">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-3">Ritual Tracker</p>
          <h1 className="font-display text-4xl leading-[1.02] md:text-6xl">
            Track your <span className="italic text-[#2C5D2E]">consignment.</span>
          </h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <div className="grid gap-12 lg:grid-cols-[400px_1fr]">
            {/* Input Form Column */}
            <div>
              <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4 mb-6">
                  Consignment details
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Order ID</label>
                    <input
                      type="text"
                      value={orderIdInput}
                      onChange={(e) => setOrderIdInput(e.target.value)}
                      placeholder="e.g. AE-2026-XXXXX"
                      required
                      className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">Email Address</label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Checkout email address"
                      required
                      className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-3 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                    />
                  </div>
                  <button type="submit" className="w-full rounded-full bg-[#2C5D2E] py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-md shadow-[#2C5D2E]/10 transition hover:bg-[#1a3d1b]">
                    Search Consignment
                  </button>
                </form>

                {searched && !order && (
                  <div className="mt-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-800 leading-normal">
                    <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0" />
                    <div>
                      <p className="font-semibold">Tracking record not found</p>
                      <p className="mt-1 text-red-700/90">
                        We couldn't locate an order with ID <strong>{orderIdInput}</strong> associated with that email. Please check your verification code and try again.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tracking Progress Column */}
            <div>
              {order ? (
                <div className="space-y-8">
                  {/* Real-time notice */}
                  {computedStatus !== "Delivered" && (
                    <div className="rounded-2xl border border-[#2C5D2E]/25 bg-[#2C5D2E]/5 p-5 text-xs text-[#2C5D2E]/90 flex items-start gap-3">
                      <Clock className="h-4.5 w-4.5 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                        <p className="font-semibold uppercase tracking-wider text-[9px]">Live Demonstration Mode</p>
                        <p className="mt-1 leading-normal">
                          For test review, this shipment updates automatically: <br />
                          <strong>Preparation</strong> starts at +20s, <strong>Dispatch</strong> at +60s, and <strong>Arrival</strong> at +120s from order creation.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Visual Stepper */}
                  <div className="rounded-[2rem] border border-black/10 bg-white p-8 md:p-10 shadow-sm space-y-10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#2C5D2E]">Consignment Status</p>
                        <h3 className="font-display text-3xl mt-1 text-black">
                          {computedStatus === "Placed" && "Confirmed"}
                          {computedStatus === "Processing" && "Botanicals Preparing"}
                          {computedStatus === "Shipped" && "In Transit"}
                          {computedStatus === "Delivered" && "Delivered"}
                        </h3>
                      </div>
                      <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-lg bg-secondary text-black">
                        {order.id}
                      </span>
                    </div>

                    {/* Progress steps */}
                    <div className="relative pl-8 space-y-10">
                      {/* Vertical connector line */}
                      <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-black/5">
                        <motion.div
                          className="w-full bg-[#2C5D2E] origin-top"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: currentStepIndex / 3 }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          style={{ height: "100%" }}
                        />
                      </div>

                      {statusSteps.map((step, idx) => {
                        const isDone = idx < currentStepIndex;
                        const isActive = idx === currentStepIndex;
                        const StepIcon = step.icon;

                        return (
                          <div key={idx} className="relative flex gap-5">
                            {/* Step Node */}
                            <div className="absolute -left-[27px] flex h-[28px] w-[28px] items-center justify-center rounded-full z-10 transition-all duration-500">
                              {isDone ? (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#2C5D2E] text-white">
                                  <Check className="h-4.5 w-4.5" />
                                </div>
                              ) : isActive ? (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#2C5D2E]/10 border-2 border-[#2C5D2E] text-[#2C5D2E] animate-pulse">
                                  <StepIcon className="h-3.5 w-3.5" />
                                </div>
                              ) : (
                                <div className="flex h-full w-full items-center justify-center rounded-full bg-[#f7f7f5] border border-black/10 text-black/30">
                                  <StepIcon className="h-3.5 w-3.5" />
                                </div>
                              )}
                            </div>

                            {/* Step Description */}
                            <div className="pt-0.5">
                              <h4
                                className={`text-sm font-semibold uppercase tracking-wider ${
                                  isActive
                                    ? "text-[#2C5D2E]"
                                    : isDone
                                    ? "text-black"
                                    : "text-black/30"
                                }`}
                              >
                                {step.label}
                              </h4>
                              <p className="mt-1 text-xs text-muted-foreground leading-normal max-w-md">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Consignment items list */}
                  <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm space-y-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#2C5D2E] border-b border-black/5 pb-4">
                      Consignment Items
                    </h3>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4 items-center">
                          <img src={item.img} alt={item.name} className="h-14 w-12 object-cover rounded bg-secondary shrink-0" />
                          <div className="flex-1 flex justify-between text-xs">
                            <div>
                              <h4 className="font-medium text-black">{item.name}</h4>
                              <p className="text-muted-foreground mt-0.5">Quantity: {item.quantity}</p>
                            </div>
                            <span className="font-semibold text-black">{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-black/5 pt-4 space-y-4 text-xs text-muted-foreground">
                      <div className="flex justify-between items-start gap-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-[#2C5D2E]" /> Delivery Address:
                        </span>
                        <span className="text-right text-black font-medium max-w-[240px] leading-relaxed">
                          {order.address}
                        </span>
                      </div>

                      <div className="border-t border-black/5 pt-3 flex justify-between items-center gap-4">
                        <span>Payment Status:</span>
                        {(order as any).paymentVerified ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2C5D2E]/10 px-3 py-1 text-[11px] font-semibold text-[#2C5D2E] border border-[#2C5D2E]/15">
                            🛡️ Verified Payment (Z+) via Razorpay
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 text-[11px] font-semibold text-yellow-800 border border-yellow-100">
                            Awaiting COD Authentication
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-black/10 rounded-[2rem] bg-[#f7f7f5]/40 h-full min-h-[300px]">
                  <ShoppingBag className="h-10 w-10 text-black/20" />
                  <h3 className="font-display text-2xl mt-4">Awaiting Consignment Search</h3>
                  <p className="mt-2 text-xs text-muted-foreground max-w-[280px]">
                    Enter your Order ID and contact email address on the left side panel to track your apparel shipment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
