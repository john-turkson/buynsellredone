'use client'

import { IoClose } from "react-icons/io5";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import SideCartItem from "./SideCartItem";

export default function SideCartMenu({ isOpen, onClose }) {
    const { cart, removeFromCart, getTotalPrice } = useCart();
    const totalPrice = getTotalPrice();
    const router = useRouter();

    // Function to handle navigation and close the menu
    const handleNavigation = (path) => {
        onClose(); // Close the side cart menu
        router.push(path); // Navigate to the specified path
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-96 bg-white dark:bg-neutral-800 shadow-lg z-50 transform transition-transform duration-300 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
            id="hs-offcanvas-right"
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
        >
            {/* Container for the entire cart */}
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-neutral-300 dark:border-neutral-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Cart
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close cart"
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <IoClose className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {cart.length > 0 ? (
                        cart.map((item, index) => (
                            <SideCartItem item={item} key={index} remove={removeFromCart} />
                        ))
                    ) : (
                        <p className="text-center text-neutral-500">No Items in cart.</p>
                    )}
                </div>

                {/* Footer */}
                <footer className="p-4 border-t border-neutral-300 dark:border-neutral-700">
                    <div className="flex flex-col justify-between gap-y-2 m-2">
                        <div className="flex items-center justify-between">
                            <h1 className="text-lg font-semibold">Subtotal</h1>
                            <p className="text-base font-medium">${totalPrice}</p>
                        </div>
                        <p className="text-neutral-500 dark:text-neutral-500">
                            Shipping, taxes, and discounts are calculated at checkout.
                        </p>
                        <div className="flex gap-x-4">
                            <button
                                onClick={() => handleNavigation("/cart")}
                                className="w-full mt-6 text-md text-gray-800 dark:text-neutral-300 py-3 border rounded-lg border-gray-200 font-semibold hover:bg-gray-200 dark:hover:text-gray-500"
                            >
                                View Cart ({cart.length})
                            </button>
                            <button
                                onClick={() => handleNavigation("/checkout")}
                                className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold transition duration-200"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
