export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  note: string;
  description: string;
  img: string;
  images?: string[];
  details: string[];
  sizes: string[];
  colors: ProductColor[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  badge?: string;
}

export interface StoreHeroSettings {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  eyebrow: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export interface StoreAnnouncementSettings {
  enabled: boolean;
  text: string;
}

export interface StoreContactSettings {
  email: string;
  phone: string;
  address: string;
}

export interface StoreSettings {
  brandName: string;
  brandTagline: string;
  hero: StoreHeroSettings;
  announcement: StoreAnnouncementSettings;
  marqueeItems: string[];
  contact: StoreContactSettings;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  size?: string;
  color?: string;
  img?: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: "razorpay" | "cod";
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export const INITIAL_CATEGORIES = [
  "All",
  "Polo",
  "Oversized",
  "Crewneck",
  "Henley",
  "Textured & Knit",
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "signature-mercerized-polo",
    name: "The Signature Piqué Polo",
    category: "Polo",
    price: "₹2,199",
    originalPrice: "₹2,899",
    note: "240 GSM Mercerized Piqué · Mother of Pearl Buttons",
    description:
      "Engineered from double-mercerized Egyptian cotton, offering a lustrous finish that resists fading and pilling. Features a structured rib collar that stays crisp throughout the day.",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=85",
    details: [
      "240 GSM double-mercerized 100% Egyptian cotton",
      "Authentic Australian mother-of-pearl engraved buttons",
      "Reinforced collar stand designed never to curl",
      "Side vents with herringbone grosgrain taping",
      "Pre-shrunk to retain tailored fit after every wash",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Forest Green", hex: "#2C5D2E" },
      { name: "Chalk White", hex: "#F7F7F5" },
      { name: "Deep Obsidian", hex: "#1A2E1B" },
    ],
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "heavyweight-oversized-tee",
    name: "280 GSM Heavyweight Oversized Tee",
    category: "Oversized",
    price: "₹1,699",
    originalPrice: "₹2,299",
    note: "280 GSM Combed Ring-Spun Cotton · Drop Shoulder",
    description:
      "A modern architectural silhouette tailored with dropped shoulders and a dense 280 GSM drape. Built for effortless daily wear with a substantial hand feel that holds its structure.",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85",
    details: [
      "280 GSM heavyweight organic ring-spun cotton",
      "Relaxed drop-shoulder cut with boxy torso profile",
      "1.2-inch tight crew ribbing with twin-needle collar",
      "Garment dyed with low-impact non-toxic dyes",
      "Zero-twist yarn for ultra-smooth skin feel",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Chalk White", hex: "#FFFFFF" },
      { name: "Mineral Sage", hex: "#8FBF8A" },
      { name: "Raw Umber", hex: "#D4C5B9" },
    ],
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    badge: "Must-Have",
  },
  {
    id: "supima-luxury-crewneck",
    name: "Long-Staple Supima® Crewneck",
    category: "Crewneck",
    price: "₹1,399",
    originalPrice: "₹1,899",
    note: "100% California Supima® · 200 GSM Featherweight Luxe",
    description:
      "Crafted exclusively from the top 1% of world cotton harvests. Extra-long staple fibers yield unmatched silkiness, vibrant color retention, and resilience wash after wash.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Certified 100% American Supima® cotton",
      "Silken micro-gauge knit with velvety peach finish",
      "Tailored classic fit with seamless side construction",
      "Blind-stitched sleeve cuffs and bottom hem",
      "Machine wash cold, air dry recommended",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Obsidian", hex: "#1A1A1A" },
      { name: "Forest Green", hex: "#2C5D2E" },
      { name: "Warm Stone", hex: "#EBE7DF" },
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    badge: "Signature",
  },
  {
    id: "minimalist-waffle-henley",
    name: "The Textured Waffle Henley",
    category: "Henley",
    price: "₹1,999",
    originalPrice: "₹2,699",
    note: "260 GSM Honeycomb Waffle · Matte Urea Buttons",
    description:
      "A refined classic inspired by heritage workwear. The breathable thermal waffle texture delivers natural temperature regulation and rich tactile dimension.",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=85",
    details: [
      "260 GSM textured breathable waffle weave",
      "Three-button placket with durable matte urea buttons",
      "Reinforced ribbed collar and ribbed cuff details",
      "Pre-washed for instantaneous vintage drape",
      "Ideal as standalone piece or textured layering foundation",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Warm Oat", hex: "#D6C7B2" },
      { name: "Deep Charcoal", hex: "#2B2D2F" },
      { name: "Olive Sage", hex: "#606C5D" },
    ],
    inStock: true,
    stockCount: 24,
    isFeatured: false,
    badge: "New",
  },
  {
    id: "knit-fine-gauge-polo",
    name: "Fine-Gauge Milanese Knit Polo",
    category: "Polo",
    price: "₹2,499",
    originalPrice: "₹3,499",
    note: "14-Gauge Cotton-Silk Blend · Clean Open Collar",
    description:
      "An elevated resort-ready polo knitted on 14-gauge Italian machinery. Features a retro open spread collar with seamless shoulder transition for an understated quiet-luxury appeal.",
    img: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "85% combed long-staple cotton, 15% Mulberry silk",
      "14-gauge fine-gauge flatbed knit construction",
      "Open Johnny collar with structured knitted placket",
      "Ribbed waist hem and sleeve trims",
      "Dry clean or delicate hand wash cold",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Sage Mist", hex: "#8FBF8A" },
      { name: "Chalk Ivory", hex: "#F4F3EE" },
      { name: "Forest Moss", hex: "#2C5D2E" },
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    badge: "Luxury Knit",
  },
  {
    id: "raw-cut-boxy-tee",
    name: "Raw Hem Architectural Boxy Tee",
    category: "Oversized",
    price: "₹1,599",
    originalPrice: "₹2,199",
    note: "300 GSM Ultra-Heavy Cotton · Clean Raw Hem",
    description:
      "Crafted from ultra-dense 300 GSM Japanese organic cotton. Features an architectural square boxy cut, reinforced double-needle collar, and raw overcast hem detailing.",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=85",
    details: [
      "300 GSM ultra-heavyweight combed cotton",
      "Contemporary square boxy cut with wide sleeves",
      "Reinforced neckline that prevents stretching over time",
      "Clean edge overcast bottom stitch",
      "Pre-shrunk organic fabric",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Obsidian", hex: "#22252A" },
      { name: "Raw Cotton", hex: "#EDE8DC" },
    ],
    inStock: true,
    stockCount: 31,
    isFeatured: false,
    badge: "Limited",
  },
  {
    id: "riviera-striped-polo",
    name: "The Riviera Striped Piqué Polo",
    category: "Polo",
    price: "₹2,299",
    originalPrice: "₹2,999",
    note: "Classic Nautical Stripe · 220 GSM Piqué Cotton",
    description:
      "Inspired by mid-century French Riviera summers. Classic horizontal micro-stripes knitted with yarn-dyed organic cotton to guarantee permanent color brightness.",
    img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1000&auto=format&fit=crop&q=85",
    details: [
      "220 GSM breathable organic cotton piqué",
      "Yarn-dyed micro stripes that never bleed or fade",
      "Contrasting solid ribbed collar and sleeve bands",
      "Laser-etched mother of pearl buttons",
      "Regular European tailored fit",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy & Cream", hex: "#1C2A39" },
      { name: "Forest & Chalk", hex: "#2C5D2E" },
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    badge: "Heritage",
  },
  {
    id: "french-linen-cotton-tee",
    name: "French Flax Linen & Cotton Tee",
    category: "Textured & Knit",
    price: "₹1,799",
    originalPrice: "₹2,399",
    note: "55% Normandy Linen, 45% Cotton · 180 GSM Airy Slub",
    description:
      "Combining the crisp airiness of Normandy flax with the cloud-like softness of organic cotton. Naturally breathable and antibacterial for hot weather comfort.",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=85",
    details: [
      "55% French linen, 45% ring-spun organic cotton",
      "Unique slub yarn texture with organic grain aesthetic",
      "Naturally moisture-wicking and quick-drying",
      "Relaxed chest with slightly tapered waist",
      "Softens significantly with every wash cycle",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Natural Flax", hex: "#DCD5C6" },
      { name: "Pale Sage", hex: "#A8BBA2" },
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    badge: "Summer Essential",
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: "Threads of Eden",
  brandTagline: "Woven with purpose. Inspired by grace.",
  hero: {
    titleLine1: "Cotton,",
    titleLine2: "elevated",
    subtitle:
      "Precision-knit Peruvian piqué and 280 GSM heavyweight cotton. Designed with architectural proportion, uncompromising comfort, and timeless ease.",
    eyebrow: "Autumn / Winter 2026 Collection",
    ctaText: "Discover the Collection",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1800&auto=format&fit=crop&q=85",
  },
  announcement: {
    enabled: true,
    text: "Complimentary Express Delivery on orders over ₹1,999 · Hand-finished luxury cotton packaging included",
  },
  marqueeItems: [
    "280 GSM Heavyweight",
    "100% Long-Staple Supima®",
    "Mercerized Piqué Knit",
    "Mother of Pearl Buttons",
    "Pre-Shrunk Organic Cotton",
    "Double-Needle Construction",
    "Milan — Kyoto — Mumbai",
  ],
  contact: {
    email: "concierge@threadandroots.com",
    phone: "+91 (080) 4920-8800",
    address: "124 Indiranagar 100ft Road, Bangalore / Business Bay, Dubai",
  },
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-84920",
    customerName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98450 12345",
    address: "Penthouse 4B, UB City Tower, Vittal Mallya Road",
    city: "Bangalore",
    pincode: "560001",
    items: [
      {
        productId: "signature-mercerized-polo",
        name: "The Signature Piqué Polo",
        price: "₹2,199",
        quantity: 2,
        size: "L",
        color: "Forest Green",
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80",
      },
      {
        productId: "heavyweight-oversized-tee",
        name: "280 GSM Heavyweight Oversized Tee",
        price: "₹1,699",
        quantity: 1,
        size: "XL",
        color: "Chalk White",
        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 6097,
    tax: 1097,
    shipping: 0,
    total: 7194,
    paymentMethod: "razorpay",
    status: "Processing",
    createdAt: "2026-11-13T10:45:00.000Z",
  },
  {
    id: "ORD-84918",
    customerName: "Rohan Varma",
    email: "rohan.v@example.com",
    phone: "+91 99011 54321",
    address: "Villa 12, Palm Meadows, Whitefield",
    city: "Bangalore",
    pincode: "560066",
    items: [
      {
        productId: "knit-fine-gauge-polo",
        name: "Fine-Gauge Milanese Knit Polo",
        price: "₹2,499",
        quantity: 1,
        size: "M",
        color: "Sage Mist",
        img: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 2499,
    tax: 450,
    shipping: 0,
    total: 2949,
    paymentMethod: "razorpay",
    status: "Shipped",
    createdAt: "2026-11-12T16:20:00.000Z",
  },
  {
    id: "ORD-84912",
    customerName: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 98200 87654",
    address: "Flat 802, Ocean Crest, Bandra West",
    city: "Mumbai",
    pincode: "400050",
    items: [
      {
        productId: "supima-luxury-crewneck",
        name: "Long-Staple Supima® Crewneck",
        price: "₹1,399",
        quantity: 2,
        size: "M",
        color: "Deep Obsidian",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80",
      },
      {
        productId: "minimalist-waffle-henley",
        name: "The Textured Waffle Henley",
        price: "₹1,999",
        quantity: 1,
        size: "M",
        color: "Warm Oat",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 4797,
    tax: 863,
    shipping: 0,
    total: 5660,
    paymentMethod: "cod",
    status: "Delivered",
    createdAt: "2026-11-10T11:15:00.000Z",
  },
];

/* ----------------- Storage Helper Functions ----------------- */

const PRODUCTS_KEY = "thread_roots_products_v3";
const CATEGORIES_KEY = "thread_roots_categories_v3";
const SETTINGS_KEY = "thread_roots_settings_v3";
const ORDERS_KEY = "thread_roots_orders_v3";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY) || localStorage.getItem("arovia_apparel_products_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading stored products:", e);
  }
  return INITIAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent("thread_roots_store_updated", { detail: { type: "products" } }));
  } catch (e) {
    console.error("Error saving products:", e);
  }
}

export function getStoredCategories(): string[] {
  if (typeof window === "undefined") return INITIAL_CATEGORIES;
  try {
    const raw = localStorage.getItem(CATEGORIES_KEY) || localStorage.getItem("arovia_apparel_categories_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading stored categories:", e);
  }
  return INITIAL_CATEGORIES;
}

export function saveStoredCategories(categories: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    window.dispatchEvent(new CustomEvent("thread_roots_store_updated", { detail: { type: "categories" } }));
  } catch (e) {
    console.error("Error saving categories:", e);
  }
}

export function getStoredSettings(): StoreSettings {
  if (typeof window === "undefined") return INITIAL_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem("arovia_apparel_settings_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.brandName) {
        if (parsed.brandName.includes("Arovia")) {
          parsed.brandName = "Threads of Eden";
          if (parsed.contact?.email?.includes("arovia")) {
            parsed.contact.email = "concierge@threadandroots.com";
          }
          saveStoredSettings(parsed);
        }
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading stored settings:", e);
  }
  return INITIAL_SETTINGS;
}

export function saveStoredSettings(settings: StoreSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent("thread_roots_store_updated", { detail: { type: "settings" } }));
  } catch (e) {
    console.error("Error saving settings:", e);
  }
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY) || localStorage.getItem("arovia_apparel_orders_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.error("Error reading stored orders:", e);
  }
  return INITIAL_ORDERS;
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent("thread_roots_store_updated", { detail: { type: "orders" } }));
  } catch (e) {
    console.error("Error saving orders:", e);
  }
}

export function resetStoreToDefaults(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PRODUCTS_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem("arovia_apparel_products_v2");
    localStorage.removeItem("arovia_apparel_categories_v2");
    localStorage.removeItem("arovia_apparel_settings_v2");
    localStorage.removeItem("arovia_apparel_orders_v2");
    saveStoredProducts(INITIAL_PRODUCTS);
    saveStoredCategories(INITIAL_CATEGORIES);
    saveStoredSettings(INITIAL_SETTINGS);
    saveStoredOrders(INITIAL_ORDERS);
    window.dispatchEvent(new CustomEvent("thread_roots_store_updated", { detail: { type: "reset" } }));
  } catch (e) {
    console.error("Error resetting store:", e);
  }
}
