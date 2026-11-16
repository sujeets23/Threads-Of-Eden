import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ruler, Check, Info } from "lucide-react";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size & Fit Guide — Threads of Eden" },
      {
        name: "description",
        content:
          "Kids' t-shirt size guide with age ranges and garment measurements.",
      },
    ],
  }),
  component: SizeGuidePage,
});

const SIZE_TABLE = [
  { size: "2-3Y", heightIn: '36–39"', heightCm: "92–98 cm", chestIn: '20.5–21.3"', chestCm: "52–54 cm", lengthIn: '15.4"', lengthCm: "39 cm" },
  { size: "4-5Y", heightIn: '41–43"', heightCm: "104–110 cm", chestIn: '22–22.8"', chestCm: "56–58 cm", lengthIn: '16.9"', lengthCm: "43 cm" },
  { size: "6-7Y", heightIn: '46–48"', heightCm: "116–122 cm", chestIn: '23.6–24.4"', chestCm: "60–62 cm", lengthIn: '18.5"', lengthCm: "47 cm" },
  { size: "8-9Y", heightIn: '50–53"', heightCm: "128–134 cm", chestIn: '26–26.8"', chestCm: "66–68 cm", lengthIn: '20.1"', lengthCm: "51 cm" },
  { size: "10-11Y", heightIn: '55–57"', heightCm: "140–146 cm", chestIn: '28.3–29.1"', chestCm: "72–74 cm", lengthIn: '21.7"', lengthCm: "55 cm" },
  { size: "12-13Y", heightIn: '59–62"', heightCm: "150–158 cm", chestIn: '30.7–31.5"', chestCm: "78–80 cm", lengthIn: '23.2"', lengthCm: "59 cm" },
];

function SizeGuidePage() {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-20 md:py-32 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#47352F]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4 text-[#47352F]">Kids' Size Guide</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Find their<br />
            <span className="italic text-[#47352F]">right fit.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Use your child's height and chest measurement as a guide. Kids grow at different
            rates, so sizing may vary; size up for a little extra room.
          </p>
        </div>
      </section>

      {/* Sizing Table Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Controls */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-[#47352F]" />
              <h2 className="font-display text-2xl">Approximate Measurements</h2>
            </div>

            <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
              <button
                onClick={() => setUnit("in")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  unit === "in" ? "bg-[#47352F] text-white" : "text-black/60 hover:text-black"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  unit === "cm" ? "bg-[#47352F] text-white" : "text-black/60 hover:text-black"
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-black/10 bg-[#fafafa] text-xs font-semibold uppercase tracking-wider text-black/60">
                  <tr>
                    <th className="px-6 py-4">Size</th>
                    <th className="px-6 py-4">Suggested Height</th>
                    <th className="px-6 py-4">Chest</th>
                    <th className="px-6 py-4">T-Shirt Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {SIZE_TABLE.map((row) => (
                    <tr key={row.size} className="hover:bg-black/[0.015] transition">
                      <td className="px-6 py-5 font-bold text-black text-base">{row.size}</td>
                      <td className="px-6 py-5 font-medium text-black">
                        {unit === "in" ? row.heightIn : row.heightCm}
                      </td>
                      <td className="px-6 py-5 font-medium text-black">
                        {unit === "in" ? row.chestIn : row.chestCm}
                      </td>
                      <td className="px-6 py-5 text-muted-foreground">
                        {unit === "in" ? row.lengthIn : row.lengthCm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Profiles */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">Style 01</p>
              <h3 className="font-display text-2xl">Polo T-Shirts</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                A classic collar and comfortable everyday fit. Check the chart and compare
                measurements with a t-shirt that fits your child well.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">Style 02</p>
              <h3 className="font-display text-2xl">Oversized T-Shirts</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                These tees have a roomier shape by design. Choose their usual age size for
                an oversized look, or size up for extra room.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#47352F]">Style 03</p>
              <h3 className="font-display text-2xl">Round Neck & Christmas Tees</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Our classic and festive tees follow the age-based size chart. Allow a little
                growing room when choosing between sizes.
              </p>
            </div>
          </div>

          {/* How to Measure */}
          <div className="mt-16 rounded-2xl bg-secondary p-8 md:p-12 border border-black/10">
            <h3 className="font-display text-3xl">How to Measure at Home</h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3 text-sm">
              <div>
                <strong className="block text-black">1. Chest</strong>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Measure around the fullest part of your chest, keeping the tape horizontal under your arms.
                </p>
              </div>
              <div>
                <strong className="block text-black">2. Body Length</strong>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Measure from the highest point of your shoulder down to the bottom hem where you prefer the shirt to sit.
                </p>
              </div>
              <div>
                <strong className="block text-black">3. Shoulder Width</strong>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Measure straight across the back from the edge of one shoulder bone to the other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
