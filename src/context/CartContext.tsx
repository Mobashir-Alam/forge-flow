import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";
import type { DBProduct } from "@/hooks/useProducts";

export interface CartItem {
  product: DBProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  addToCart: (product: DBProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  totalPrice: number;
  badgeAnimating: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [badgeAnimating, setBadgeAnimating] = useState(false);

  const triggerBadge = useCallback(() => {
    setBadgeAnimating(true);
    setTimeout(() => setBadgeAnimating(false), 300);
  }, []);

  const addToCart = useCallback((product: DBProduct, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { product, quantity: qty }];
    });
    triggerBadge();
    toast({ title: "Added to cart", description: `${product.name} added successfully` });
  }, [triggerBadge]);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    if (qty < 1) return;
    setItems(prev => prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + Number(i.product.price) * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, wishlist, isCartOpen, addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist, setIsCartOpen, totalItems, totalPrice, badgeAnimating }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
