'use client'
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function AddCart({ lisitng }) {

    const { addToast } = useToast();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(lisitng);
        addToast(`${lisitng.name} has been added to your cart.`, 'info');
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
