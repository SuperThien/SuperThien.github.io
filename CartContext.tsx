import React, { createContext, useContext, useState } from "react";
import { MenuItem } from "../ThucDon";

export type CartItem = {
  product: MenuItem;
  size: "Nhỏ" | "Vừa" | "Lớn";
  toppings: string[];
  quantity: number;
  note?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  updateNote: (index: number, newNote: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
  setCart(prev => {
    const next = prev.map((item, i) =>
      i === index ? { ...item, quantity } : item
    );
    return next;
  });
};

const updateNote = (index: number, newNote: string) => {
  setCart(prev => {
    const next = prev.map((item, i) =>
      i === index ? { ...item, note: newNote } : item
    );
    return next;
  });
};

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        updateNote,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
};
