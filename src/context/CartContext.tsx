import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/store";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const DEFAULT_CART_CONTEXT: CartContextType = {
  items: [],
  cartOpen: false,
  setCartOpen: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  cartTotal: 0,
};

const CartContext = createContext<CartContextType>(DEFAULT_CART_CONTEXT);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved =
        localStorage.getItem("thread_and_roots_cart") || localStorage.getItem("arovia_cart_v2");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Error loading cart from storage", e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("thread_and_roots_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Error saving cart to storage", e);
    }
  }, [items]);

  const addToCart = (product: Product, size?: string, color?: string) => {
    const defaultSize =
      size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : "M");
    const defaultColor =
      color || (product.colors && product.colors.length > 0 ? product.colors[0].name : "Standard");

    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === defaultSize &&
          item.selectedColor === defaultColor,
      );

      if (existingIndex > -1) {
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: defaultSize,
          selectedColor: defaultColor,
        },
      ];
    });
    setCartOpen(true);
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (!size || item.selectedSize === size) &&
            (!color || item.selectedColor === color)
          ),
      ),
    );
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        const matches =
          item.product.id === productId &&
          (!size || item.selectedSize === size) &&
          (!color || item.selectedColor === color);
        return matches ? { ...item, quantity } : item;
      }),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Helper to parse price e.g. "₹2,199" -> 2199
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const cleaned = priceStr.replace(/[^0-9]/g, "");
    return parseInt(cleaned, 10) || 0;
  };

  const cartTotal = items.reduce(
    (sum, item) => sum + parsePrice(item.product.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  return context || DEFAULT_CART_CONTEXT;
}
