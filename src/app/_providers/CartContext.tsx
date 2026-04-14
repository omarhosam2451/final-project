"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getLoggedUserCart } from "../_actions/getCart.actions";

interface CartContextType {
  cartItems: any[];
  numOfCartItems: number;
  totalCartPrice: number;
  cartId: string | null;
  loading: boolean;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [numOfCartItems, setNumOfCartItems] = useState<number>(0);
  const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function refreshCart() {
    try {
      const res = await getLoggedUserCart();
      if (res.status === "success" && res.data) {
        setCartItems(res.data.products || res.data.cartItems || []);
        setNumOfCartItems(res.numOfCartItems || 0);
        setTotalCartPrice(res.data.totalCartPrice || 0);
        setCartId(res.cartId || res.data._id || null);
      }
    } catch (error) {
      console.error("Failed to refresh cart context:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, numOfCartItems, totalCartPrice, cartId, loading, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
