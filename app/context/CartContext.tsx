'use client'

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types/fakestoreapi';

interface CartProduct extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  totalValue: number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [totalValue, setTotalValue] = useState<string>('0');

  useEffect(() => {
    const total = cart.reduce((acc, curr) => (acc + parseFloat(curr.price) * curr.quantity), 0);
    setTotalValue(total.toFixed(2));
  }, [cart]);

  const addToCart = (product: CartProduct) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, totalValue, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
