'use client'

import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import SideCartMenu from "./SideCartMenu";


export default function SideCart() {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    // Disable scrolling when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = ""; // Cleanup
        };
    }, [isCartOpen]);

    return (
        <div>
            {/* Cart Button */}
            <button
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isCartOpen}
                aria-controls="hs-offcanvas-right"
                onClick={toggleCart}
                className="flex items-center justify-center p-2 rounded"
            >
                <HiOutlineShoppingBag
                    className="w-6 h-6 text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200"
                />
            </button>

            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={toggleCart}
                    aria-hidden="true"
                />
            )}

            {/* Side Cart Menu */}
            <SideCartMenu isOpen={isCartOpen} onClose={toggleCart} />
        </div>
    );
}
