'use client'
import { useCart } from '@/context/CartContext';


export default function AddCart({ lisitng }) {

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(lisitng);
        alert(`${lisitng.name} has been added to your cart.`);
      };

    return (
        <>
            {/* Add to Cart */}
            <div className="mt-8">
                <button onClick={handleAddToCart} className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-sm transition duration-200">
                    Add to Cart
                </button>
            </div>
        </>
    )
}
