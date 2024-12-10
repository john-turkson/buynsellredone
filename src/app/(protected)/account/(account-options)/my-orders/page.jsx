import axios from "axios";
import { auth } from "@/auth";
import OrderCard from "./components/OrderCard";

// Axios instance with base URL
const axiosInstance = axios.create({
    baseURL: process.env.AUTH_URL,
});

async function fetchOrders(userID) {
    try {
        const response = await axiosInstance.get("/api/get-orders", {
            params: { userId: userID },
            headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" },
        });
        return response.data.orders || []; 
    } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 404) {
            return []; 
        }
        return null;
    }
}

async function fetchBatchListings(listingIds) {
    try {
        const response = await axiosInstance.post('/api/get-listing-batch', { listingIds }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.status === 200 && response.data?.listings) {
            console.log('Fetched listings:', response.data.listings);
            return response.data.listings;
        } else {
            console.error('Unexpected response:', response.data);
            throw new Error(response.data?.message || 'Failed to fetch listings');
        }
    } catch (error) {
        if (error.response) {
            console.error('Server error:', error.response.data.message || error.response.status);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Request error:', error.message);
        }
        throw error;
    }
}

export default async function MyOrders() {
	const session = await auth();
	const orders = await fetchOrders(session?.user.userId);
  
	// Collect all unique listing IDs from orders
	const allListings = Array.from(new Set(orders.flatMap((order) => order.listings)));
  
	let listingsData = [];
	try {
	  listingsData = await fetchBatchListings(allListings);
	} catch (error) {
	  console.error("Error fetching listings:", error);
	}
  
	// Map orders to include listings data
	const ordersWithListings = orders.map((order) => ({
	  ...order,
	  listings: order.listings.map((listingId) =>
		listingsData.find((listing) => listing._id === listingId)
	  ).filter(Boolean), // Remove any unmatched listings
	}));
  
	return (
	  <div>
		<div className="flex items-center justify-between mb-24">
		  <h1 className="text-xl font-medium">My Orders</h1>
		</div>
		<div className="bg-neutral-100 dark:bg-neutral-700 border rounded-lg p-4">
		  {ordersWithListings.length > 0 ? (
			ordersWithListings.map((order, index) => (
			  <OrderCard key={index} order={order} />
			))
		  ) : (
			<p>No orders available</p>
		  )}
		</div>
	  </div>
	);
  }
  