import mongoose from "mongoose";
import Order from "@/models/Order.mjs";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		// Parse the query string
		const { buyer, listings, paymentMethod, shippingAddress } = await req.json();

		// Ensure all required fields are present
		if (!buyer || !listings || !paymentMethod || !shippingAddress) {
			return NextResponse.json({ message: "All fields are required" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
		}

		// TODO: totalAmount, orderDate, status to be made serverside

		// Initiate MongoDB Connection
		if (!mongoose.connection.readyState) {
			await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
		}

		// check if user exists
		const existingUser = await User.findById(buyer).exec();
		if (!existingUser) {
			return NextResponse.json({ message: "Buyer cannot be found!" }, { status: 400, headers: { "Access-Control-Allow-Origin": "*" } });
		}

		// Create the new order in the database
		const newOrder = new Order({
			buyer,
			listings,
			totalAmount,
			orderDate,
			status,
			paymentMethod,
			shippingAddress,
		});

		await newOrder.save(); // Save the listing in MongoDB

		// Construct response
		const response = {
			message: "Order made successfully",
			order: newOrder, // Return the newly created order
		};

		return NextResponse.json(response, { status: 200, headers: { "Access-Control-Allow-Origin": "*" } });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Error creating order!" }, { status: 500 });
	}
}
