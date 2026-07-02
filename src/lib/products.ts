import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";

export const PRODUCTS = [
  {
    id: "radiance-renewal-serum",
    name: "Radiance Renewal Serum",
    category: "Serum",
    price: "₹2,499",
    note: "Aloe · Moringa · Vitamin C",
    description:
      "A skin-renewing serum that balances luminosity with botanical strength. Cold-pressed aloe and moringa deliver hydration and antioxidant clarity.",
    img: product1,
    details: [
      "30ml dropper bottle",
      "Cruelty free, vegan, gluten free",
      "Small batch formulation in reusable glass",
    ],
  },
  {
    id: "essence-de-vert-oil",
    name: "Essence de Vert Oil",
    category: "Facial Oil",
    price: "₹1,899",
    note: "Sage · Camellia · Jojoba",
    description:
      "A feather-light botanical oil that seals in moisture while soothing and refining texture. Perfect as the final step in evening ritual.",
    img: product2,
    details: [
      "30ml recyclable glass bottle",
      "Nourishing blend of calming oils",
      "Suitable for all skin types",
    ],
  },
  {
    id: "velvet-cleansing-balm",
    name: "Velvet Cleansing Balm",
    category: "Cleanser",
    price: "₹1,299",
    note: "Rose · Turmeric · Shea",
    description:
      "A transformative balm-to-milk cleanser that dissolves makeup and impurities while leaving skin soft and balanced.",
    img: product3,
    details: [
      "95% naturally derived",
      "Ultra-gentle plant emollients",
      "No sulfates, parabens or phthalates",
    ],
  },
  {
    id: "hydra-glow-moisturizer",
    name: "Hydra Glow Moisturizer",
    category: "Moisturizer",
    price: "₹2,199",
    note: "Hyaluronic · Aloe · Green Tea",
    description:
      "A weightless cream that delivers lasting hydration and a satin finish, tempered by green tea extract to refine and calm.",
    img: collection1,
    details: [
      "48-hour hydration",
      "Balanced for normal to dry skin",
      "Polished glass jar with refill option",
    ],
  },
  {
    id: "botanical-night-cream",
    name: "Botanical Night Cream",
    category: "Night Care",
    price: "₹2,799",
    note: "Retinol · Bakuchiol · Lavender",
    description:
      "A restorative overnight cream that supports skin renewal with gentle retinol and soothing lavender oil.",
    img: collection2,
    details: [
      "Rich evening nourishment",
      "Dermatologist-friendly formula",
      "Sleep-soft texture",
    ],
  },
  {
    id: "sun-shield-spf-50",
    name: "Sun Shield SPF 50+",
    category: "Sunscreen",
    price: "₹999",
    note: "Zinc Oxide · Niacinamide",
    description:
      "A weightless mineral shield that offers broad-spectrum protection without white cast, leaving skin breathable and calm.",
    img: collection3,
    details: [
      "Broad spectrum SPF 50+",
      "Mineral-based, non-nano zinc oxide",
      "Fast absorbing finish",
    ],
  },
];

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id);
}
