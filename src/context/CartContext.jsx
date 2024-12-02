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
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrderCost, setOrderCost] = useState(0);
  const { data: session } = useSession();

  // Initialize the cart when the user logs in
  useEffect(() => {
    if (session?.user) {
      const user = session.user.username;
      setUsername(user);

      // Load cart from localStorage
      const savedCart = localStorage.getItem(`cart_${user}`);
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      setCart(parsedCart);

      // Calculate initial total price
      const initialTotal = parsedCart.reduce((total, item) => total + item.price, 0);
      setTotalPrice(initialTotal);
    }
  }, [session]);

  // Save cart to localStorage and update total price when the cart changes
  useEffect(() => {
    if (username) {
      localStorage.setItem(`cart_${username}`, JSON.stringify(cart));

      // Update total price
      const updatedTotal = cart.reduce((total, item) => total + item.price, 0);
      setTotalPrice(updatedTotal);
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
    setCart((prevCart) => {
      // Find the item to be removed
      const itemToRemove = prevCart.find((item) => item._id === id);
      
      // Update the order cost only if the item exists in the cart
      if (itemToRemove && totalOrderCost > 0) {
        setOrderCost(totalOrderCost - itemToRemove.price);
      }
  
      // Remove the item from the cart
      return prevCart.filter((item) => item._id !== id);
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice, // Provide totalPrice to the context
        totalOrderCost, // Provide totalOrderCost to the context
        setOrderCost,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
