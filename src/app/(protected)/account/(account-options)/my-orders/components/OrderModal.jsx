import React from 'react';
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa";
import PaymentIcon from './PaymentIcon';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.AUTH_URL, // Ensure this is correctly defined in your `.env.local`
});

async function getListing(listingId) {
    try {
        const response = await axiosInstance.get('/api/get-listing', {
            params: { listingId: listingId },
        });
        return response.data.listing || {}; // Return the listing data or an empty object
    } catch (error) {
        console.error("Error fetching listing:", error);
        if (error.response && error.response.status === 404) {
            // No listing found
            return {}; // Return an empty object for a 404 status
        }
        return null; // Return null on other failures
    }
}

async function fetchListings(listingIds) {
    try {
        // Use Promise.all to fetch listings concurrently
        const listings = await Promise.all(
            listingIds.map(async (listingId) => {
                const listing = await getListing(listingId);
                return {
                    id: listingId,
                    data: listing
                };
            })
        );

        // Filter out null results (failed fetches)
        const validListings = listings.filter(listing => listing.data !== null);

        return validListings;
    } catch (error) {
        console.error("Error in fetchListings:", error);
        return [];
    }
}

export default async function OrderModal({ order }) {

    const fetchedListings = await fetchListings(order.orderListings);

    const totalPrice = parseFloat(order.price.toFixed(2))

    const date = new Date(order.orderDate);

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <>
            <div className="text-center">
                <button
                    type="button"
                    className="hs-collapse-toggle text-sm dark:text-neutral-200 hover:underline hover:text-purple-400 focus:outline-none"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="hs-ai-modal"
                    data-hs-overlay="#hs-ai-modal"
                >
                    View Details
                </button>
            </div>
            {/* Modal */}
            <div
                id="hs-ai-modal"
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabIndex={-1}
                aria-labelledby="hs-ai-modal-label"
            >
                <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                    <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-neutral-800">
                        <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
                            {/* Close Button */}
                            <div className="absolute top-2 end-2">
                                <button type="button" className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600" aria-label="Close" data-hs-overlay={`#hs-ai-modal`}>
                                    <span className="sr-only">Close</span>
                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            {/* End Close Button */}
                            {/* SVG Background Element */}
                            <figure className="absolute inset-x-0 bottom-0 -mb-px">
                                <svg
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 1920 100.1"
                                >
                                    <path
                                        fill="currentColor"
                                        className="fill-white dark:fill-neutral-800"
                                        d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                                    />
                                </svg>
                            </figure>
                            {/* End SVG Background Element */}
                        </div>
                        <div className="relative z-10 -mt-12">
                            {/* Icon */}
                            <span className="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
                                <svg
                                    className="shrink-0 size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                                </svg>
                            </span>
                            {/* End Icon */}
                        </div>
                        {/* Body */}
                        <div className="p-4 sm:p-7 overflow-y-auto">
                            <div className="text-center">
                                <h3
                                    id="hs-ai-modal-label"
                                    className="text-lg font-semibold text-gray-800 dark:text-neutral-200"
                                >
                                    Invoice from Exchangr
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                    Invoice #{order.orderId}
                                </p>
                            </div>
                            {/* Grid */}
                            <div className="mt-5 sm:mt-10 grid grid-cols-2 sm:grid-cols-3 gap-5">
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                                        Amount paid:
                                    </span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        ${totalPrice}
                                    </span>
                                </div>
                                {/* End Col */}
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                                        Date paid:
                                    </span>
                                    <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                                        {formattedDate}
                                    </span>
                                </div>
                                {/* End Col */}
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 dark:text-neutral-500">
                                        Payment method:
                                    </span>
                                    <div className="flex items-center gap-x-2">
                                        <PaymentIcon paymentMethod={order.paymentMethod} />
                                        <span className="block text-sm font-medium text-gray-800 dark:text-neutral-200">
                                            {order.paymentMethod.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                {/* End Col */}
                            </div>
                            {/* End Grid */}
                            <div className="mt-5 sm:mt-10">
                                <h4 className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                    Listing Summary
                                </h4>
                                <ul className="mt-3 flex flex-col">
                                    {fetchedListings.length > 0 ? (
                                        fetchedListings.map((listing, index) => {
                                            return (
                                                <li key={index} className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">

                                                    <div className="flex items-center justify-between w-full">
                                                        {listing.description}
                                                        <span>{listing.data.name}</span>
                                                        <span>${listing.data.price}</span>
                                                    </div>

                                                </li>
                                            );
                                        })
                                    ) : (
                                        <p>No listings available</p>
                                    )}
                                </ul>
                            </div>
                            {/* Button */}

                            {/* End Buttons */}

                        </div>
                        {/* End Body */}
                    </div>
                </div>
            </div>
            {/* End Modal */}
        </>

    );
}
