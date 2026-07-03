import { motion } from "framer-motion";
import aroviaLogoText from "@/assets/Images/arovia logo with text.png";
import aroviaLogo from "@/assets/Images/arovia logo.png";

export function Footer() {
  return (
    <footer className="bg-[#1a2e1b] text-white">
      {/* Newsletter Banner */}
      <div className="border-b border-white/10 bg-[#2C5D2E]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 py-16 md:flex-row md:justify-between md:px-12">
          <div className="text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#CFF57C]">Stay Connected</p>
            <p className="mt-3 text-2xl font-light tracking-[-0.02em]">Be the first to discover new arrivals & rituals</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-0 overflow-hidden rounded-full border border-white/20"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-3.5 text-sm placeholder:text-white/40 focus:outline-none"
            />
            <button className="bg-[#CFF57C] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-[#1a2e1b] transition-opacity hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <img
              src={aroviaLogoText}
              alt="Arovia Essentials"
              className="h-10 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Arovia Essentials is a premium botanical skincare brand crafting
              nature-inspired formulations. Founded with a passion for purity and
              sustainability, we blend rare botanicals into rituals that honour
              both your skin and the earth.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <img src={aroviaLogo} alt="Arovia" className="h-8 w-8 opacity-60" />
              <span className="text-xs text-white/30">Crafted with intention since 2024</span>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Shop</p>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Serums", href: "/shop" },
                { label: "Facial Oils", href: "/shop" },
                { label: "Cleansers", href: "/shop" },
                { label: "Balms", href: "/shop" },
                { label: "Gift Sets", href: "/shop" },
                { label: "New Arrivals", href: "/shop" },
                { label: "Best Sellers", href: "/shop" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-white/55 transition-colors hover:text-[#CFF57C]">{li.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Company</p>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Story", href: "/about" },
                { label: "Ingredients", href: "/ingredients" },
                { label: "Sustainability", href: "/sustainability" },
                { label: "Press & Media", href: "/press" },
                { label: "Careers", href: "/careers" },
                { label: "Blog / Journal", href: "/blog" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-white/55 transition-colors hover:text-[#CFF57C]">{li.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Support</p>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "Order Tracking", href: "/order-tracking" },
                { label: "FAQ", href: "/faq" },
                { label: "Ritual Guide", href: "/ritual-guide" },
                { label: "Size Guide", href: "/size-guide" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-white/55 transition-colors hover:text-[#CFF57C]">{li.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Legal</p>
            <ul className="space-y-3.5 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
                { label: "Refund Policy", href: "/refund" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-white/55 transition-colors hover:text-[#CFF57C]">{li.label}</a>
                </li>
              ))}
            </ul>

            <p className="mb-6 mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Follow Us</p>
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="Twitter">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all hover:border-[#CFF57C] hover:text-[#CFF57C]" aria-label="LinkedIn">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mt-20 border-t border-white/10 pt-14">
          <p className="mb-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#CFF57C]">Our Offices</p>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {/* Dubai Office */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Dubai, United Arab Emirates</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  Business Bay, Dubai<br />
                  United Arab Emirates
                </p>
                <a href="mailto:dubai@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  dubai@aroviaessentials.com
                </a>
              </div>
            </div>
            {/* Bangalore Office */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Bangalore, India</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  Karnataka, India
                </p>
                <a href="mailto:india@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  india@aroviaessentials.com
                </a>
              </div>
            </div>
            {/* General Contact */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2C5D2E]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#CFF57C]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-white">General Enquiries</p>
                <p className="mt-2 text-xs leading-relaxed text-white/40">
                  For partnerships, wholesale,<br />
                  and media enquiries
                </p>
                <a href="mailto:hello@aroviaessentials.com" className="mt-3 inline-block text-xs text-[#CFF57C]/70 transition-colors hover:text-[#CFF57C]">
                  hello@aroviaessentials.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges & Payment */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              {["🌿 100% Vegan", "🐰 Cruelty Free", "♻️ Sustainable Packaging", "🧪 Dermatologically Tested", "🌍 Carbon Neutral Shipping"].map((badge) => (
                <span key={badge} className="text-xs text-white/40">{badge}</span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/30">We accept</span>
              {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map((pm) => (
                <span key={pm} className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/40">{pm}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img src={aroviaLogo} alt="Arovia" className="h-5 w-5 opacity-40" />
            <p className="text-xs tracking-wide text-white/30">© 2026 Arovia Essentials — All rights reserved</p>
          </div>
          <p className="text-xs tracking-wide text-white/25">Dubai, UAE · Bangalore, India</p>
        </div>

        {/* Oversized wordmark */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 0.04, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 select-none text-center text-[16vw] font-extralight leading-none tracking-[-0.06em] text-[#CFF57C]"
        >
          Arovia
        </motion.p>
      </div>
    </footer>
  );
}
