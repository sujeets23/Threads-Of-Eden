import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Arovia Essentials" },
      { name: "description", content: "Terms and conditions governing the use of Arovia Essentials website and purchases." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  const sections = [
    { title: "Acceptance of Terms", content: "By accessing or using the Arovia Essentials website and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
    { title: "Products & Pricing", content: "All product descriptions and pricing are accurate at the time of publishing. We reserve the right to modify prices without prior notice. Prices are displayed in Indian Rupees (₹) unless otherwise stated." },
    { title: "Orders & Payment", content: "All orders are subject to availability. We reserve the right to refuse any order. Payment must be completed at the time of purchase through our secure payment gateway." },
    { title: "Intellectual Property", content: "All content on this website, including text, images, logos, and designs, is the property of Arovia Essentials and protected by intellectual property laws. Unauthorized use is prohibited." },
    { title: "User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use." },
    { title: "Limitation of Liability", content: "Arovia Essentials shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website." },
    { title: "Governing Law", content: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka." },
    { title: "Contact", content: "For questions about these terms, contact us at legal@aroviaessentials.com." },
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">Terms of Service</h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          {sections.map((s, i) => (
            <div key={s.title} className="border-t border-black/10 py-8">
              <div className="flex gap-6">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <div>
                  <h2 className="font-display text-2xl">{s.title}</h2>
                  <p className="mt-4 text-sm leading-8 text-muted-foreground">{s.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
