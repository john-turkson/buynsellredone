import React from 'react'
import ProductCard from '../../shop-listings/components/ProductCard';
import { auth } from "@/auth";
import axios from 'axios';

// Axios instance with base URL
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

  async function getUser(userId) {
    try {
        const response = await axiosInstance.get('/api/get-user', {
            params: { userId },
        });
        // Assuming the response contains the user object with profilePicture and name
        const { profilePicture, username, _id } = response.data.user || {};
        return { profilePicture, username, id: _id };
    } catch (error) {
        if (error.response?.status === 404) {
            console.error('User not found (404).');
            return {}; // Return an empty object for a 404 status
        }
        console.error('Error fetching user:', error.message || error);
        return {};
    }
}

export default async function ProfilePage({ params }) {

    const session = await auth();
    const { id: userId } = await params; // Await params to avoid accessing undefined properties
    const listings = await getListings(userId);
    const user = await getUser(userId);

    if (!listings) {
        // Handle 404 if listing is not found
        return notFound();
    }

    return (
        <div className="max-w-[85rem] mx-auto px-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold mb-6 pt-6">{user.username}&apos;s  Catalogue</h1>
            </div>
            <div className="flex flex-wrap justify-between gap-4 pt-6 pb-12">
                {listings.length > 0 ? (
                    listings.map((product) => {                       

                        return (
                            <ProductCard
                                product={product}
                                key={product._id}
                                userDetails={user} 
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
