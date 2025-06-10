import React, { createContext, ReactNode, useContext, useState } from "react";
import { Product, CartItem } from "../types";

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeItem: (product: Product) => void;
  clear: () => void;
  getCartItemCount: () => number;
  getCartTotalAmount: () => number;
  updateCartItemCount: (product: Product, count: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

/**Cart context provider wrapper used to pass down context data to wrapped components */
export const CartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const hasItem = cart.find((cartItem) => cartItem.product.id === product.id);
    if (hasItem) {
      const updatedCart = cart.map((cartItem: CartItem) => {
        if (cartItem?.product.id === product.id) {
          return {
            ...cartItem,
            quantity: ++cartItem.quantity,
          };
        }
        return cartItem;
      });
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeItem = (product: Product) => {
    const newCart = cart.filter((cartItem: CartItem) => {
      return cartItem.product.id !== product.id;
    });

    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
  };

  const updateCartItemCount = (product: Product, count: number) => {
    if (count === 0) return removeItem(product);

    const updatedCart = cart.map((cartItem) => {
      if (cartItem.product.id === product.id) {
        return { ...cartItem, quantity: count };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };

  const getCartItemCount = (): number => {
    return cart.reduce((count: number, item: CartItem) => {
      return (count += item.quantity);
    }, 0);
  };

  const getCartTotalAmount = (): number => {
    return cart.reduce((totalPrice: number, cartItem: CartItem) => {
      return (totalPrice += cartItem.product.price * cartItem.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clear,
        getCartItemCount,
        getCartTotalAmount,
        updateCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("not wrapped with CartContextProvider");
  }
  return context;
}
