import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Exchanges — Arovia Essentials" },
      { name: "description", content: "Our returns and exchanges policy. Hassle-free returns within 30 days." },
    ],
  }),
  component: ReturnsPage,
});

function ReturnsPage() {
  const policies = [
    { title: "30-Day Returns", desc: "Return any unopened product within 30 days of delivery for a full refund." },
    { title: "Free Return Shipping", desc: "We cover return shipping costs for all domestic orders within India." },
    { title: "Exchange Program", desc: "Not the right product? Exchange it for something that suits your ritual better." },
    { title: "Damaged Items", desc: "Contact us within 48 hours with photos. We'll send a replacement immediately." },
  ];

  const steps = [
    "Contact our support team at returns@aroviaessentials.com",
    "Receive your prepaid return label via email within 24 hours",
    "Pack the product in its original packaging and ship it back",
    "Refund processed within 5–7 business days of receiving the return",
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Returns</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Returns &<br /><span className="italic text-[#2C5D2E]">exchanges.</span>
          </h1>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {policies.map((p) => (
              <div key={p.title} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20">
            <p className="eyebrow mb-6">How it works</p>
            <div className="space-y-0">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-6 border-t border-black/10 py-6">
                  <span className="font-display text-2xl text-[#2C5D2E]">0{i + 1}</span>
                  <p className="text-base text-muted-foreground">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
