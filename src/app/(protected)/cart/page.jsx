'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './components/StripeCheckoutForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const { cart, updateCartItemQuantity, removeFromCart, getTotalPrice } = useCart();
  const [user, setUser] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [checkout, setCheckOut] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [shippingPrice, setShippingPrice] = useState(15);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  useEffect(() => {
    // Update the shipping price based on the selected country
    const shippingPrices = {
      Canada: 15,
      'United States': 20,
      'United Kingdom': 25,
    };
    setShippingPrice(shippingPrices[selectedCountry] || 15);
  }, [selectedCountry]);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      // Calculate total amount including updated shipping price
      const totalAmount = getTotalPrice() + shippingPrice;

      // Call the API route to create a PaymentIntent
      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Amount is in cents
      });

      const data = await response.json();
      setClientSecret(data.clientSecret); // Get the client secret from the backend
    };

    if (checkout) {
      fetchPaymentIntent();
    }
  }, [checkout, getTotalPrice, shippingPrice]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(id, newQuantity);
    }
  };

  const totalProducts = getTotalPrice();
  const totalPrice = totalProducts + shippingPrice;

  const handleClose = () => {
    setCheckOut(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 sm:p-8 dark:text-white min-h-screen">
      {/* Left: Cart Items */}
      <div className="cart__left p-4 sm:p-8 rounded-lg shadow-lg dark:bg-neutral-900 bg-neutral-100">
        <div className="cart__content">
          <h1 className="text-2xl sm:text-4xl my-4 sm:my-8 font-medium text-center dark:text-white">
            Shopping Cart
          </h1>
          <p className="text-center">
            {cart.length > 0 ? `${cart.length} products in cart` : 'No products in cart.'}
          </p>
          <ul className="divide-y divide-gray-300 space-y-4">
            {cart.map((item) => (
              <li key={item._id} className="flex flex-col sm:flex-row justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src="https://img.uline.com/is/image/uline/H-4568?$Mobile_Zoom$"
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                  <div>
                    <h3 className="text-lg font-medium dark:text-white">{item.name}</h3>
                    <div className="flex items-center mt-2">
                      <label className="text-sm dark:text-white">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        className="ml-2 w-16 dark:text-black border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mt-4 sm:mt-0">
                  <p className="font-price font-semibold dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="dark:text-red hover:text-red-500 transition duration-150"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Shipping Country Dropdown */}
        <div className="flex justify-between items-center">
          <p className="font-medium dark:text-white">Select Shipping Country</p>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="border border-gray-300 rounded p-2 dark:text-black"
            required
          >
            <option value="Canada">Canada</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="cart__right p-4 sm:p-8 rounded-lg shadow-lg flex flex-col justify-center h-full dark:bg-neutral-950 bg-neutral-200">
        <div className="cart__content space-y-4">
          <div className="flex justify-between">
            <p className="font-medium dark:text-white">Products in cart</p>
            <p className="font-price dark:text-white">${totalProducts.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium dark:text-white">Shipping</p>
            <p className="font-price dark:text-white">${shippingPrice.toFixed(2)}</p>
          </div>

          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between">
            <p className="text-2xl font-bold dark:text-white">Total</p>
            <p className="text-2xl font-price dark:text-white">${totalPrice.toFixed(2)}</p>
          </div>
          {totalProducts > 0 && (
            <button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-200"
              onClick={() => setCheckOut(true)} // Trigger checkout
            >
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>

      {checkout && clientSecret && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto bg-neutral-50 dark:bg-neutral-800">
            <h2 className="text-2xl font-medium text-center mb-4 dark:text-white">Complete Your Purchase</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm clientSecret={clientSecret} onClose={handleClose} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
}
