"use client";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";

// Axios instance with base URL
const axiosInstance = axios.create({
	baseURL: process.env.AUTH_URL, // Ensure this is correctly defined in your `.env.local`
});

async function fetchOrders(userID) {
	try {
		const response = await axios.get("/api/get-orders", {
			params: { userId: userID },
		});
		console.log("Response Data: " + response.data);
		return response.data.orders || {}; // Return the orders
	} catch (error) {
		console.error("Error fetching orders:", error);
		return null; // Return null on failure
	}
}

export default function MyOrders() {
	const { data: session } = useSession();
	console.log(session?.user.userId);
	const orders = fetchOrders(session?.user.userId);
	console.log("Orders: " + orders);

	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="flex flex-col items-center space-y-4 border-2 p-2">
					<div className="text-left">Order Date</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
						<Image src="https://http.cat/522.jpg" alt="Image" width={200} height={200} className="row-span-2" />
						<div className="font-bold">Title</div>
						<div>$Price</div>
					</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
						<Image src="https://http.cat/522.jpg" alt="Image" width={200} height={200} className="row-span-2" />
						<div className="font-bold">Title</div>
						<div>$Price</div>
					</div>
					<div className="font-bold text-left">Order Amount</div>
					<div className="text-left">Status</div>
				</div>
			</div>
		</div>
	);
}
