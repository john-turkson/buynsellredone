import mongoose from "mongoose";
import Order from "@/models/Order.mjs";
import { NextResponse } from "next/server";

const connectToDB = async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
	}
};

export async function GET(req) {
	try {
		// Parse the query string to get the userId
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get("userId");
		console.log(userId);

		// Validate userId
		if (!userId) {
			return NextResponse.json({ message: "A User ID is required, or you have not logged in" }, { status: 400 });
		}

		// Initiate MongoDB Connection
		await connectToDB();

		const orders = await Order.find({ buyer: userId });
		console.log(orders);

		if (orders == null) {
			return NextResponse.json({ message: "No orders found" }, { status: 404 });
		}

		return NextResponse.json({ orders }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
