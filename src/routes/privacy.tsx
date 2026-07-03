import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Arovia Essentials" },
      { name: "description", content: "Arovia Essentials privacy policy. How we collect, use, and protect your personal information." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const sections = [
    { title: "Information We Collect", content: "We collect information you provide directly, such as your name, email address, shipping address, and payment details when you make a purchase. We also collect browsing data through cookies to improve your shopping experience." },
    { title: "How We Use Your Information", content: "Your information is used to process orders, provide customer support, send order updates, and personalize your experience. With your consent, we may send promotional emails about new products and collections." },
    { title: "Data Protection", content: "We use industry-standard SSL encryption to protect your data. Payment information is processed securely through PCI-DSS compliant payment processors. We never store your full credit card details." },
    { title: "Cookies", content: "We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our website. You can manage cookie preferences through your browser settings." },
    { title: "Third-Party Sharing", content: "We do not sell your personal information. We share data only with trusted service providers who assist in order fulfillment, payment processing, and website analytics." },
    { title: "Your Rights", content: "You have the right to access, correct, or delete your personal data. You can unsubscribe from marketing emails at any time. Contact privacy@aroviaessentials.com for data-related requests." },
    { title: "Data Retention", content: "We retain your data for as long as necessary to provide our services and comply with legal obligations. Order records are kept for 7 years for tax and accounting purposes." },
    { title: "Updates to This Policy", content: "We may update this privacy policy periodically. Significant changes will be communicated via email. Last updated: July 2026." },
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">Privacy Policy</h1>
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
