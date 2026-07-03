import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — Arovia Essentials" },
      { name: "description", content: "How Arovia Essentials uses cookies to improve your browsing experience." },
    ],
  }),
  component: CookiePage,
});

function CookiePage() {
  const cookies = [
    { type: "Essential Cookies", purpose: "Required for the website to function properly. These cannot be disabled.", examples: "Session management, shopping cart, security tokens" },
    { type: "Analytics Cookies", purpose: "Help us understand how visitors interact with our website to improve performance.", examples: "Page views, time on site, navigation paths" },
    { type: "Marketing Cookies", purpose: "Used to deliver relevant advertisements and measure campaign effectiveness.", examples: "Ad tracking, retargeting, social media pixels" },
    { type: "Preference Cookies", purpose: "Remember your settings and preferences for a better experience.", examples: "Language preference, currency selection, display settings" },
  ];

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">← Back to Home</Link>
          <p className="eyebrow mb-4">Legal</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">Cookie Policy</h1>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: July 2026</p>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <p className="text-base leading-8 text-muted-foreground">
            Arovia Essentials uses cookies and similar technologies to provide, protect, and improve our website. This policy explains what cookies are, how we use them, and your choices.
          </p>
          <div className="mt-16 space-y-6">
            {cookies.map((c) => (
              <div key={c.type} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
                <h3 className="font-display text-2xl">{c.type}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{c.purpose}</p>
                <p className="mt-3 text-xs text-muted-foreground"><span className="font-medium text-[#2C5D2E]">Examples:</span> {c.examples}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-black/10 pt-8">
            <h3 className="font-display text-xl">Managing Your Cookies</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website. For questions, contact privacy@aroviaessentials.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
