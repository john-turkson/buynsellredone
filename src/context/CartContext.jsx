'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Create a context for cart
const CartContext = createContext();

// Custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component that will wrap the app to provide cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState(null);
  const { data: session } = useSession();  // Get the session data

  // Initialize cart only when the component is mounted (on the client side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use session.user instead of localStorage for username
      const user = session?.user?.username || null;  // Access the username from session
      setUsername(user);

      if (user) {
        const savedCart = localStorage.getItem(`cart_${user}`);
        setCart(savedCart ? JSON.parse(savedCart) : []);
      }
    }
  }, [session]);  // Re-run the effect if the session changes

  // Sync cart to localStorage whenever the cart changes
  useEffect(() => {
    if (username && cart.length > 0) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
    }
  }, [cart, username]);

  // Add item to cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem._id === item._id);
      let newCart;

      if (existingItemIndex >= 0) {
        newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      return newCart;
    });
  };

  // Update quantity of an item in the cart
  const updateCartItemQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex(item => item._id === id);
      if (itemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity = newQuantity;
        return updatedCart;
      }
      return prevCart;
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item._id !== id);
      return updatedCart;
    });
  };

  // Get total price of all items in the cart
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
