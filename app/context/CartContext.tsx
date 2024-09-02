'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartData, Product } from '../types/fakestoreapi';

export interface CartProduct extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartProduct[];
  totalValue: string;
  isLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [totalValue, setTotalValue] = useState<string>('0');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const FAKE_USER_ID = 1;
  let initialLoad = false;

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const cartResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/user/${FAKE_USER_ID}`);
        const cartData = await cartResponse.json() as CartData[];
        setCartId(cartData[0].id)

        const productsWithDetails = await Promise.all( // assume that first cart is the newest one
          cartData[0].products.map(async (item: { productId: number; quantity: number }) => {
            const productResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${item.productId}`);
            const productData = await productResponse.json();
            return {
              ...productData,
              quantity: item.quantity,
            } as CartProduct;
          })
        );

        initialLoad = true;
        setCart(productsWithDetails);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      setIsLoading(true);
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carts/${cartId}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 3,
            date: new Date().toISOString().split('T')[0],
            products: cart.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        });
      } catch (error) {
        console.error('Error updating cart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const total = cart.reduce((acc, curr) => acc + parseFloat(curr.price) * curr.quantity, 0);
    setTotalValue(total.toFixed(2));

    if(initialLoad) {
      initialLoad = false;
      return;
    }

    if (!isLoading && !initialLoad) {
      updateCart();
    }
  }, [cart]);

  const addToCart = (product: Product) => {
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
    <CartContext.Provider value={{ cart, totalValue, isLoading, addToCart, removeFromCart, updateQuantity }}>
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
