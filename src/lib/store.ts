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
  "Oversized T-Shirts",
  "Polo T-Shirts",
  "Round Neck T-Shirts",
  "Christmas Edition T-Shirts",
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "signature-mercerized-polo",
    name: "Everyday Kids Polo T-Shirt",
    category: "Polo T-Shirts",
    price: "₹899",
    originalPrice: "₹1,199",
    note: "Soft cotton piqué · Easy everyday fit",
    description:
      "A comfortable kids polo made for school days, family outings, and everything in between. Finished with a classic collar and an easy-to-wear fit.",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Soft, breathable cotton piqué",
      "Classic polo collar with a neat button placket",
      "Comfortable fit for everyday movement",
      "Easy-care fabric for busy family routines",
      "Available in kids' age-based sizes",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Ocean Blue", hex: "#3A668C" },
      { name: "Bright White", hex: "#F7F7F5" },
      { name: "Cherry Red", hex: "#A94442" },
    ],
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    badge: "Bestseller",
  },
  {
    id: "heavyweight-oversized-tee",
    name: "Play-All-Day Oversized T-Shirt",
    category: "Oversized T-Shirts",
    price: "₹799",
    originalPrice: "₹1,099",
    note: "Roomy relaxed fit · Soft cotton jersey",
    description:
      "A roomy, relaxed tee with dropped shoulders and plenty of space to play. Soft cotton jersey keeps this easygoing favorite comfortable from morning to bedtime.",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Relaxed oversized shape with dropped shoulders",
      "Soft cotton jersey for all-day comfort",
      "Easy-to-wear round neckline",
      "Room to move, run, and play",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Sunshine Yellow", hex: "#E5BC4F" },
      { name: "Ocean Blue", hex: "#3A668C" },
      { name: "Soft Sand", hex: "#D4C5B9" },
    ],
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    badge: "Must-Have",
  },
  {
    id: "supima-luxury-crewneck",
    name: "Classic Round Neck T-Shirt",
    category: "Round Neck T-Shirts",
    price: "₹699",
    originalPrice: "₹899",
    note: "Everyday cotton tee · Classic regular fit",
    description:
      "A simple, soft round neck tee that pairs with just about anything. An everyday staple designed to feel comfortable through school, play, and weekends.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Soft cotton jersey",
      "Classic round neckline",
      "Comfortable regular fit",
      "Easy to layer under jackets and sweaters",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Berry Pink", hex: "#C85E78" },
      { name: "Bright White", hex: "#FFFFFF" },
      { name: "Warm Stone", hex: "#EBE7DF" },
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    badge: "Signature",
  },
  {
    id: "minimalist-waffle-henley",
    name: "Merry & Bright Christmas T-Shirt",
    category: "Christmas Edition T-Shirts",
    price: "₹899",
    originalPrice: "₹1,199",
    note: "Festive graphic tee · Limited holiday edition",
    description:
      "Bring a little extra cheer to the holidays with this playful Christmas edition tee. Made for festive photos, family gatherings, and all the excitement of the season.",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Cheerful holiday-inspired graphic",
      "Soft cotton jersey",
      "Comfortable fit for festive celebrations",
      "Easy-to-style round neckline",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Christmas Red", hex: "#A94442" },
      { name: "Snow White", hex: "#F7F7F5" },
      { name: "Midnight Blue", hex: "#1C2A39" },
    ],
    inStock: true,
    stockCount: 24,
    isFeatured: false,
    badge: "New",
  },
  {
    id: "knit-fine-gauge-polo",
    name: "Little Explorer Striped Polo",
    category: "Polo T-Shirts",
    price: "₹999",
    originalPrice: "₹1,299",
    note: "Playful stripes · Soft piqué cotton",
    description:
      "A cheerful striped polo that brings a little color to everyday outfits. The classic collar and comfortable cotton feel make it an easy pick for outings and celebrations.",
    img: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Soft cotton piqué",
      "Classic polo collar and button placket",
      "Colorful all-over stripes",
      "Comfortable fit for active days",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Berry Stripe", hex: "#C85E78" },
      { name: "Chalk Ivory", hex: "#F4F3EE" },
      { name: "Ocean Stripe", hex: "#3A668C" },
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    badge: "Popular Pick",
  },
  {
    id: "raw-cut-boxy-tee",
    name: "Weekend Adventure Oversized Tee",
    category: "Oversized T-Shirts",
    price: "₹849",
    originalPrice: "₹1,099",
    note: "Easy oversized shape · Everyday comfort",
    description:
      "An easy oversized tee for little adventurers. The roomy shape and soft feel make it a comfortable choice for playdates, trips, and relaxed weekends.",
    img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Roomy oversized fit with relaxed sleeves",
      "Soft cotton jersey",
      "Comfortable round neckline",
      "Designed for easy movement",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Playful Blue", hex: "#3A668C" },
      { name: "Natural Cotton", hex: "#EDE8DC" },
    ],
    inStock: true,
    stockCount: 31,
    isFeatured: false,
    badge: "Limited",
  },
  {
    id: "riviera-striped-polo",
    name: "Santa's Favorite Christmas Tee",
    category: "Christmas Edition T-Shirts",
    price: "₹899",
    originalPrice: "₹1,199",
    note: "Festive print · Made for holiday fun",
    description:
      "A fun holiday tee for little ones who love the magic of Christmas. Pair it with jeans or leggings for a ready-to-celebrate outfit.",
    img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Festive Christmas-inspired print",
      "Soft cotton jersey",
      "Easy-to-wear round neckline",
      "Comfortable for parties and family photos",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Holiday Red", hex: "#A94442" },
      { name: "Snow White", hex: "#F7F7F5" },
    ],
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    badge: "Festive Favorite",
  },
  {
    id: "french-linen-cotton-tee",
    name: "Color Pop Round Neck T-Shirt",
    category: "Round Neck T-Shirts",
    price: "₹749",
    originalPrice: "₹999",
    note: "Bright everyday color · Soft cotton feel",
    description:
      "A bright, easy round neck tee that adds a pop of color to everyday outfits. Comfortable enough for school days and fun enough for the weekend.",
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Soft cotton jersey",
      "Classic round neckline",
      "Easy regular fit",
      "Pairs with shorts, jeans, and layers",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Sunshine Yellow", hex: "#E5BC4F" },
      { name: "Berry Pink", hex: "#C85E78" },
      { name: "Pure White", hex: "#FFFFFF" },
    ],
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    badge: "Color Pop",
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  brandName: "Threads of Eden",
  brandTagline: "Little styles. Big adventures.",
  hero: {
    titleLine1: "Made for",
    titleLine2: "little movers",
    subtitle:
      "Soft, playful t-shirts for everyday adventures. Find oversized, polo, round neck, and festive Christmas styles made for kids.",
    eyebrow: "Comfort made for kids",
    ctaText: "Shop Kids' T-Shirts",
    ctaLink: "/shop",
    imageUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1800&auto=format&fit=crop&q=85",
  },
  announcement: {
    enabled: true,
    text: "Kids' T-Shirts for Everyday Adventures · Shop oversized, polo, round neck & holiday styles",
  },
  marqueeItems: [
    "Soft cotton comfort",
    "Made for little movers",
    "Easy everyday styles",
    "Kids sizes 2-13Y",
    "Oversized, polos & round necks",
    "Festive Christmas tees",
    "Playful colors and prints",
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
        name: "Everyday Kids Polo T-Shirt",
        price: "₹899",
        quantity: 2,
        size: "8-9Y",
        color: "Ocean Blue",
        img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&auto=format&fit=crop&q=80",
      },
      {
        productId: "heavyweight-oversized-tee",
        name: "Play-All-Day Oversized T-Shirt",
        price: "₹799",
        quantity: 1,
        size: "6-7Y",
        color: "Chalk White",
        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 2597,
    tax: 467,
    shipping: 0,
    total: 3064,
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
        name: "Little Explorer Striped Polo",
        price: "₹999",
        quantity: 1,
        size: "10-11Y",
        color: "Berry Stripe",
        img: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 999,
    tax: 180,
    shipping: 0,
    total: 1179,
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
        name: "Classic Round Neck T-Shirt",
        price: "₹699",
        quantity: 2,
        size: "4-5Y",
        color: "Berry Pink",
        img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&auto=format&fit=crop&q=80",
      },
      {
        productId: "minimalist-waffle-henley",
        name: "Merry & Bright Christmas T-Shirt",
        price: "₹899",
        quantity: 1,
        size: "4-5Y",
        color: "Christmas Red",
        img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&auto=format&fit=crop&q=80",
      },
    ],
    subtotal: 2297,
    tax: 413,
    shipping: 0,
    total: 2710,
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
      if (Array.isArray(parsed) && parsed.length > 0) {
        const legacyCategories = new Set(["Polo", "Oversized", "Crewneck", "Henley", "Textured & Knit"]);
        const hasLegacyCatalog = parsed.some((product) => legacyCategories.has(product.category));
        if (!hasLegacyCatalog) return parsed;

        const initialById = new Map(INITIAL_PRODUCTS.map((product) => [product.id, product]));
        const migrated = parsed.map((product) => {
          const initial = initialById.get(product.id);
          if (!initial) return product;
          return {
            ...initial,
            price: product.price ?? initial.price,
            originalPrice: product.originalPrice ?? initial.originalPrice,
            img: product.img ?? initial.img,
            inStock: product.inStock ?? initial.inStock,
            stockCount: product.stockCount ?? initial.stockCount,
          };
        });
        const storedIds = new Set(parsed.map((product) => product.id));
        migrated.push(...INITIAL_PRODUCTS.filter((product) => !storedIds.has(product.id)));
        saveStoredProducts(migrated);
        return migrated;
      }
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
      if (Array.isArray(parsed) && parsed.length > 0) {
        const legacyCategories = new Set(["Polo", "Oversized", "Crewneck", "Henley", "Textured & Knit"]);
        if (!parsed.some((category) => legacyCategories.has(category))) return parsed;
        const customCategories = parsed.filter(
          (category) =>
            category !== "All" &&
            !legacyCategories.has(category) &&
            !INITIAL_CATEGORIES.includes(category)
        );
        const migrated = [...INITIAL_CATEGORIES, ...customCategories];
        saveStoredCategories(migrated);
        return migrated;
      }
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
        if (
          parsed.hero?.titleLine1 === "Cotton," ||
          parsed.hero?.subtitle?.includes("Peruvian") ||
          parsed.marqueeItems?.some((item: string) => item.includes("Supima"))
        ) {
          const migrated = {
            ...INITIAL_SETTINGS,
            brandName: parsed.brandName,
            contact: parsed.contact || INITIAL_SETTINGS.contact,
            announcement: {
              ...INITIAL_SETTINGS.announcement,
              enabled: parsed.announcement?.enabled ?? INITIAL_SETTINGS.announcement.enabled,
            },
          };
          saveStoredSettings(migrated);
          return migrated;
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
