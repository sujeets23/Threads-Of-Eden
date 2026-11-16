import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/context/StoreContext";
import logo from "@/assets/Images/logo.jpeg";

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-[#f3efe7] text-[#3b2d29]">
      <div className="border-b border-[#4c3129]/10 bg-[#4c3129] text-[#f5efe8]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 py-14 md:flex-row md:justify-between md:px-12">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d9c08c]">Join the Adventure</p>
            <p className="mt-2 text-2xl font-light tracking-[-0.02em] text-[#f5efe8]">
              Be the first to hear about new styles and festive drops
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md items-center gap-0 overflow-hidden rounded-full border border-white/20 bg-white/5"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent px-6 py-3.5 text-sm text-[#f5efe8] placeholder:text-[#f5efe8]/50 focus:outline-none"
            />
            <button className="bg-[#d9c08c] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-[#3b2d29] transition-opacity hover:opacity-90">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Threads of Eden logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#3b2d29]/70 font-light">
              Playful, comfortable t-shirts made for little ones and all their everyday adventures.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-[#3b2d29]/60">Made for everyday adventures · Threads of Eden</span>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">The Collection</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "All Kids' T-Shirts", href: "/shop" },
                { label: "Oversized T-Shirts", href: "/shop" },
                { label: "Polo T-Shirts", href: "/shop" },
                { label: "Round Neck T-Shirts", href: "/shop" },
                { label: "Christmas Edition", href: "/shop" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]">
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">About Us</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Fabrics & Fiber", href: "/ingredients" },
                { label: "Size & Fit Guide", href: "/size-guide" },
                { label: "Garment Care", href: "/ritual-guide" },
                { label: "Sustainability", href: "/sustainability" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]">
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">Management</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#4c3129]/30 bg-[#4c3129]/5 px-2.5 py-1 text-xs font-semibold text-[#4c3129] transition hover:bg-[#4c3129] hover:text-[#f3efe7]"
                >
                  ⚙️ Admin Console
                </a>
              </li>
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Order Tracking", href: "/order-tracking" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Returns & Exchanges", href: "/returns" },
                { label: "FAQ", href: "/faq" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]">
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">Legal</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Refund Policy", href: "/refund" },
              ].map((li) => (
                <li key={li.label}>
                  <a href={li.href} className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]">
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-[#4c3129]/10 pt-8 md:flex-row">
          <p className="text-xs tracking-wide text-[#3b2d29]/60">
            © 2026 {settings.brandName || "Threads of Eden"} — All rights reserved
          </p>
          <div className="flex items-center gap-4 text-xs text-[#3b2d29]/60">
            <a href="/admin" className="text-[#4c3129] hover:underline">
              Admin Portal
            </a>
            <span>·</span>
            <span>Worldwide Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
