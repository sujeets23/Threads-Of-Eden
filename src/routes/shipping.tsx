import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping Info — Threads of Eden" },
      { name: "description", content: "Shipping information and delivery details for Threads of Eden orders." },
    ],
  }),
  component: ShippingPage,
});

function ShippingPage() {
  const options = [
    { method: "Standard Shipping", time: "5–7 business days", cost: "Free on orders above ₹1,499" },
    { method: "Express Shipping", time: "2–3 business days", cost: "₹249" },
    { method: "Next-Day Delivery", time: "1 business day", cost: "₹499" },
    { method: "International Shipping", time: "7–14 business days", cost: "Calculated at checkout" },
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#47352F]">← Back to Home</Link>
          <p className="eyebrow mb-4">Delivery</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Shipping <br /><span className="italic text-[#47352F]">information.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Every order is carefully packaged in sustainable materials and shipped carbon-neutral.
          </p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {options.map((o) => (
              <div key={o.method} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
                <h3 className="font-display text-2xl">{o.method}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{o.time}</p>
                <p className="mt-1 text-sm font-semibold text-[#47352F]">{o.cost}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
