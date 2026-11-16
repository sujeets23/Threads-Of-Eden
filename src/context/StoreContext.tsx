import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  Product,
  StoreSettings,
  Order,
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_ORDERS,
  getStoredProducts,
  saveStoredProducts,
  getStoredCategories,
  saveStoredCategories,
  getStoredSettings,
  saveStoredSettings,
  getStoredOrders,
  saveStoredOrders,
  resetStoreToDefaults,
} from "@/lib/store";

interface StoreContextType {
  products: Product[];
  categories: string[];
  settings: StoreSettings;
  orders: Order[];
  addProduct: (product: Omit<Product, "id"> & { id?: string }) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  updateSettings: (updates: Partial<StoreSettings>) => void;
  addOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  resetDefaults: () => void;
  getProduct: (id: string) => Product | undefined;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_SETTINGS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state from storage
  const syncFromStorage = useCallback(() => {
    setProducts(getStoredProducts());
    setCategories(getStoredCategories());
    setSettings(getStoredSettings());
    setOrders(getStoredOrders());
  }, []);

  // Initial load
  useEffect(() => {
    syncFromStorage();
    setIsLoaded(true);

    const handleCustomUpdate = () => {
      syncFromStorage();
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key?.startsWith("thread_roots_") || e.key?.startsWith("arovia_apparel_")) {
        syncFromStorage();
      }
    };

    window.addEventListener("thread_roots_store_updated", handleCustomUpdate);
    window.addEventListener("arovia_store_updated", handleCustomUpdate);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("thread_roots_store_updated", handleCustomUpdate);
      window.removeEventListener("arovia_store_updated", handleCustomUpdate);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [syncFromStorage]);

  const addProduct = (newProdData: Omit<Product, "id"> & { id?: string }): Product => {
    const slug = newProdData.id || newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Math.random().toString(36).substring(2, 6);
    const newProduct: Product = {
      ...newProdData,
      id: slug,
      details: newProdData.details || [],
      sizes: newProdData.sizes || ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y", "12-13Y"],
      colors: newProdData.colors || [{ name: "Standard", hex: "#47352F" }],
      inStock: newProdData.inStock ?? true,
      stockCount: newProdData.stockCount ?? 20,
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const toggleStock = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const addCategory = (categoryName: string) => {
    const trimmed = categoryName.trim();
    if (!trimmed || categories.includes(trimmed)) return;
    const updated = [...categories, trimmed];
    setCategories(updated);
    saveStoredCategories(updated);
  };

  const deleteCategory = (categoryName: string) => {
    if (categoryName === "All") return;
    const updated = categories.filter((c) => c !== categoryName);
    setCategories(updated);
    saveStoredCategories(updated);
  };

  const updateSettings = (updates: Partial<StoreSettings>) => {
    const updated: StoreSettings = {
      ...settings,
      ...updates,
      hero: {
        ...settings.hero,
        ...(updates.hero || {}),
      },
      announcement: {
        ...settings.announcement,
        ...(updates.announcement || {}),
      },
      contact: {
        ...settings.contact,
        ...(updates.contact || {}),
      },
    };
    setSettings(updated);
    saveStoredSettings(updated);
  };

  const addOrder = (orderData: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Math.floor(10000 + Math.random() * 90000),
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveStoredOrders(updated);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveStoredOrders(updated);
  };

  const resetDefaults = () => {
    resetStoreToDefaults();
    syncFromStorage();
  };

  const getProduct = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        settings,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        addCategory,
        deleteCategory,
        updateSettings,
        addOrder,
        updateOrderStatus,
        resetDefaults,
        getProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
