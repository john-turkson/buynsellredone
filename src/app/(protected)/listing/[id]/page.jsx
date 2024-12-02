import { notFound } from 'next/navigation';
import axios from 'axios';
import AddCart from './components/AddCart';
import FeaturedImageGallery from './components/FeaturedImageGallery';
import { auth } from '@/auth';

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

    const session = await auth();
    const { id: listingId } = await params; // Await params to avoid accessing undefined properties
    const listing = await getListing(listingId);

    if (!listing) {
        // Handle 404 if listing is not found
        return notFound();
    }

    const isOwner = listing.user === session?.user?.userId

    return (
        <div className="max-w-[85rem] mx-auto px-4">
            <div className='flex min-h-screen gap-x-8'>
                <div className="w-3/4 py-4 px-2 mx-2 mt-4">
                    {/* Listing Details */}
                    <FeaturedImageGallery images={listing.images}/>
                </div>
                <div className='w-1/4 py-4 px-2 mx-2 mt-4'>
                    <h1 className='text-2xl font-bold mb-4'>{listing.name}</h1>
                    <span className="text-xl font-bold dark:text-neutral-400">${listing.price}</span>
                    <p className="text-gray-800 dark:text-gray-300 mt-6">{listing.description}</p>
                    {!isOwner ? (<AddCart lisitng={listing} />) : (<button className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-sm transition duration-200 >Edit Button</button>)">Edit Button</button>)}
                </div>
            </div>
        </div>
    );
}
