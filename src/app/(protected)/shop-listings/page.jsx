import React from 'react';
import axios from 'axios';
import ProductsList from './components/ProductsList';
import { auth } from '@/auth';

const axiosInstance = axios.create({
    baseURL: process.env.AUTH_URL, // Set the base URL
});

async function getAllListings() {
    try {
        const response = await axiosInstance.get('/api/get-all-listings');
        // Assuming the response contains the listings in a `listings` field
        return response.data.listings || []; // Ensure that listings is always an array
    } catch (error) {
        if (error.response?.status === 404) {
            return []; // Return an empty array for a 404 status
        }
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

async function getAllUserDetails(userIds) {
    try {
        // Perform getUser for each userId and wait for all results
        const userPromises = userIds.map((userId) => getUser(userId));
        const users = await Promise.all(userPromises); // Wait for all user data to be fetched

        return users;
    } catch (error) {
        console.error('Error fetching user details:', error.message || error);
        return [];
    }
}

export default async function ShopListings() {
    const session = await auth();
    const listings = await getAllListings(); // Fetch listings from the API

    // Extract unique `user` values from listings
    const uniqueUsers = Array.from(
        new Set(listings.map((listing) => listing.user))
    );

    // console.log('Unique Users:', uniqueUsers); // Log the array of unique users

    // Fetch details for all unique users
    const users = await getAllUserDetails(uniqueUsers);
    // console.log(users);
    

    // Pass the listings and user data to the ProductsList component
    return (
        <>
            <ProductsList products={listings} userId={session?.user?.userId} usersMap={users} />
        </>
    );
}
