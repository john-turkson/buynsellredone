export default function ListingItem ({ listing, addToCart }) {
    const handleAddToCart = () => {
        console.log('Adding to cart:', listing);
        addToCart(listing);
        alert(`${listing.name} has been added to the cart!`);
    };

    return (
        <div className="border p-4 rounded">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p>{listing.description}</p>
            <p className="text-lg">${listing.price}</p>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded" 
                onClick={handleAddToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}
