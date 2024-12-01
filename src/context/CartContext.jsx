'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState(null);
  const { data: session } = useSession();

  // Initialize the cart when the user logs in
  useEffect(() => {
    if (session?.user) {
      const user = session.user.username;
      setUsername(user);

      // Load cart from localStorage
      const savedCart = localStorage.getItem(`cart_${user}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, [session]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (username) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    }
  }, [cart, username]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Add item only if it doesn't already exist in the cart
      const itemExists = prevCart.some((cartItem) => cartItem._id === item._id);
      if (!itemExists) {
        return [...prevCart, item];
      }
      return prevCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
