'use client';

import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentSuccess from './PaymentSuccess';

export default function StripeCheckoutForm ({ clientSecret, onClose }) {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'CA',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [cardError, setCardError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCardChange = (event) => {
    setCardError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe hasn't loaded correctly. Please try again later.");
      setIsProcessing(false);
      return;
    }

    const billingCountry = formData.country || 'CA';

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: {
            line1: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            country: billingCountry,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      console.log('Payment successful:', paymentIntent);
      setIsProcessing(false);
      setIsPaymentSuccessful(true); // Mark payment as successful
    }
  };

  return (
    <div className="relative bg-neutral-100 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-0 dark:bg-neutral-900">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-2 left-2 text-gray-500 hover:text-gray-800 text-2xl dark:hover:text-white"
      >
        ✕
      </button>

      {/* Show Payment Success Popup if payment was successful */}
      {isPaymentSuccessful ? (
        <PaymentSuccess onClose={onClose} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="border p-3 w-full bg-white text-black rounded-lg text-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border p-3 w-full bg-white text-black rounded-lg text-lg"
            />
          </div>

          {/* Address Fields */}
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="border p-3 w-full bg-white text-black rounded-lg text-lg"
          />
          <div className="flex flex-col md:flex-row md:space-x-6">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="border p-3 w-full bg-white text-black rounded-lg text-lg"
            />
            <input
              type="text"
              name="state"
              placeholder="State/Province"
              value={formData.state}
              onChange={handleInputChange}
              required
              className="border p-3 w-full bg-white text-black rounded-lg text-lg"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleInputChange}
              required
              className="border p-3 w-full bg-white text-black rounded-lg text-lg"
            />
          </div>

          {/* Country Selector */}
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            className="border p-3 w-full bg-white text-black rounded-lg text-lg"
          >
            <option value="CA">Canada</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
          </select>

          {/* Card Element with Error Handling */}
          <label className="block text-gray-700 text-lg dark:text-white">Card Details</label>
          <div className="border p-4 bg-white rounded-lg">
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: '18px',
                    color: '#000000',
                    '::placeholder': { color: '#a0aec0' },
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
              onChange={handleCardChange}
            />
            {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
          </div>

          {/* Display Error Message for General Errors */}
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className={`mt-6 bg-blue-600 text-white py-3 w-full rounded-lg text-lg ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      )}
    </div>
  );
}
