import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/context/StoreContext";
import logo from "@/assets/top right logo.png";

export function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-[#f3efe7] text-[#3b2d29]">
      <div className="border-b border-[#4c3129]/10 bg-[#4c3129] text-[#f5efe8]">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-8 px-6 py-14 md:flex-row md:justify-between md:px-12">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d9c08c]">
              Join the Adventure
            </p>
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
              <img
                src={logo}
                alt="Threads of Eden logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#3b2d29]/70 font-light">
              Playful, comfortable t-shirts made for little ones and all their everyday adventures.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-xs text-[#3b2d29]/60">
                Made for everyday adventures · Threads of Eden
              </span>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">
              The Collection
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "All Products", href: "/shop" },
                { label: "Men T-Shirts", href: "/shop?category=Men+T-Shirts" },
                { label: "Kids T-Shirts", href: "/shop?category=Kids+T-Shirts" },
                { label: "Women T-Shirts", href: "/shop?category=Women+T-Shirts" },
                { label: "Unisex Hoodie", href: "/shop?category=Unisex+Hoodie" },
                { label: "LED Photo Frame", href: "/shop?category=LED+Photo+Frame" },
                { label: "Regular Photo Frame", href: "/shop?category=Regular+Photo+Frame" },
              ].map((li) => (
                <li key={li.label}>
                  <a
                    href={li.href}
                    className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]"
                  >
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">
              About Us
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Our Story", href: "/about" },
                { label: "Size & Fit Guide", href: "/size-guide" },
                { label: "Garment Care", href: "/ritual-guide" },
                { label: "Sustainability", href: "/sustainability" },
              ].map((li) => (
                <li key={li.label}>
                  <a
                    href={li.href}
                    className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]"
                  >
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">
              Account & Help
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/login"
                  className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]"
                >
                  Sign In / My Account
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
                  <a
                    href={li.href}
                    className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]"
                  >
                    {li.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#c39a5b]">
              Legal
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Refund Policy", href: "/refund" },
              ].map((li) => (
                <li key={li.label}>
                  <a
                    href={li.href}
                    className="text-[#3b2d29]/75 transition-colors hover:text-[#4c3129]"
                  >
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
            <span>7-Day Return & Replacement Policy</span>
            <span>·</span>
            <span>Worldwide Express Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
