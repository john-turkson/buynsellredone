'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckoutForm from './components/StripeCheckoutForm';
import Link from 'next/link';
import OrderSummaryField from './components/OrderSummaryField';
import CartItem from './components/CartItem';
import ShippingDropdown from './components/ShippingDropdown';
import { useRouter } from "next/navigation";
import PaymentConfirmModal from './components/PaymentConfirmModal';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const [user, setUser] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [checkout, setCheckout] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(null);

  
  const totalTax = parseFloat((totalPrice * 0.13).toFixed(2));
  const totalCheckoutAmount = shippingPrice + totalTax + totalPrice

  const router = useRouter();

  // Calculate shipping price based on selected country
  const shippingPrices = {
    'CA': 15,
    'US': 20,
    'GB': 25,
  };

  // User initialization from localStorage
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      setUser(JSON.parse(userDetails));
    }
  }, []);

  // Update shipping price based on country
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Set the shipping price based on the selected country
    if (country) {
      setShippingPrice(shippingPrices[country]);
    } else {
      setShippingPrice(null); // Reset shipping price if no country is selected
    }
  };

  // Create payment intent when checkout is triggered
  useEffect(() => {
    if (!checkout) return;

    const fetchPaymentIntent = async () => {
      const totalAmount = totalCheckoutAmount;

      const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe expects cents
      });

      const data = await response.json();
      setClientSecret(data.clientSecret);
    };

    fetchPaymentIntent();
  }, [checkout, totalCheckoutAmount]);


  const handleCloseCheckout = () => setCheckout(false);

  return (
    <div className="max-w-[85rem] mx-auto px-4">
      <div className='flex min-h-screen gap-x-16'>
        <div className='w-3/4 py-4 px-2 mx-2 mt-4'>
          <h1 className="text-xl font-semibold mb-6">Shopping Cart</h1>
          {cart.map((item, index) => (
            <CartItem item={item} key={index} remove={removeFromCart} />
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
          <div className='flex items-center justify-between pt-4'>
            <div>
              <p className='text-sm font-medium'>Shipping</p>
              
            </div>
            {selectedCountry != null ? (<p className='text-sm font-medium'>{`$${shippingPrice}`}</p>) : (<ShippingDropdown onCountryChange={handleCountryChange} />)}
          </div>
          {selectedCountry !== null && (
                <p
                  onClick={() => setSelectedCountry(null)}
                  className="text-neutral-400 dark:text-neutral-400 pb-2 underline cursor-pointer text-xs hover:text-purple-500 transition duration-150"
                >
                  Clear
                </p>
              )}
          <OrderSummaryField fieldName={'Estimated Tax'} fieldValue={`$${totalTax}`} />
          <div className='flex items-center justify-between pt-4'>
                <div>
                    <p className='text-sm font-medium'>Total</p>
                </div>
                <p className='text-sm font-medium'>{`$${totalCheckoutAmount}`}</p>
            </div>
          {/* <button
            onClick={() => setCheckout(true)}
            className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-sm transition duration-200"
          >
            Proceed to Checkout
          </button> */}
          <PaymentConfirmModal orderAmount={totalCheckoutAmount} />

        </div>
      </div>

      {checkout && clientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto bg-neutral-50 dark:bg-neutral-800">
            <h2 className="text-2xl font-medium text-center mb-4 dark:text-white">Complete Your Purchase</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <StripeCheckoutForm clientSecret={clientSecret} onClose={handleCloseCheckout} />
            </Elements>
          </div>
        </div>
      )}

    </div>
  );
}
