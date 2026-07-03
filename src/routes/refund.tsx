import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Arovia Essentials" },
      { name: "description", content: "Arovia Essentials refund policy. Learn about eligibility, timelines, and how to request a refund." },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Policy</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">Refund Policy</h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12 space-y-12">
          <div>
            <h2 className="font-display text-3xl">Eligibility</h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Products must be returned in their original, unopened packaging within 30 days of delivery. Items that have been opened, used, or damaged by the customer are not eligible for refund.
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl">Refund Timeline</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { step: "Return Received", time: "1–2 days inspection" },
                { step: "Refund Processed", time: "3–5 business days" },
                { step: "Amount Credited", time: "5–7 business days" },
              ].map((s) => (
                <div key={s.step} className="rounded-[1.7rem] border border-black/10 bg-white p-6 text-center shadow-sm">
                  <p className="font-display text-lg">{s.step}</p>
                  <p className="mt-2 text-sm text-[#2C5D2E]">{s.time}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-3xl">Non-Refundable Items</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Gift cards and promotional items</li>
              <li>• Products marked as final sale</li>
              <li>• Items purchased during clearance events</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl">How to Request a Refund</h2>
            <p className="mt-4 text-sm leading-8 text-muted-foreground">
              Email returns@aroviaessentials.com with your order number, the item(s) you'd like to return, and the reason. Our team will respond within 24 hours with a prepaid return label.
            </p>
          </div>
          <div className="rounded-[1.7rem] border border-black/10 bg-[#2C5D2E] p-8 text-center text-white">
            <h3 className="font-display text-2xl">Need help?</h3>
            <p className="mt-2 text-sm text-white/70">Our support team is ready to assist.</p>
            <div className="mt-6">
              <Link to="/contact" className="btn-luxe-inverse">Contact Us →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
