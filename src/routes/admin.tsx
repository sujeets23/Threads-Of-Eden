import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useStore } from "@/context/StoreContext";
import { Product, ProductColor, Order } from "@/lib/store";
import {
  Package,
  Layers,
  Settings,
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  Check,
  RotateCcw,
  ExternalLink,
  Search,
  Eye,
  AlertCircle,
  TrendingUp,
  Tag,
  Truck,
  Sparkles,
  ArrowRight,
  X,
  Image as ImageIcon,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — Threads of Eden" },
      { name: "description", content: "Manage products, categories, orders, and store settings." },
    ],
  }),
  component: AdminPage,
});

// Preset photos for quick selection when adding/editing t-shirts
const PRESET_IMAGES = [
  {
    label: "Kids' Polo Tee",
    url: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Chalk White Tee",
    url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Kids' Round Neck Tee",
    url: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Kids' Christmas Tee",
    url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Striped Kids' Polo",
    url: "https://images.unsplash.com/photo-1625910513413-7e5c545f949c?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Boxy Charcoal Tee",
    url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Striped Riviera Polo",
    url: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=1000&auto=format&fit=crop&q=85",
  },
  {
    label: "Flax Linen-Cotton Tee",
    url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&auto=format&fit=crop&q=85",
  },
];

type AdminTab = "overview" | "products" | "categories" | "settings" | "orders";

function AdminPage() {
  const {
    products,
    categories,
    settings,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    addCategory,
    editCategory,
    deleteCategory,
    updateSettings,
    updateOrderStatus,
    resetDefaults,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Settings form state
  const [formSettings, setFormSettings] = useState(settings);

  // Show transient toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Keep settings form updated if settings change externally
  const handleSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formSettings);
    showToast("Store settings saved and updated live across the website!");
  };

  return (
    <div className="min-h-screen bg-[#f7f7f5] text-[#1a1a1a]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-[#47352F] px-5 py-3.5 text-sm font-medium text-white shadow-2xl animate-in fade-in slide-in-from-top-4">
          <Check className="h-4 w-4 text-[#E5CFAC]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12">
          <div className="flex items-center gap-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#47352F] text-white font-serif font-bold text-sm tracking-tighter shadow-xs">
              T&R
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl font-medium tracking-tight">Admin Console</h1>
                <span className="rounded-full bg-[#47352F]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#47352F]">
                  Live Store Manager
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Modify products, pricing, stock, categories, orders & layout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Reset all store data, products, settings and orders back to initial presets?",
                  )
                ) {
                  resetDefaults();
                  setFormSettings(settings);
                  showToast("Store reset to the default kidswear catalog successfully!");
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-2 text-xs font-medium text-black/70 hover:bg-black/5 transition"
              title="Reset products and content to default"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>

            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#47352F] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[#39291F] transition"
            >
              <span>View Storefront</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="border-t border-black/5 bg-[#fafafa]">
          <div className="mx-auto flex max-w-[1600px] gap-1 overflow-x-auto px-6 md:px-12">
            {[
              { id: "overview", label: "Dashboard", icon: TrendingUp },
              { id: "products", label: `Products (${products.length})`, icon: Package },
              { id: "categories", label: `Categories (${categories.length - 1})`, icon: Layers },
              { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
              { id: "settings", label: "Store & Hero Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center gap-2 border-b-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap ${
                    isActive
                      ? "border-[#47352F] text-[#47352F] bg-white font-bold"
                      : "border-transparent text-black/60 hover:text-black hover:bg-black/5"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1600px] px-6 py-8 md:px-12 md:py-12">
        {activeTab === "overview" && (
          <OverviewTab
            products={products}
            categories={categories}
            orders={orders}
            onNavigate={(t) => setActiveTab(t)}
          />
        )}

        {activeTab === "products" && (
          <ProductsTab
            products={products}
            categories={categories}
            onAddNew={() => {
              setEditingProduct(null);
              setIsProductModalOpen(true);
            }}
            onEdit={(prod) => {
              setEditingProduct(prod);
              setIsProductModalOpen(true);
            }}
            onDelete={(id) => {
              if (window.confirm("Are you sure you want to delete this product?")) {
                deleteProduct(id);
                showToast("Product deleted successfully.");
              }
            }}
            onToggleStock={(id) => {
              toggleStock(id);
              showToast("Product stock status updated.");
            }}
          />
        )}

        {activeTab === "categories" && (
          <CategoriesTab
            categories={categories}
            products={products}
            onAddCategory={(cat) => {
              addCategory(cat);
              showToast(`Category "${cat}" added successfully.`);
            }}
            onEditCategory={(oldName, newName) => {
              editCategory(oldName, newName);
              showToast(`Category renamed from "${oldName}" to "${newName}".`);
            }}
            onDeleteCategory={(cat) => {
              if (window.confirm(`Delete category "${cat}"? Products under it will remain.`)) {
                deleteCategory(cat);
                showToast(`Category "${cat}" removed.`);
              }
            }}
          />
        )}

        {activeTab === "orders" && (
          <OrdersTab
            orders={orders}
            onUpdateStatus={(id, status) => {
              updateOrderStatus(id, status);
              showToast(`Order status updated to ${status}.`);
            }}
          />
        )}

        {activeTab === "settings" && (
          <SettingsTab
            formSettings={formSettings}
            setFormSettings={setFormSettings}
            onSubmit={handleSettingsSave}
          />
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <ProductModal
          isOpen={isProductModalOpen}
          initialProduct={editingProduct}
          categories={categories.filter((c) => c !== "All")}
          onClose={() => setIsProductModalOpen(false)}
          onSave={(savedProduct) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, savedProduct);
              showToast(`Product "${savedProduct.name}" updated successfully.`);
            } else {
              addProduct(savedProduct);
              showToast(`New product "${savedProduct.name}" created.`);
            }
            setIsProductModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
/* ------------------- 1. OVERVIEW TAB ------------------- */

function OverviewTab({
  products,
  categories,
  orders,
  onNavigate,
}: {
  products: Product[];
  categories: string[];
  orders: Order[];
  onNavigate: (tab: AdminTab) => void;
}) {
  const inStockCount = products.filter((p) => p.inStock).length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Total Kids' T-Shirts
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#47352F]/10 text-[#47352F]">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 font-display text-4xl">{products.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-[#47352F]">{inStockCount} active</span> ·{" "}
            {outOfStockCount} out of stock
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Categories
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Layers className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 font-display text-4xl">{categories.length - 1}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Oversized, polo, round neck, and Christmas edition t-shirts.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Customer Orders
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 font-display text-4xl">{orders.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            {orders.filter((o) => o.status === "Processing" || o.status === "Pending").length}{" "}
            pending processing
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Total Sales
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#47352F]/10 text-[#47352F]">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-4 font-display text-4xl">₹{totalRevenue.toLocaleString()}</p>
          <p className="mt-2 text-xs text-muted-foreground">All time gross merchandise volume</p>
        </div>
      </div>

      {/* Quick Launch & Out of Stock Alert */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="font-display text-xl mb-4">Quick Store Management</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={() => onNavigate("products")}
              className="flex items-start gap-4 rounded-xl border border-black/10 p-4 text-left hover:border-[#47352F] hover:bg-[#47352F]/5 transition group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#47352F] text-white">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black group-hover:text-[#47352F]">
                  Add or Edit Products
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Create kids' t-shirts, update prices, and manage stock.
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("settings")}
              className="flex items-start gap-4 rounded-xl border border-black/10 p-4 text-left hover:border-[#47352F] hover:bg-[#47352F]/5 transition group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#221b18] text-[#E5CFAC]">
                <Settings className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black group-hover:text-[#47352F]">
                  Customize Store & Hero
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Change headline, banner image, marquee badges, and text.
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("orders")}
              className="flex items-start gap-4 rounded-xl border border-black/10 p-4 text-left hover:border-[#47352F] hover:bg-[#47352F]/5 transition group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-600 text-white">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black group-hover:text-[#47352F]">
                  Manage Customer Orders
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Track shipments, verify payments, and change order status.
                </p>
              </div>
            </button>

            <button
              onClick={() => onNavigate("categories")}
              className="flex items-start gap-4 rounded-xl border border-black/10 p-4 text-left hover:border-[#47352F] hover:bg-[#47352F]/5 transition group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-black group-hover:text-[#47352F]">
                  Category Taxonomies
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Organize your apparel lines into Polos, Knits, Basics, etc.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent orders highlight */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg">Recent Orders</h2>
            <button
              onClick={() => onNavigate("orders")}
              className="text-xs font-semibold text-[#47352F] hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="rounded-xl border border-black/5 bg-[#fafafa] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-black">{order.id}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      order.status === "Delivered"
                        ? "bg-amber-100 text-amber-800"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-black">{order.customerName}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{order.items.length} item(s)</span>
                  <span className="font-semibold text-black">₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------- 2. PRODUCTS TAB ------------------- */

function ProductsTab({
  products,
  categories,
  onAddNew,
  onEdit,
  onDelete,
  onToggleStock,
}: {
  products: Product[];
  categories: string[];
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleStock: (id: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.note.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl">Products Inventory</h2>
          <p className="text-xs text-muted-foreground">
            Manage kids' t-shirt styles, pricing, sizes, and stock.
          </p>
        </div>

        <button
          onClick={onAddNew}
          className="inline-flex items-center gap-2 rounded-full bg-[#47352F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:bg-[#39291F] transition"
        >
          <Plus className="h-4 w-4" />
          <span>Add New T-Shirt</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
          <input
            type="text"
            placeholder="Search products by title, fabric, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] pl-10 pr-4 py-2 text-xs focus:border-[#47352F] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-black/50 shrink-0">Filter:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#47352F] text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-black/10 bg-[#fafafa] text-xs font-semibold uppercase tracking-wider text-black/60">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Stock</th>
                <th className="px-4 py-4">Sizes</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    No products matched your search or category filter.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-black/[0.015] transition">
                    {/* Thumbnail & Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.img}
                          alt={prod.name}
                          className="h-14 w-12 rounded-lg object-cover border border-black/10 bg-secondary"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-black">{prod.name}</span>
                            {prod.badge && (
                              <span className="rounded-md bg-[#47352F]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#47352F]">
                                {prod.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{prod.note}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-black/70">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 font-semibold text-black">
                      {prod.price}
                      {prod.originalPrice && (
                        <span className="ml-1.5 text-xs font-normal text-muted-foreground line-through">
                          {prod.originalPrice}
                        </span>
                      )}
                    </td>

                    {/* Stock Count */}
                    <td className="px-4 py-4 text-xs font-medium">{prod.stockCount ?? 20} units</td>

                    {/* Sizes */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.sizes?.map((sz) => (
                          <span
                            key={sz}
                            className="rounded border border-black/10 bg-white px-1.5 py-0.5 text-[10px] font-medium text-black/80"
                          >
                            {sz}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* In Stock Toggle */}
                    <td className="px-4 py-4">
                      <button
                        onClick={() => onToggleStock(prod.id)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                          prod.inStock
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                        title="Click to toggle in-stock / out-of-stock"
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${prod.inStock ? "bg-amber-600" : "bg-red-600"}`}
                        />
                        {prod.inStock ? "In Stock" : "Sold Out"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to="/product/$id"
                          params={{ id: prod.id }}
                          target="_blank"
                          className="rounded-lg p-2 text-black/50 hover:bg-black/5 hover:text-black transition"
                          title="Preview on live site"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => onEdit(prod)}
                          className="rounded-lg p-2 text-[#47352F] hover:bg-[#47352F]/10 transition"
                          title="Edit Product"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(prod.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------- 3. CATEGORIES TAB ------------------- */

function CategoriesTab({
  categories,
  products,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
}: {
  categories: string[];
  products: Product[];
  onAddCategory: (category: string) => void;
  onEditCategory: (oldName: string, newName: string) => void;
  onDeleteCategory: (category: string) => void;
}) {
  const [newCat, setNewCat] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    onAddCategory(newCat.trim());
    setNewCat("");
  };

  const startEdit = (cat: string) => {
    setEditingCategory(cat);
    setEditingName(cat);
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setEditingName("");
  };

  const saveEdit = (oldName: string) => {
    const trimmed = editingName.trim();
    if (!trimmed || trimmed === oldName) {
      cancelEdit();
      return;
    }
    onEditCategory(oldName, trimmed);
    cancelEdit();
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h2 className="font-display text-2xl">Product Categories</h2>
        <p className="text-xs text-muted-foreground">
          Add, edit, or remove kidswear categories and storefront groupings.
        </p>
      </div>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          type="text"
          placeholder="New category name (e.g. Vintage Wash, Polos, Knitwear)..."
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          className="flex-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm focus:border-[#47352F] focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl bg-[#47352F] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-[#39291F] transition flex items-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </form>

      {/* Categories List */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-4">
          Current Categories ({categories.length - 1})
        </h3>
        {categories
          .filter((c) => c !== "All")
          .map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            const isEditing = editingCategory === cat;

            return (
              <div
                key={cat}
                className="flex items-center justify-between rounded-xl border border-black/5 bg-[#fafafa] px-5 py-3.5 transition"
              >
                {isEditing ? (
                  <div className="flex flex-1 items-center gap-2 mr-2">
                    <Tag className="h-4 w-4 text-[#47352F] shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(cat);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="flex-1 rounded-lg border border-[#47352F] bg-white px-3 py-1.5 text-sm font-medium text-black focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => saveEdit(cat)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#47352F] text-white hover:bg-[#39291F]"
                      title="Save category name"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 bg-white text-black/60 hover:text-black"
                      title="Cancel editing"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-[#47352F]" />
                      <span className="font-medium text-black">{cat}</span>
                      <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs text-black/50">
                        {count} product{count === 1 ? "" : "s"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(cat)}
                        className="rounded-lg p-2 text-black/40 hover:bg-black/5 hover:text-[#47352F] transition"
                        title="Edit category name"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteCategory(cat)}
                        className="rounded-lg p-2 text-black/30 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete category"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

/* ------------------- 4. ORDERS TAB ------------------- */

function OrdersTab({
  orders,
  onUpdateStatus,
}: {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order["status"]) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filterStatus === "All" || o.status === filterStatus;
      return matchSearch && matchStatus;
    });
  }, [orders, search, filterStatus]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Customer Orders</h2>
        <p className="text-xs text-muted-foreground">
          View purchases, shipping info, and manage order fulfillment status
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-black/10 bg-[#f7f7f5] pl-10 pr-4 py-2 text-xs focus:border-[#47352F] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                filterStatus === st
                  ? "bg-[#47352F] text-white"
                  : "bg-black/5 text-black/70 hover:bg-black/10"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="rounded-2xl border border-black/10 bg-white p-12 text-center text-sm text-muted-foreground">
            No orders found matching the filter.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-black/5 pb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-black">{order.id}</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-amber-100 text-amber-800"
                          : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Processing"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Customer: <strong className="text-black">{order.customerName}</strong> (
                    {order.email}) · {order.phone}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-black/60">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => onUpdateStatus(order.id, e.target.value as Order["status"])}
                    className="rounded-lg border border-black/15 bg-[#f7f7f5] px-3 py-1.5 text-xs font-semibold text-black focus:border-[#47352F] focus:outline-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Order Items & Shipping Address */}
              <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-8 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-black/50">
                    Items Purchased
                  </p>
                  <div className="divide-y divide-black/5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 text-sm">
                        <div className="flex items-center gap-3">
                          {item.img && (
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-10 w-9 rounded object-cover border border-black/10"
                            />
                          )}
                          <div>
                            <span className="font-medium text-black">{item.name}</span>
                            <div className="text-xs text-muted-foreground">
                              Size: <strong className="text-black">{item.size || "M"}</strong> ·
                              Color:{" "}
                              <strong className="text-black">{item.color || "Standard"}</strong> ·
                              Qty: <strong className="text-black">{item.quantity}</strong>
                            </div>
                          </div>
                        </div>
                        <span className="font-semibold text-black">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4 rounded-xl bg-[#fafafa] p-4 text-xs space-y-2 border border-black/5">
                  <p className="font-semibold uppercase tracking-wider text-black/60">
                    Shipping Destination
                  </p>
                  <p className="text-black/80">{order.address}</p>
                  <p className="text-black/80">
                    {order.city}, PIN {order.pincode}
                  </p>
                  <div className="pt-2 border-t border-black/5">
                    <p className="text-black/60">
                      Payment:{" "}
                      <strong className="uppercase text-black">{order.paymentMethod}</strong>
                    </p>
                    <p className="text-sm font-bold text-black mt-1">
                      Total: ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ------------------- 5. SETTINGS TAB ("CHANGE EVERYTHING") ------------------- */

function SettingsTab({
  formSettings,
  setFormSettings,
  onSubmit,
}: {
  formSettings: ReturnType<typeof useStore>["settings"];
  setFormSettings: React.Dispatch<React.SetStateAction<ReturnType<typeof useStore>["settings"]>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const [newMarqueeItem, setNewMarqueeItem] = useState("");

  const addMarquee = () => {
    if (!newMarqueeItem.trim()) return;
    setFormSettings((prev) => ({
      ...prev,
      marqueeItems: [...prev.marqueeItems, newMarqueeItem.trim()],
    }));
    setNewMarqueeItem("");
  };

  const removeMarquee = (index: number) => {
    setFormSettings((prev) => ({
      ...prev,
      marqueeItems: prev.marqueeItems.filter((_, i) => i !== index),
    }));
  };

  return (
    <form onSubmit={onSubmit} className="max-w-4xl space-y-10">
      <div>
        <h2 className="font-display text-2xl">Store & Hero Customizer</h2>
        <p className="text-xs text-muted-foreground">
          Modify hero headlines, background imagery, marquee badges, and store info
        </p>
      </div>

      {/* Brand Identity */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg">1. Brand Identity</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Store Name
            </label>
            <input
              type="text"
              value={formSettings.brandName}
              onChange={(e) => setFormSettings({ ...formSettings, brandName: e.target.value })}
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Brand Tagline
            </label>
            <input
              type="text"
              value={formSettings.brandTagline}
              onChange={(e) => setFormSettings({ ...formSettings, brandTagline: e.target.value })}
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-6">
        <h3 className="font-display text-lg">2. Homepage Hero Section</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Headline Line 1
            </label>
            <input
              type="text"
              value={formSettings.hero.titleLine1}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  hero: { ...formSettings.hero, titleLine1: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Headline Line 2 (Italic)
            </label>
            <input
              type="text"
              value={formSettings.hero.titleLine2}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  hero: { ...formSettings.hero, titleLine2: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Eyebrow / Sub-tag
          </label>
          <input
            type="text"
            value={formSettings.hero.eyebrow}
            onChange={(e) =>
              setFormSettings({
                ...formSettings,
                hero: { ...formSettings.hero, eyebrow: e.target.value },
              })
            }
            className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Hero Narrative Subtitle
          </label>
          <textarea
            rows={3}
            value={formSettings.hero.subtitle}
            onChange={(e) =>
              setFormSettings({
                ...formSettings,
                hero: { ...formSettings.hero, subtitle: e.target.value },
              })
            }
            className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              CTA Button Text
            </label>
            <input
              type="text"
              value={formSettings.hero.ctaText}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  hero: { ...formSettings.hero, ctaText: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              CTA Button Link
            </label>
            <input
              type="text"
              value={formSettings.hero.ctaLink}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  hero: { ...formSettings.hero, ctaLink: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
        </div>

        {/* Hero Banner Image */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Hero Background Image URL
          </label>
          <input
            type="text"
            value={formSettings.hero.imageUrl}
            onChange={(e) =>
              setFormSettings({
                ...formSettings,
                hero: { ...formSettings.hero, imageUrl: e.target.value },
              })
            }
            className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
          />
          {formSettings.hero.imageUrl && (
            <div className="mt-3 relative h-40 w-full rounded-xl overflow-hidden border border-black/10 bg-secondary">
              <img
                src={formSettings.hero.imageUrl}
                alt="Hero banner preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-white">
                  Hero Preview
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg">3. Marquee Running Ticker</h3>
        <p className="text-xs text-muted-foreground">
          Short badges that loop infinitely across the storefront
        </p>

        <div className="flex flex-wrap gap-2">
          {formSettings.marqueeItems.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-2 rounded-full border border-[#47352F]/20 bg-[#47352F]/5 px-3 py-1.5 text-xs font-semibold text-[#47352F]"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => removeMarquee(index)}
                className="text-black/40 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="New ticker text (e.g. Made for little movers)..."
            value={newMarqueeItem}
            onChange={(e) => setNewMarqueeItem(e.target.value)}
            className="flex-1 rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2 text-xs focus:border-[#47352F] focus:outline-none"
          />
          <button
            type="button"
            onClick={addMarquee}
            className="rounded-xl bg-[#47352F] px-4 py-2 text-xs font-semibold uppercase text-white hover:bg-[#39291F]"
          >
            Add
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-display text-lg">4. Contact & Support Details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Support Email
            </label>
            <input
              type="email"
              value={formSettings.contact.email}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  contact: { ...formSettings.contact, email: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Phone
            </label>
            <input
              type="text"
              value={formSettings.contact.phone}
              onChange={(e) =>
                setFormSettings({
                  ...formSettings,
                  contact: { ...formSettings.contact, phone: e.target.value },
                })
              }
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
            Offices / Studios
          </label>
          <input
            type="text"
            value={formSettings.contact.address}
            onChange={(e) =>
              setFormSettings({
                ...formSettings,
                contact: { ...formSettings.contact, address: e.target.value },
              })
            }
            className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-6 z-20 flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-[#47352F] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl hover:bg-[#39291F] transition"
        >
          <Check className="h-4 w-4 text-[#E5CFAC]" />
          <span>Save All Storefront Changes</span>
        </button>
      </div>
    </form>
  );
}

/* ------------------- PRODUCT MODAL (ADD / EDIT) ------------------- */

function ProductModal({
  isOpen,
  initialProduct,
  categories,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  initialProduct: Product | null;
  categories: string[];
  onClose: () => void;
  onSave: (product: Omit<Product, "id">) => void;
}) {
  const [name, setName] = useState(initialProduct?.name || "");
  const [category, setCategory] = useState(
    initialProduct?.category || categories[0] || "Oversized T-Shirts",
  );
  const [price, setPrice] = useState(initialProduct?.price || "₹799");
  const [originalPrice, setOriginalPrice] = useState(initialProduct?.originalPrice || "₹1,099");
  const [note, setNote] = useState(
    initialProduct?.note || "Soft cotton jersey · Comfortable everyday fit",
  );
  const [badge, setBadge] = useState(initialProduct?.badge || "");
  const [description, setDescription] = useState(
    initialProduct?.description || "A comfortable kids' t-shirt made for everyday adventures.",
  );
  const [img, setImg] = useState(initialProduct?.img || PRESET_IMAGES[0].url);
  const [stockCount, setStockCount] = useState<number>(initialProduct?.stockCount ?? 25);
  const [inStock, setInStock] = useState<boolean>(initialProduct?.inStock ?? true);
  const [isFeatured, setIsFeatured] = useState<boolean>(initialProduct?.isFeatured ?? false);
  const [department, setDepartment] = useState<"Men" | "Women" | "Kids" | "Unisex">(
    initialProduct?.department || "Kids",
  );
  const [subCategory, setSubCategory] = useState<string>(
    initialProduct?.subCategory || "Round Neck",
  );

  // Sizes selection
  const standardSizes = ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"];
  const [sizes, setSizes] = useState<string[]>(initialProduct?.sizes || standardSizes);

  // Bullet details
  const [details, setDetails] = useState<string[]>(
    initialProduct?.details || [
      "Soft cotton jersey",
      "Comfortable fit for everyday movement",
      "Machine washable",
    ],
  );
  const [newDetail, setNewDetail] = useState("");

  const toggleSize = (sz: string) => {
    if (sizes.includes(sz)) {
      setSizes(sizes.filter((s) => s !== sz));
    } else {
      setSizes([...sizes, sz]);
    }
  };

  const addDetail = () => {
    if (!newDetail.trim()) return;
    setDetails([...details, newDetail.trim()]);
    setNewDetail("");
  };

  const removeDetail = (idx: number) => {
    setDetails(details.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      name,
      category,
      price: price.startsWith("₹") ? price : `₹${price}`,
      originalPrice: originalPrice
        ? originalPrice.startsWith("₹")
          ? originalPrice
          : `₹${originalPrice}`
        : undefined,
      note,
      badge: badge.trim() || undefined,
      description,
      img,
      stockCount: Number(stockCount),
      inStock,
      isFeatured,
      sizes: sizes.length > 0 ? sizes : standardSizes,
      details,
      colors: initialProduct?.colors || [
        { name: "Ocean Blue", hex: "#3A668C" },
        { name: "Chalk White", hex: "#FFFFFF" },
      ],
      department: category.toLowerCase().includes("christmas")
        ? department
        : initialProduct?.department,
      subCategory: category.toLowerCase().includes("christmas")
        ? subCategory
        : initialProduct?.subCategory,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 bg-[#fafafa]">
          <div>
            <h3 className="font-display text-xl font-medium">
              {initialProduct ? "Edit T-Shirt / Product" : "Add New T-Shirt / Product"}
            </h3>
            <p className="text-xs text-muted-foreground">
              All changes are immediately reflected on the live website
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-black/40 hover:bg-black/5 hover:text-black transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Play-All-Day Oversized T-Shirt"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Christmas Sub-Filter Fields */}
          {category.toLowerCase().includes("christmas") && (
            <div className="rounded-xl border border-[#8A1822]/20 bg-[#8A1822]/5 p-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A1822] flex items-center gap-1.5">
                <span>🎄</span> Christmas Sub-Filter Tagging
              </span>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => {
                      const newDept = e.target.value as "Men" | "Women" | "Kids";
                      setDepartment(newDept);
                      if (newDept === "Kids") {
                        setSubCategory("Boys");
                      } else {
                        setSubCategory("Round Neck");
                      }
                    }}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm focus:border-[#47352F] focus:outline-none"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                    Sub-Category *
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm focus:border-[#47352F] focus:outline-none"
                  >
                    {department === "Men" && (
                      <>
                        <option value="Round Neck">Round Neck</option>
                        <option value="Polo">Polo</option>
                        <option value="Hoodies">Hoodies</option>
                      </>
                    )}
                    {department === "Women" && (
                      <>
                        <option value="Round Neck">Round Neck</option>
                        <option value="Polo">Polo</option>
                        <option value="Hoodies">Hoodies</option>
                      </>
                    )}
                    {department === "Kids" && (
                      <>
                        <option value="Boys">Boys</option>
                        <option value="Girls">Girls</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Price *
              </label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹1,999"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Original MRP (Optional)
              </label>
              <input
                type="text"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="₹2,799"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Badge (Optional)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Bestseller, New"
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Fabric / GSM Note
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Soft cotton jersey · Comfortable everyday fit"
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2.5 text-sm focus:border-[#47352F] focus:outline-none"
            />
          </div>

          {/* Image URL & Preset Picker */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Product Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={img}
                onChange={(e) => setImg(e.target.value)}
                className="flex-1 rounded-xl border border-black/10 bg-[#f7f7f5] px-4 py-2 text-xs focus:border-[#47352F] focus:outline-none"
              />
            </div>

            {/* Quick Presets */}
            <div>
              <span className="text-[11px] font-medium text-black/50">
                Or pick a curated t-shirt photo preset:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESET_IMAGES.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setImg(preset.url)}
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition ${
                      img === preset.url
                        ? "border-[#47352F] bg-[#47352F] text-white"
                        : "border-black/10 bg-white text-black/70 hover:border-[#47352F]"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {img && (
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-black/5 bg-[#fafafa] p-2">
                <img
                  src={img}
                  alt="Preview"
                  className="h-16 w-14 rounded-lg object-cover border border-black/10"
                />
                <span className="text-xs text-muted-foreground">Image preview active</span>
              </div>
            )}
          </div>

          {/* Available Sizes */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-2 block">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {standardSizes.map((sz) => {
                const isSelected = sizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? "border-[#47352F] bg-[#47352F] text-white"
                        : "border-black/10 bg-white text-black/70 hover:border-black/30"
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details & Bullets */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-black/60 mb-2 block">
              Fabric Specifications / Bullets
            </label>
            <div className="space-y-1.5 mb-2">
              {details.map((d, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-[#f7f7f5] px-3 py-1.5 text-xs"
                >
                  <span>{d}</span>
                  <button
                    type="button"
                    onClick={() => removeDetail(i)}
                    className="text-black/40 hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add specification bullet..."
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                className="flex-1 rounded-xl border border-black/10 bg-[#f7f7f5] px-3 py-1.5 text-xs focus:outline-none"
              />
              <button
                type="button"
                onClick={addDetail}
                className="rounded-xl border border-black/20 bg-white px-3 py-1 text-xs font-medium hover:bg-black/5"
              >
                Add
              </button>
            </div>
          </div>

          {/* Stock & Featured Toggles */}
          <div className="grid gap-4 sm:grid-cols-3 pt-2 border-t border-black/5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                Stock Count
              </label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border border-black/10 bg-[#f7f7f5] px-3 py-2 text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="inStockCheck"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="h-4 w-4 rounded accent-[#47352F]"
              />
              <label htmlFor="inStockCheck" className="text-xs font-semibold cursor-pointer">
                In Stock & Available
              </label>
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="isFeaturedCheck"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded accent-[#47352F]"
              />
              <label htmlFor="isFeaturedCheck" className="text-xs font-semibold cursor-pointer">
                Feature on Homepage
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-medium text-black/70 hover:bg-black/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#47352F] px-7 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#39291F] transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
