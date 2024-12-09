import axios from "axios";
import { auth } from "@/auth";
import OrderCard from "./components/OrderCard";

// Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: process.env.AUTH_URL, // Ensure this is correctly defined in your `.env.local`
});

async function fetchOrders(userID) {
	try {
		const response = await axiosInstance.get("/api/get-orders", {
			params: { userId: userID },
			headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" },
		});
		return response.data.orders || {}; // Return the orders
	} catch (error) {
		console.error("Error fetching orders:", error);
		if (error.response.status === 404) {
			// no orders
			return []; // Return an empty array for a 404 status
		}
		return null; // Return null on failure
	}
}

async function getListing(listingId) {
	try {
		const response = await axiosInstance.get('/api/get-listing', {
			params: { listingId: listingId },
		});
		return response.data.listing || {}; // Return the listing data or an empty object
	} catch (error) {
		console.error("Error fetching listing:", error);
		if (error.response && error.response.status === 404) {
			// No listing found
			return {}; // Return an empty object for a 404 status
		}
		return null; // Return null on other failures
	}
}



export default async function MyOrders() {
	const session = await auth();
	const orders = await fetchOrders(session?.user.userId);

	return (
		<div>
			<div className='flex items-center justify-between mb-24'>
				<h1 className='text-xl font-medium'>My Orders</h1>
			</div>
			<div className='bg-neutral-100 dark:bg-neutral-700 border rounded-lg p-4'>
				{orders.length > 0 ? (
					orders.map((order, index) => {
						return (
							<OrderCard
							key={index}
								order={{
									price: order.totalAmount,
									listingAmount: order.listings.length,
									orderId: order._id,
									shippingAddress: order.shippingAddress,
									orderDate: order.orderDate,
									paymentMethod: order.paymentMethod,
									orderListings: order.listings,
								}}
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
