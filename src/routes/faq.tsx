import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Arovia Essentials" },
      { name: "description", content: "Frequently asked questions about Arovia Essentials products, shipping, returns, and more." },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  { category: "Products", items: [
    { q: "Are your products suitable for sensitive skin?", a: "Yes, all Arovia Essentials products are dermatologically tested and formulated without harsh chemicals. However, we always recommend a patch test before first use." },
    { q: "Are your products vegan and cruelty-free?", a: "Absolutely. Every product is 100% vegan and never tested on animals. We are proudly cruelty-free certified." },
    { q: "What is the shelf life of your products?", a: "Our products have a shelf life of 12–18 months from opening. Each product displays a Period After Opening (PAO) symbol." },
    { q: "Do you use any artificial fragrances?", a: "Never. All scents come from natural essential oils and botanical extracts." },
  ]},
  { category: "Orders & Shipping", items: [
    { q: "How long does shipping take?", a: "Standard shipping within India takes 5–7 business days. Express options are available for 2–3 day delivery." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 30 countries. International delivery takes 7–14 business days." },
    { q: "Is shipping free?", a: "Domestic orders above ₹1,499 qualify for free standard shipping. All other orders incur a flat ₹249 shipping fee." },
  ]},
  { category: "Returns & Refunds", items: [
    { q: "What is your return policy?", a: "We accept returns of unopened products within 30 days of delivery. Please visit our Returns page for details." },
    { q: "How do I initiate a return?", a: "Email returns@aroviaessentials.com with your order number and reason for return. We'll send a prepaid return label." },
  ]},
];

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Help Centre</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Frequently asked<br /><span className="italic text-[#2C5D2E]">questions.</span>
          </h1>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          {FAQS.map((section) => (
            <div key={section.category} className="mb-16">
              <p className="eyebrow mb-6 text-[#2C5D2E]">{section.category}</p>
              <div className="space-y-0">
                {section.items.map((faq) => {
                  const key = `${section.category}-${faq.q}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key} className="border-t border-black/10">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : key)}
                        className="flex w-full items-center justify-between py-6 text-left"
                      >
                        <h3 className="font-display text-lg pr-4">{faq.q}</h3>
                        <span className="flex-shrink-0 text-[#2C5D2E] text-xl">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <p className="pb-6 text-sm leading-7 text-muted-foreground">{faq.a}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div className="rounded-[1.7rem] border border-black/10 bg-[#2C5D2E] p-8 text-center text-white">
            <h3 className="font-display text-2xl">Still have questions?</h3>
            <p className="mt-3 text-sm text-white/70">Our team is here to help.</p>
            <div className="mt-6">
              <Link to="/contact" className="btn-luxe-inverse">Contact Us →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
