export interface ProductColor {
  name: string;
  hex: string;
}

export type DepartmentType = "Men" | "Women" | "Kids" | "Unisex";

export const CHRISTMAS_SUB_FILTERS = {
  Men: ["Round Neck", "Polo", "Hoodies"],
  Women: ["Round Neck", "Polo", "Hoodies"],
  Kids: ["Boys", "Girls"],
} as const;

export type ChristmasDepartment = keyof typeof CHRISTMAS_SUB_FILTERS;

export interface Product {
  id: string;
  name: string;
  category: string;
  department?: DepartmentType;
  subCategory?: string;
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
    department: "Kids",
    subCategory: "Girls",
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
    badge: "Holiday Girls",
  },
  {
    id: "knit-fine-gauge-polo",
    name: "Little Explorer Striped Polo",
    category: "Polo T-Shirts",
    department: "Kids",
    subCategory: "Boys",
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
    department: "Kids",
    subCategory: "Boys",
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
    department: "Kids",
    subCategory: "Boys",
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
    badge: "Holiday Boys",
  },
  // Men's Christmas Collection
  {
    id: "xmas-men-round-neck",
    name: "Men's Festive Fir Round Neck T-Shirt",
    category: "Christmas Edition T-Shirts",
    department: "Men",
    subCategory: "Round Neck",
    price: "₹999",
    originalPrice: "₹1,499",
    note: "Combed cotton jersey · Embroidered holiday motif",
    description:
      "A clean, tailored holiday round neck tee in deep festive colors. Crafted from combed cotton with a discreet embroidered fir tree insignia on the chest.",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85",
    details: [
      "100% premium combed cotton jersey",
      "Ribbed crew neckline that holds its shape",
      "Discreet holiday tree embroidery",
      "Pre-shrunk fabric for reliable fit",
      "Machine washable",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Pine Green", hex: "#1C3F24" },
      { name: "Cranberry Red", hex: "#8A1822" },
      { name: "Chalk Cream", hex: "#F5EFE6" },
    ],
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    badge: "Men's Edition",
  },
  {
    id: "xmas-men-polo",
    name: "Men's Yuletide Piqué Polo T-Shirt",
    category: "Christmas Edition T-Shirts",
    department: "Men",
    subCategory: "Polo",
    price: "₹1,299",
    originalPrice: "₹1,799",
    note: "Heavyweight piqué · Contrast collar tipping",
    description:
      "Elevate your holiday celebrations with this festive piqué polo. Finished with contrast collar tipping and a refined two-button placket.",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Breathable heavy cotton piqué weave",
      "Festive contrast tipping on collar and cuff ribs",
      "Genuine horn-style buttons",
      "Side vent slits for movement",
      "Machine washable cold",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Deep Burgundy", hex: "#5C131D" },
      { name: "Forest Emerald", hex: "#1B3B2B" },
      { name: "Winter Cream", hex: "#FAF8F5" },
    ],
    inStock: true,
    stockCount: 26,
    isFeatured: true,
    badge: "Men's Polo",
  },
  {
    id: "xmas-men-hoodie",
    name: "Men's Alpine Winter Fleece Hoodie",
    category: "Christmas Edition T-Shirts",
    department: "Men",
    subCategory: "Hoodies",
    price: "₹1,999",
    originalPrice: "₹2,699",
    note: "420 GSM winter fleece · Thermal lined hood",
    description:
      "Designed for cold winter nights by the fire. Heavyweight cotton fleece with a double-layered hood, kangaroo pocket, and antique brass aglets.",
    img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1000&auto=format&fit=crop&q=85",
    details: [
      "420 GSM brushed winter fleece",
      "Double-lined hood with braided drawstrings",
      "Roomy kangaroo pouch pocket",
      "Ribbed cuffs and waistband for snug warmth",
      "Machine washable",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Nordic Green", hex: "#223E30" },
      { name: "Heather Coal", hex: "#2B2B2B" },
      { name: "Mulled Wine", hex: "#4E121D" },
    ],
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    badge: "Winter Heavyweight",
  },
  // Women's Christmas Collection
  {
    id: "xmas-women-round-neck",
    name: "Women's Starlight Holiday Round Neck Tee",
    category: "Christmas Edition T-Shirts",
    department: "Women",
    subCategory: "Round Neck",
    price: "₹949",
    originalPrice: "₹1,399",
    note: "Silky modal cotton · Subtle holiday shimmer",
    description:
      "A flattering relaxed crewneck tee with a silky drape and delicate festive metallic accent. Effortlessly pairs with festive skirts or denim.",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Soft cotton-modal blend with fluid drape",
      "Subtle metallic holiday star motif",
      "Flattering scoop crewneck",
      "Curved hemline designed to wear tucked or untucked",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Berry Scarlet", hex: "#9E2A2B" },
      { name: "Oatmeal Cream", hex: "#F3EAD8" },
      { name: "Evergreen", hex: "#1C3B2B" },
    ],
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    badge: "Women's Edition",
  },
  {
    id: "xmas-women-polo",
    name: "Women's Heritage Festive Piqué Polo",
    category: "Christmas Edition T-Shirts",
    department: "Women",
    subCategory: "Polo",
    price: "₹1,249",
    originalPrice: "₹1,699",
    note: "Tailored feminine fit · Mother-of-pearl buttons",
    description:
      "A tailored feminine polo cut from soft combed piqué. Features clean lines, pearlized buttons, and holiday-ready colorways.",
    img: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Fine gauge cotton piqué",
      "Tailored silhouette with subtle waist shaping",
      "Genuine mother-of-pearl buttons",
      "Neat ribbed collar and cuffs",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ruby Red", hex: "#8E1616" },
      { name: "Chalk Ivory", hex: "#F7F5F0" },
      { name: "Pine Green", hex: "#1F4229" },
    ],
    inStock: true,
    stockCount: 20,
    isFeatured: true,
    badge: "Women's Polo",
  },
  {
    id: "xmas-women-hoodie",
    name: "Women's Fireside Cozy Plush Christmas Hoodie",
    category: "Christmas Edition T-Shirts",
    department: "Women",
    subCategory: "Hoodies",
    price: "₹1,899",
    originalPrice: "₹2,599",
    note: "Plush brushed fleece · Relaxed drop-shoulder",
    description:
      "Ultra-soft and delightfully cozy for Christmas morning and holiday travel. Crafted with a plush fleece interior and relaxed drop shoulders.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Cloud-soft brushed fleece interior",
      "Relaxed drop-shoulder oversized silhouette",
      "Kangaroo handwarmer pocket",
      "Tonal drawcord with metal tips",
      "Machine washable",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Vanilla Cream", hex: "#FAF3E0" },
      { name: "Mulled Wine", hex: "#631826" },
      { name: "Sage Mist", hex: "#9AA594" },
    ],
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    badge: "Cozy Holiday",
  },
  // Kids Christmas Collection (Boys & Girls)
  {
    id: "xmas-kids-boys-tee",
    name: "Boys' Polar Express Holiday Graphic Tee",
    category: "Christmas Edition T-Shirts",
    department: "Kids",
    subCategory: "Boys",
    price: "₹849",
    originalPrice: "₹1,149",
    note: "100% soft jersey · Festive locomotive graphic",
    description:
      "A festive graphic tee made for active boys. Features a retro winter train speeding across snow-covered mountains, printed on ultra-soft jersey.",
    img: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1000&auto=format&fit=crop&q=85",
    details: [
      "100% breathable cotton jersey",
      "Durable screen print that stays bright after washing",
      "Reinforced neckline to prevent stretching",
      "Comfortable for winter festivities and playtime",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Midnight Navy", hex: "#1A2536" },
      { name: "Holiday Red", hex: "#A94442" },
    ],
    inStock: true,
    stockCount: 40,
    isFeatured: true,
    badge: "Boys Holiday",
  },
  {
    id: "xmas-kids-girls-tee",
    name: "Girls' Snowflake Magic Flutter Holiday Tee",
    category: "Christmas Edition T-Shirts",
    department: "Kids",
    subCategory: "Girls",
    price: "₹849",
    originalPrice: "₹1,149",
    note: "Glitter snowflake motif · Gentle flutter sleeves",
    description:
      "Bring cheerful sparkle to her holiday wardrobe. Made with gentle flutter sleeves and safe, non-scratch glitter snowflakes that catch the holiday lights.",
    img: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=1000&auto=format&fit=crop&q=85",
    details: [
      "Super-soft cotton jersey",
      "Delicate flutter sleeve detailing",
      "Safe, no-shed glitter snowflake print",
      "Easy-pull crewneck for quick dressing",
      "Machine washable",
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
    colors: [
      { name: "Peppermint Pink", hex: "#D96882" },
      { name: "Snow White", hex: "#FAF9F5" },
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    badge: "Girls Holiday",
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
  brandTagline: "Woven with purpose. Inspired by grace.",
  hero: {
    titleLine1: "Woven in Grace.",
    titleLine2: "Crafted for Purpose.",
    subtitle:
      "“She is clothed in strength and dignity, and she laughs without fear of the future.” — Proverbs 31:25 · Premium Christian faith apparel & everyday festive tees for Men, Women, and Kids. Dispatched with prayer and care in 24 hours.",
    eyebrow: "† Woven with Purpose · Inspired by Grace",
    ctaText: "Shop Faith & Festive Drops",
    ctaLink: "#shop",
    imageUrl:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920&auto=format&fit=crop&q=85",
  },
  announcement: {
    enabled: true,
    text: "⚡ 24-Hour Dispatch · Free Express Delivery on ₹1,499+ · Christmas Specials Live!",
  },
  marqueeItems: [
    "⚡ 24-Hour Superfast Dispatch",
    "⭐ 4.9/5 from 12,500+ Believers",
    "🕊️ Woven with Purpose · Inspired by Grace",
    "🎄 Christmas Family Specials: Men, Women & Kids",
    "🛡️ 7-Day Easy Replacement Guarantee",
    "✝️ Faith-Rooted Premium Cotton Apparel",
    "🚚 Free Express Shipping Above ₹1,499",
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

const PRODUCTS_KEY = "thread_roots_products_v4";
const CATEGORIES_KEY = "thread_roots_categories_v3";
const SETTINGS_KEY = "thread_roots_settings_v4";
const ORDERS_KEY = "thread_roots_orders_v3";

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return INITIAL_PRODUCTS;
  try {
    const raw =
      localStorage.getItem(PRODUCTS_KEY) ||
      localStorage.getItem("thread_roots_products_v3") ||
      localStorage.getItem("arovia_apparel_products_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const initialById = new Map(INITIAL_PRODUCTS.map((product) => [product.id, product]));
        const updated = parsed.map((product) => {
          const initial = initialById.get(product.id);
          if (!initial) return product;
          return {
            ...product,
            department: product.department || initial.department,
            subCategory: product.subCategory || initial.subCategory,
          };
        });

        // Ensure newly added initial products (like Christmas Men, Women, Kids sub-categories) are included
        const storedIds = new Set(parsed.map((p) => p.id));
        const missingInitial = INITIAL_PRODUCTS.filter((p) => !storedIds.has(p.id));
        const merged = [...updated, ...missingInitial];
        saveStoredProducts(merged);
        return merged;
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
