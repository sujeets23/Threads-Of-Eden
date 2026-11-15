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
          "Detailed measurement specifications and fit recommendations for Threads of Eden luxury t-shirts and polos.",
      },
    ],
  }),
  component: SizeGuidePage,
});

const SIZE_TABLE = [
  { size: "S", chestIn: '36–38"', chestCm: "91–96 cm", lengthIn: '28.0"', shoulderIn: '18.0"', sleeveIn: '8.5"' },
  { size: "M", chestIn: '39–41"', chestCm: "99–104 cm", lengthIn: '29.0"', shoulderIn: '19.0"', sleeveIn: '9.0"' },
  { size: "L", chestIn: '42–44"', chestCm: "107–112 cm", lengthIn: '30.0"', shoulderIn: '20.0"', sleeveIn: '9.5"' },
  { size: "XL", chestIn: '45–47"', chestCm: "114–119 cm", lengthIn: '31.0"', shoulderIn: '21.0"', sleeveIn: '10.0"' },
  { size: "XXL", chestIn: '48–50"', chestCm: "122–127 cm", lengthIn: '32.0"', shoulderIn: '22.0"', sleeveIn: '10.5"' },
];

function SizeGuidePage() {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-20 md:py-32 border-b border-black/5">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <Link to="/" className="eyebrow mb-8 inline-flex items-center gap-2 text-[#2C5D2E]">
            ← Back to Home
          </Link>
          <p className="eyebrow mb-4 text-[#2C5D2E]">Architectural Fit</p>
          <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">
            Size & Fit<br />
            <span className="italic text-[#2C5D2E]">specifications.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">
            Our garments are tailored with pre-shrunk organic yarns to ensure the silhouette
            you purchase remains exact wash after wash.
          </p>
        </div>
      </section>

      {/* Sizing Table Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Controls */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Ruler className="h-5 w-5 text-[#2C5D2E]" />
              <h2 className="font-display text-2xl">Body & Garment Dimensions</h2>
            </div>

            <div className="inline-flex rounded-full border border-black/10 bg-white p-1">
              <button
                onClick={() => setUnit("in")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  unit === "in" ? "bg-[#2C5D2E] text-white" : "text-black/60 hover:text-black"
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setUnit("cm")}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                  unit === "cm" ? "bg-[#2C5D2E] text-white" : "text-black/60 hover:text-black"
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
                    <th className="px-6 py-4">Chest To Fit</th>
                    <th className="px-6 py-4">Garment Body Length</th>
                    <th className="px-6 py-4">Shoulder Width</th>
                    <th className="px-6 py-4">Sleeve Length</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {SIZE_TABLE.map((row) => (
                    <tr key={row.size} className="hover:bg-black/[0.015] transition">
                      <td className="px-6 py-5 font-bold text-black text-base">{row.size}</td>
                      <td className="px-6 py-5 font-medium text-black">
                        {unit === "in" ? row.chestIn : row.chestCm}
                      </td>
                      <td className="px-6 py-5 text-muted-foreground">{row.lengthIn}</td>
                      <td className="px-6 py-5 text-muted-foreground">{row.shoulderIn}</td>
                      <td className="px-6 py-5 text-muted-foreground">{row.sleeveIn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fit Profiles */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">Fit 01</p>
              <h3 className="font-display text-2xl">The Piqué Polo (Regular)</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Tailored through the shoulders with a gentle taper down to the hip.
                Features side seam vents for ease of movement. Take your true size.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">Fit 02</p>
              <h3 className="font-display text-2xl">Heavyweight (Oversized)</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Cut intentionally relaxed with a dropped shoulder and square torso drape.
                For the designed slouchy silhouette, order your standard size.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-7 shadow-sm space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2C5D2E]">Fit 03</p>
              <h3 className="font-display text-2xl">Supima Crewneck (Classic)</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                A clean straight drape that falls parallel to the torso. Can be worn as an
                outer garment or layered underneath tailored jackets.
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
