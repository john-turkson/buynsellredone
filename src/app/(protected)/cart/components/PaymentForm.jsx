'use client'

import { useSession } from "next-auth/react"
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from "@/context/ToastContext";

export default function PaymentForm({ clientSecret, closeModal }) {

    

    const stripe = useStripe();
    const elements = useElements();
    const { data: session } = useSession()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: session?.user?.email,
        address: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'CA',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [cardError, setCardError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const { addToast } = useToast();

    const handleCardChange = (event) => {
        setCardError(event.error ? event.error.message : '');
    };

    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from the event
        setFormData((prevState) => ({
            ...prevState, // Retain the previous form data
            [name]: value, // Update the value for the specific input field
        }));
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
                    name: `${formData.firstName} ${formData.lastName}`,
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
            closeModal();
            console.log('Payment successful:', paymentIntent);
            setIsProcessing(false);
            addToast('Order Made Successfully', 'success')
        }
    }

    return (
        <>
            <div>
                {/* <!-- Card Section --> */}
                <div className="max-w-2xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
                    {/* <!-- Card --> */}
                    <div className="rounded-xl sm:p-7">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-neutral-200">
                                Payment
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                Enter your payment details.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* <!-- Section --> */}
                            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                                <label htmlFor="af-payment-billing-contact" className="inline-block text-sm font-medium dark:text-white">
                                    Billing contact
                                </label>

                                <div className="mt-2 space-y-3">
                                    <input name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="First Name" />
                                    <input name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Last Name" />
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email" />
                                </div>
                            </div>
                            {/* <!-- End Section --> */}

                            {/* <!-- Section --> */}
                            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                                <label htmlFor="af-payment-billing-address" className="inline-block text-sm font-medium dark:text-white">
                                    Billing address
                                </label>

                                <div className="mt-2 space-y-3">
                                    <input type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input name="postalCode" value={formData.postalCode} onChange={handleChange} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Zip Code" />
                                        <input name="city" value={formData.city} onChange={handleChange} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="City" />
                                        <input name="state" value={formData.state} onChange={handleChange} type="text" className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="State/Province" />
                                    </div>
                                    <select name="country" value={formData.country} onChange={handleChange} className="py-2 px-3 pe-9 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                        <option value='CA'>Canada</option>
                                        <option value="US">Unitied States</option>
                                        <option value="GB">Great Britan</option>
                                    </select>
                                </div>
                            </div>
                            {/* <!-- End Section --> */}

                            {/* <!-- Section --> */}
                            <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-neutral-700 dark:first:border-transparent">
                                <label htmlFor="af-payment-payment-method" className="inline-block text-sm font-medium dark:text-white">
                                    Payment method
                                </label>

                                <div className="mt-2 py-2 space-y-3">

                                    {/* Stripe Payment Button */}
                                    <div className="border p-4 bg-white rounded-lg">
                                        <CardElement
                                            options={{
                                                hidePostalCode: true,
                                                style: {
                                                    base: {
                                                        color: "#37485e",
                                                    },
                                                },
                                            }}
                                            onChange={handleCardChange}
                                        />
                                    </div>
                                    {/* Display Error Message for General Errors */}
                                    {cardError && <p className="text-red-500 text-sm mt-2">{cardError}</p>}
                                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                                </div>
                            </div>
                            {/* <!-- End Section --> */}
                            <div className="mt-4 flex gap-x-2 justify-center">
                                <button type="submit"
                                    disabled={!stripe || isProcessing} className="w-full py-2 px-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Pay Now
                                </button>
                            </div>
                        </form>



                    </div>
                    {/* <!-- End Card --> */}
                </div>
                {/* <!-- End Card Section --> */}
            </div>
        </>
    )
}
