import Image from 'next/image';
import { notFound } from 'next/navigation';
import axios from 'axios';

// Axios instance with base URL
const axiosInstance = axios.create({
    baseURL: process.env.AUTH_URL, // Ensure this is correctly defined in your `.env.local`
});

// Fetch listing data based on the ID
async function getListing(listingId) {
    try {
        const response = await axiosInstance.get('/api/get-listing', {
            params: { listingId },
        });
        return response.data.listing || {}; // Return the listing object
    } catch (error) {
        console.error('Error fetching listing:', error);
        return null; // Return null on failure
    }
}

// Dynamic Page Component
export default async function ListingPage({ params }) {

    const { id: listingId } = await params; // Await params to avoid accessing undefined properties
    const listing = await getListing(listingId);

    if (!listing) {
        // Handle 404 if listing is not found
        return notFound();
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Section: Images */}
                <div className="col-span-1">
                    <div className="flex flex-col gap-4">
                        {listing.images?.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Listing Image ${index + 1}`}
                                width={200}
                                height={200}
                                className="rounded-lg border border-gray-700"
                            />
                        ))}
                    </div>
                </div>

                {/* Right Section: Details */}
                <div className="col-span-2">
                    <h1 className="text-3xl font-bold mb-4">{listing.name}</h1>
                    <p className="text-gray-400 mb-4">{listing.description}</p>
                    <span className="text-2xl font-semibold text-purple-500">${listing.price}</span>

                    {/* Add to Cart */}
                    <div className="mt-8">
                        <button className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
