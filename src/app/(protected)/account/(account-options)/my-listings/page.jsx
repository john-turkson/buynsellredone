import AddListing from './components/AddListing'
import ListingCard from './components/ListingCard'
import axios from 'axios'
import { auth } from "@/auth";

const axiosInstance = axios.create({
  baseURL: process.env.AUTH_URL, // Set the base URL
});

async function getListings(userId) {
  try {
    const response = await axiosInstance.get('/api/get-user-listings', {
      params: { userId },
    });
    // Assuming the response contains the listings in a `listings` field
    return response.data.listings || []; // Ensure that listings is always an array
  } catch (error) {
    if (error.response) {
      // Check if the error status is 404
      if (error.response.status === 404) {
        // console.error('Listings not found (404).');
        return []; // Return an empty array for a 404 status
      }
    }
    // Log any other errors and return an empty array
    console.error('Error fetching listings:', error.message || error);
    return [];
  }
}


export default async function MyListings() {

  const session = await auth();

  const listingData = await getListings(session.user.userId);
  // console.log('Listing data:', listingData);  // Log entire data to check structure

  return (
    <div>
      <div className='flex items-center justify-between mb-24'>
        <h1 className='text-xl font-medium'>My Listings</h1>
        <AddListing />
      </div>

      <div className='bg-neutral-100 dark:bg-neutral-700 border rounded-lg p-4'>
        {listingData.length > 0 ? (
          listingData.map((listing) => {
            return (
              <ListingCard
                key={listing._id} // It's a good practice to use unique IDs for keys
                name={listing.name}
                price={listing.price}
                description={listing.description}
                thumbnail={listing.images[0]} // Assuming you want to show the first image
                listingId={listing._id}
              />
            );
          })
        ) : (
          <p>No listings available</p>
        )}
        
      </div>
    </div>
  );
}
