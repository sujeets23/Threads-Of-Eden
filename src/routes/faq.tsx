import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Threads of Eden" },
      { name: "description", content: "Frequently asked questions about Threads of Eden t-shirts, polos, sizing, shipping, and returns." },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  { category: "Apparel & Fit", items: [
    { q: "How do your t-shirts and polos fit?", a: "Our polos and Supima crewnecks follow a tailored true-to-size European cut. Our heavyweight 280 GSM oversized tees are designed with relaxed, dropped shoulders. Consult our Size & Fit Guide for exact chest and length measurements." },
    { q: "Will my cotton t-shirt shrink after washing?", a: "No. All Threads of Eden cotton is pre-washed and heat-set during production to ensure zero shrinkage when following our cold wash and hang dry instructions." },
    { q: "What does 280 GSM mean?", a: "GSM stands for Grams per Square Meter. Standard t-shirts are 140–160 GSM. At 280 GSM, our heavyweight fabric delivers an architectural drape, opaque coverage, and exceptional durability." },
    { q: "Are your buttons real mother of pearl?", a: "Yes. All Threads of Eden polos feature authentic Australian ocean shell buttons, laser-engraved and cross-stitched for enduring resilience." },
  ]},
  { category: "Orders & Shipping", items: [
    { q: "How long does shipping take?", a: "Standard express delivery within India takes 3–5 business days. International shipping arrives in 6–10 business days." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 30 countries with full end-to-end tracking." },
    { q: "Is shipping free?", a: "All orders above ₹1,999 qualify for complimentary express shipping." },
  ]},
  { category: "Returns & Exchanges", items: [
    { q: "What is your exchange policy?", a: "We offer complimentary 14-day size exchanges on all unworn garments with original tags intact." },
    { q: "How do I initiate a return or exchange?", a: "Email returns@threadandroots.com with your Order ID and size exchange request. Our team will arrange a prompt reverse pickup." },
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
