import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/refund")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Threads of Eden" },
      {
        name: "description",
        content:
          "Threads of Eden Refund Policy: return, exchange, replacement, and refund terms for custom made-to-order apparel.",
      },
    ],
  }),
  component: RefundPage,
});

function RefundPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header Banner */}
      <section className="bg-secondary border-b border-black/5 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12 text-center">
          <Link
            to="/"
            className="eyebrow mb-6 inline-flex items-center gap-2 text-[#47352F] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </Link>
          <p className="eyebrow mb-3 tracking-[0.25em] text-[#47352F]">Policy</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-black">
            REFUND POLICY
          </h1>
          <p className="mt-3 text-lg md:text-xl font-semibold uppercase tracking-wider text-[#47352F]">
            Threads of Eden — Return & Exchange Policy
          </p>
        </div>
      </section>

      {/* Policy Content Body */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[860px] px-6 md:px-12 space-y-12 text-black">
          {/* Intro Text */}
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-black/80 font-normal">
            <p>
              At Threads of Eden, we put our heart into making sure every piece you receive is
              crafted with care and quality. Every order is{" "}
              <strong className="text-black font-bold">custom-made to order</strong>—designed,
              printed, and finished individually for you. Because of this, certain{" "}
              <strong className="text-black font-bold">
                limitations apply to returns and exchanges
              </strong>
              .
            </p>
            <p>
              Still, we understand that sometimes things don't go as planned. Here's how we handle{" "}
              <strong className="text-black font-bold">returns, exchanges, and refunds</strong> so
              that you know exactly what to expect.
            </p>
          </div>

          <hr className="border-t border-black/15" />

          {/* Section 1: Damaged, Misprinted, or Defective Items */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
              DAMAGED, MISPRINTED, OR DEFECTIVE ITEMS
            </h2>

            <p className="text-base leading-relaxed text-black/80">
              Even after multiple quality checks, rare issues may slip through or occur during
              shipping. If your order arrives{" "}
              <strong className="text-black font-bold">misprinted, damaged, or defective</strong>,
              we've got you covered.
            </p>

            <ul className="space-y-2 text-base text-black/85 pl-1">
              <li className="flex items-start gap-2.5">
                <span className="text-black font-bold">•</span>
                <span>
                  Claims must be raised within{" "}
                  <strong className="text-black font-bold">7 days of delivery</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-black font-bold">•</span>
                <span>
                  To process a <strong className="text-black font-bold">replacement or refund</strong>
                  , please provide:
                </span>
              </li>
            </ul>

            <div className="pl-6 space-y-2 text-base text-black/80">
              <div className="flex items-start gap-2.5">
                <span className="text-[#47352F] font-bold">○</span>
                <span>
                  An <strong className="text-black font-bold">unboxing video</strong> of your
                  package.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#47352F] font-bold">○</span>
                <span>
                  <strong className="text-black font-bold">Clear pictures</strong> of the defective
                  item.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#47352F] font-bold">○</span>
                <span>
                  <strong className="text-black font-bold">Images of the original packaging</strong>.
                </span>
              </div>
            </div>

            {/* Warning Callout */}
            <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 sm:p-5 flex items-start gap-3 text-amber-900">
              <span className="text-lg leading-none shrink-0" aria-hidden>
                ⚠️
              </span>
              <p className="text-sm sm:text-base leading-relaxed">
                Without these, we may not be able to verify the cause and{" "}
                <strong className="font-bold text-amber-950">
                  cannot guarantee a refund or replacement
                </strong>
                .
              </p>
            </div>

            {/* Claim Approval Outcome */}
            <div className="space-y-3 pt-2">
              <p className="text-base font-semibold text-black">Once your claim is approved:</p>
              <ul className="space-y-2.5 pl-1 text-base text-black/85">
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold">•</span>
                  <span>
                    <strong className="text-black font-bold">Replacement:</strong> A new order will be
                    placed for you within{" "}
                    <strong className="text-black font-bold">2 business days</strong> of raising the
                    claim.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-black font-bold">•</span>
                  <span>
                    <strong className="text-black font-bold">Refund:</strong> If you prefer a refund,
                    the amount will be processed within{" "}
                    <strong className="text-black font-bold">6–10 working days</strong> after approval.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-t border-black/15" />

          {/* Section 2: Wrong Size or Change of Mind */}
          <div className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
              WRONG SIZE OR CHANGE OF MIND
            </h2>

            <p className="text-base leading-relaxed text-black/80">
              Since every order is <strong className="text-black font-bold">made-to-order</strong>,{" "}
              <strong className="text-black font-bold">
                returns or exchanges for incorrect size or preference are not possible
              </strong>
              . A new order would need to be placed at your expense.
            </p>

            <div className="flex items-start gap-2.5 text-base text-black/90">
              <span className="text-black font-bold shrink-0">✓</span>
              <span>
                Please{" "}
                <Link
                  to="/size-guide"
                  className="font-bold text-black underline hover:text-[#47352F]"
                >
                  double-check our Size Guide
                </Link>{" "}
                before purchasing to avoid disappointment.
              </span>
            </div>
          </div>

          <hr className="border-t border-black/15" />

          {/* Section 3: Important Notes */}
          <div className="space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-black">
              IMPORTANT NOTES
            </h2>

            <ul className="space-y-3.5 pl-1 text-base text-black/85">
              <li className="flex items-start gap-2.5">
                <span className="text-black font-bold shrink-0">•</span>
                <span>
                  <strong className="text-black font-bold">Size Discrepancies:</strong> If you believe
                  the product doesn't match the size chart, share images of the item laid flat with
                  measurements. Our production team will verify.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-black font-bold shrink-0">•</span>
                <span>
                  <strong className="text-black font-bold">Unboxing Carefully:</strong> If the package
                  is damaged while opening with scissors or sharp tools,{" "}
                  <strong className="text-black font-bold">replacements won't be possible</strong>{" "}
                  unless the unboxing video proves otherwise.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-black font-bold shrink-0">•</span>
                <span>
                  <strong className="text-black font-bold">Damaged Packages:</strong> If you notice
                  damage at the time of delivery, kindly{" "}
                  <strong className="text-black font-bold">mention it in the courier's remarks</strong>{" "}
                  when signing. This helps us claim compensation on your behalf.
                </span>
              </li>
            </ul>
          </div>

          <hr className="border-t border-black/15" />

          {/* Closing Brand Statement */}
          <div className="space-y-3 pt-2">
            <p className="text-base sm:text-lg leading-relaxed text-black/90">
              At Threads of Eden, your order is not just clothing—
              <strong className="text-black font-bold">it's faith woven into fabric</strong>. By being
              transparent with our process, we ensure your experience is{" "}
              <strong className="text-black font-bold">
                smooth, fair, and rooted in quality and purpose
              </strong>
              .
            </p>
          </div>

          {/* Contact Support Box */}
          <div className="mt-12 rounded-2xl border border-[#47352F]/15 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="font-display text-xl font-medium text-black">
                Need assistance with an existing order?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach out to our customer care team with your unboxing video & Order ID.
              </p>
            </div>
            <Link to="/contact" className="btn-luxe shrink-0">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
