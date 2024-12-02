import Link from "next/link";

export default function ListingCard({ name, price, thumbnail, listingId }) {
    return (
        <Link href={`/listing/${listingId}`}>
            <div className="border rounded-lg p-4 m-4 hover:border-purple-500 dark:hover:border-purple-400 hover:cursor-pointer 
                bg-white text-black dark:bg-neutral-900 dark:text-white border-gray-300 dark:border-neutral-900">
                <div className="flex items-center gap-x-4">
                    <img 
                        src={thumbnail} 
                        alt="Product Image" 
                        className="w-16 h-16 rounded-full border border-gray-200 dark:border-neutral-700" 
                    />
                    <div>
                        <h3 className="text-sm font-medium">{name}</h3>
                        <div className="flex items-center gap-x-2">
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Price: ${price}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
    

}
