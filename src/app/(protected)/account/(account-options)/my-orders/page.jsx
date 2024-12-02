import Image from "next/image";
import axios from "axios";
import { auth } from "@/auth";

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
		return null; // Return null on failure
	}
}
async function getListings(listingIDs) {
	let listings = [];
	try {
		for (let i = 0; i < listingIDs.length; i++) {
			const response = await axiosInstance.get("/api/get-listing", {
				params: { listingId: listingIDs[i] },
				headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" },
			});
			listings.push(response.data.listing);
		}
	} catch (error) {
		console.error("Error fetching order Listings:", error);
		return null; // Return null on failure
	}
	return listings; // Return the listings
}

export default async function MyOrders() {
	const session = await auth();
	const orders = await fetchOrders(session?.user.userId);
	const listings = await getListings(orders[0].listings);
	console.log(listings[0].images[0]);

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="flex flex-col items-center space-y-4 border-2 p-2">
					<div className="text-left">{orders[0].orderDate.substr(0, 10)}</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
						<Image src={listings[0].images[0]} alt="Image" width={200} height={200} className="row-span-2" />
						<div className="font-bold">{listings[0].name}</div>
						<div>${listings[0].price}</div>
					</div>
					<div className="font-bold text-left">Total: ${orders[0].totalAmount}</div>
					<div className="text-left">Status: {orders[0].status}</div>
				</div>
			</div>
		</div>
	);
}
