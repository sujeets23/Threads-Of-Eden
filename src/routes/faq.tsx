import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Threads of Eden" },
      {
        name: "description",
        content: "Frequently asked questions about kids' t-shirts, sizing, shipping, and returns.",
      },
    ],
  }),
  component: FAQPage,
});

const FAQS = [
  {
    category: "Apparel & Fit",
    items: [
      {
        q: "What t-shirt styles do you offer?",
        a: "Shop kids' oversized t-shirts, polo t-shirts, round neck t-shirts, and Christmas edition tees.",
      },
      {
        q: "How do I choose the right size?",
        a: "Use your child's height and chest measurement with our Kids' Size Guide. If they are between sizes, consider sizing up for extra room.",
      },
      {
        q: "What sizes are available?",
        a: "Our size range runs from 2-3Y to 12-13Y. Availability can vary by product.",
      },
      {
        q: "How should I care for the t-shirts?",
        a: "Follow the care instructions on each garment's label. We recommend checking the label before washing.",
      },
    ],
  },
  {
    category: "Orders & Shipping",
    items: [
      {
        q: "How long does shipping take?",
        a: "Standard express delivery within India takes 3–5 business days. International shipping arrives in 6–10 business days.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to over 30 countries with full end-to-end tracking.",
      },
      {
        q: "Is shipping free?",
        a: "All orders above ₹1,999 qualify for complimentary express shipping.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return & exchange policy?",
        a: "Every piece is custom-made to order, so returns or exchanges for wrong size or change of mind are not possible. However, if your order arrives damaged, misprinted, or defective, claims can be raised within 7 days of delivery with an unboxing video, clear photos of the defect, and packaging photos.",
      },
      {
        q: "What do I need to provide for a claim on damaged or defective items?",
        a: "Please provide an unboxing video of your package, clear pictures of the defect, and photos of the original packaging within 7 days of delivery. Once verified, a replacement order is placed within 2 business days or a refund is processed within 6–10 working days.",
      },
      {
        q: "Can I exchange for a different size if it doesn't fit?",
        a: "Since all garments are custom-made to order, we cannot process exchanges for wrong size or preference. Please be sure to review our detailed Size Guide before placing your order.",
      },
    ],
  },
];

function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#47352F]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4">Kidswear Help Centre</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Frequently asked
            <br />
            <span className="italic text-[#47352F]">questions.</span>
          </h1>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          {FAQS.map((section) => (
            <div key={section.category} className="mb-16">
              <p className="eyebrow mb-6 text-[#47352F]">{section.category}</p>
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
                        <span className="flex-shrink-0 text-[#47352F] text-xl">
                          {isOpen ? "−" : "+"}
                        </span>
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
          <div className="rounded-[1.7rem] border border-black/10 bg-[#47352F] p-8 text-center text-white">
            <h3 className="font-display text-2xl">Still have questions?</h3>
            <p className="mt-3 text-sm text-white/70">Our team is here to help.</p>
            <div className="mt-6">
              <Link to="/contact" className="btn-luxe-inverse">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
