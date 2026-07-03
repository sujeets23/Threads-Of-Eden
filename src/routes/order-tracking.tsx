import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/order-tracking")({
  head: () => ({
    meta: [
      { title: "Order Tracking — Arovia Essentials" },
      { name: "description", content: "Track your Arovia Essentials order. Enter your order number to check delivery status." },
    ],
  }),
  component: OrderTrackingPage,
});

function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Orders</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Track your<br /><span className="italic text-[#2C5D2E]">order.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[600px] px-6 md:px-12">
          <div className="rounded-[2rem] border border-black/10 bg-white p-10 shadow-lg">
            <p className="eyebrow mb-6 text-[#2C5D2E]">Enter your details</p>
            <form
              onSubmit={(e) => { e.preventDefault(); setSearched(true); }}
              className="space-y-6"
            >
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Order Number</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. AE-2026-XXXXX"
                  required
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  placeholder="The email used during checkout"
                  required
                  className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#2C5D2E]"
                />
              </div>
              <button type="submit" className="btn-luxe w-full justify-center">Track Order →</button>
            </form>

            {searched && (
              <div className="mt-8 rounded-xl border border-[#2C5D2E]/20 bg-[#2C5D2E]/5 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  No order found for <strong>{orderNumber}</strong>. Please check your order number and try again, or <Link to="/contact" className="text-[#2C5D2E] underline">contact our support team</Link>.
                </p>
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Can't find your order? <Link to="/contact" className="text-[#2C5D2E]">Contact us</Link> or check your confirmation email.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
