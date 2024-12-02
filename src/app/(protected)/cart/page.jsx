'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './components/StripeCheckoutForm';
import Link from 'next/link';
import OrderSummaryField from './components/OrderSummaryField';
import CartItem from './components/CartItem';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [user, setUser] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Canada');
  const [shippingPrice, setShippingPrice] = useState(15);

  // User initialization from localStorage
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  // Update shipping price based on country
  useEffect(() => {
    const shippingPrices = {
      Canada: 15,
      'United States': 20,
      'United Kingdom': 25,
    };
    setShippingPrice(shippingPrices[selectedCountry] || 15);
  }, [selectedCountry]);

  // Create payment intent when checkout is triggered
  useEffect(() => {
    if (!checkout) return;

    const fetchPaymentIntent = async () => {
      const totalAmount = getTotalPrice() + shippingPrice;

      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe expects cents
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchPaymentIntent();
  }, [checkout, getTotalPrice, shippingPrice]);

  const totalProducts = getTotalPrice();
  const totalPrice = totalProducts + shippingPrice;

  const handleCloseCheckout = () => setCheckout(false);

  return (
    <div className="max-w-[85rem] mx-auto px-4">
      <div className='flex min-h-screen gap-x-16'>
        <div className='w-3/4 py-4 px-2 mx-2 mt-4'>
          <h1 className="text-xl font-semibold mb-6">Shopping Cart</h1>
          {cart.map((item, index) => (
            <CartItem item={item} key={index} remove={removeFromCart}/>
          ))}

          {cart.length > 0 ? (
            <p className="text-right text-neutral-500">{`Items in cart: ${cart.length}`}</p>
          ) : (
            <p className="text-center text-neutral-500">No Items in cart.</p>
          )}

        </div>
        <div className='w-1/4 py-4 px-2 mx-2 mt-4'>
          <h1 className='text-lg font-semibold mb-1'>Order Summary</h1>
          <OrderSummaryField fieldName={'Subtotal'} fieldValue={`$${totalPrice}`} />
          <OrderSummaryField fieldName={'Shipping'} fieldValue={'$15'} />
          <OrderSummaryField fieldName={'Estimated Tax'} fieldValue={'$229'} />
          <button
              onClick={() => setCheckout(true)}
              className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-sm transition duration-200"
            >
              Proceed to Checkout
            </button>

        </div>
      </div>
    </div>
  );
}
