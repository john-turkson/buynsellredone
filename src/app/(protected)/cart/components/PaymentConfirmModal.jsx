import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '@/context/CartContext';

// Fetch the payment intent and store the client secret
const fetchPaymentIntent = async (orderAmount, setClientSecret) => {
    const totalAmount = orderAmount;

    const response = await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Stripe expects cents
    });

    const data = await response.json();
    console.log(data.clientSecret);  // For debugging
    setClientSecret(data.clientSecret); // Store the client secret in the state
};

export default function PaymentConfirmModal({ orderAmount }) {

    const { cart } = useCart();

    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    const [clientSecret, setClientSecret] = useState(null);  // State to store the client secret

    const handlePaymentIntent = () => {
        fetchPaymentIntent(orderAmount, setClientSecret);  // Call the fetchPaymentIntent function
    };

    const closeModal = () => {
        // Close the modal by manipulating the `data-hs-overlay` attribute
        const modal = document.querySelector('[data-hs-overlay="#hs-vertically-centered-modal"]');
        if (modal) {
            modal.click();  // Trigger the close action by simulating a click event
        }
    };

    return (
        <div>
            <button
                type="button"
                onClick={handlePaymentIntent}  // Trigger fetchPaymentIntent on button click
                className={`w-full mt-6 py-3 rounded-lg font-semibold shadow-sm transition duration-200 ${
                    (orderAmount > 0 && cart.length > 0)
                        ? 'bg-purple-600 hover:bg-purple-500 text-white' 
                        : 'bg-purple-300 text-gray-800 cursor-not-allowed'
                }`}
                disabled={(orderAmount <= 0 && cart.length == 0)}  // Disable button if orderAmount is 0 or less
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-vertically-centered-modal"
                data-hs-overlay="#hs-vertically-centered-modal"
            >
                {(orderAmount > 0 && cart.length > 0) ? 'Proceed to Checkout' : 'Cart is Empty'}
            </button>

            <div
                id="hs-vertically-centered-modal"
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabIndex="-1"
                aria-labelledby="hs-vertically-centered-modal-label"
            >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                            <h3
                                id="hs-vertically-centered-modal-label"
                                className="font-bold text-gray-800 dark:text-white"
                            >
                                Complete Your Purchase
                            </h3>
                            <button
                                type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close"
                                data-hs-overlay="#hs-vertically-centered-modal"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18"></path>
                                    <path d="m6 6 12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="overflow-y-auto">
                            {/* Insert form here */}
                            {clientSecret ? (
                                <Elements stripe={stripePromise} options={clientSecret}>
                                    <PaymentForm clientSecret={clientSecret} closeModal={closeModal} />
                                </Elements>
                                // Pass the clientSecret to PaymentForm
                            ) : (
                                <p className='my-16 p-16 text-center text-lg font-semibold text-neutral-400'>Loading...</p>  // Show a loading message while waiting for clientSecret
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
