import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Threads of Eden" },
      { name: "description", content: "Get in touch with Threads of Eden. Reach our offices in Dubai and Bangalore for enquiries, partnerships, and support." },
    ],
  }),
  component: ContactPage,
});

const OFFICES = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Business Bay, Dubai\nUnited Arab Emirates",
    email: "dubai@threadandroots.com",
    phone: "+971 4 XXX XXXX",
  },
  {
    city: "Bangalore",
    country: "India",
    address: "Karnataka, India",
    email: "india@threadandroots.com",
    phone: "+91 80 XXXX XXXX",
  },
];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-background text-foreground">
      <section className="bg-secondary py-20 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#47352F] transition-colors hover:text-[#47352F]/70">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4">Get in Touch</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            We'd love to
            <br />
            <span className="italic text-[#47352F]">hear from you.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
            Whether you have a question about our products, need assistance with an order, or are interested
            in partnerships — our team is here to help.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
            {/* Contact Form */}
            <div>
              <p className="eyebrow mb-6">Send us a message</p>
              {submitted ? (
                <div className="rounded-[2rem] border border-[#47352F]/20 bg-[#47352F]/5 p-12 text-center">
                  <span className="text-4xl">✓</span>
                  <h3 className="mt-4 font-display text-2xl">Message sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">First Name</label>
                      <input type="text" required className="w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#47352F]" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Last Name</label>
                      <input type="text" required className="w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#47352F]" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Email</label>
                    <input type="email" required className="w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#47352F]" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Subject</label>
                    <select className="w-full rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#47352F]">
                      <option>General Enquiry</option>
                      <option>Order Support</option>
                      <option>Wholesale / Partnership</option>
                      <option>Press / Media</option>
                      <option>Returns & Exchanges</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">Message</label>
                    <textarea rows={5} required className="w-full resize-none rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm outline-none transition-colors focus:border-[#47352F]" />
                  </div>
                  <button type="submit" className="btn-luxe">Send Message →</button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <p className="eyebrow mb-6">Our Offices</p>
              <div className="space-y-6">
                {OFFICES.map((office) => (
                  <div key={office.city} className="rounded-[1.7rem] border border-black/10 bg-white p-8 shadow-sm">
                    <h3 className="font-display text-2xl">{office.city}, {office.country}</h3>
                    <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{office.address}</p>
                    <div className="mt-4 space-y-2">
                      <a href={`mailto:${office.email}`} className="block text-sm text-[#47352F] transition-colors hover:text-[#47352F]/70">{office.email}</a>
                      <p className="text-sm text-muted-foreground">{office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.7rem] border border-black/10 bg-secondary p-8">
                <h3 className="font-display text-xl">General Enquiries</h3>
                <p className="mt-3 text-sm text-muted-foreground">For partnerships, wholesale, and media enquiries</p>
                <a href="mailto:hello@threadandroots.com" className="mt-3 block text-sm text-[#47352F]">hello@threadandroots.com</a>
              </div>

              <div className="mt-8 rounded-[1.7rem] border border-black/10 bg-[#47352F] p-8 text-white">
                <h3 className="font-display text-xl">Business Hours</h3>
                <div className="mt-4 space-y-2 text-sm text-white/70">
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
