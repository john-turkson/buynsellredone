'use client'

import React, { useState } from 'react';
import axios from 'axios';
import OrderModal from './OrderModal';


export default function OrderCard({ order }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = async () => {
        // Fetch listing details only when modal is opened
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className="border rounded-lg p-4 m-4 hover:border-purple-500 dark:hover:border-purple-400
                bg-white text-black dark:bg-neutral-900 dark:text-white border-gray-300 dark:border-neutral-900"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-x-4">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-medium">Order: {order._id.slice(-7)}</h3>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                Listing(s) in Order: {order.listings.length}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                            ${order.totalAmount}
                        </span>
                        <button 
                            onClick={openModal} 
                            className="text-sm hover:underline text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-600"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen &&  (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md">
                        <OrderModal 
                            combinedOrder={order} 
                            onClose={closeModal} 
                        />
                    </div>
                </div>
            )}
        </>
    );
}