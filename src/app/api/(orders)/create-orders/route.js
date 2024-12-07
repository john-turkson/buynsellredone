import Order from "@/models/Order.mjs";
import User from "@/models/User.mjs";
import Listing from "@/models/Listing.mjs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const connectToDB = async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
	}
};

export async function POST(req) {
	try {
		const body = await req.json();
		console.log("Received order data:", body);
		const { buyer, listings, totalAmount, paymentMethod, shippingAddress } = body;

		if (!buyer || !listings || !totalAmount || !paymentMethod || !shippingAddress) {
			return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
		}

		if (!mongoose.Types.ObjectId.isValid(buyer)) {
			return NextResponse.json({ message: "Invalid buyer ID" }, { status: 400 });
		}

		await connectToDB();

		const user = await User.findById(buyer);
		if (!user) {
			return NextResponse.json({ message: "Buyer does not exist!" }, { status: 400 });
		}

		const objectIdListings = listings.map((listing) => new mongoose.mongo.ObjectId(listing));

		const listingsData = await Listing.find({
			_id: { $in: objectIdListings },
		});

		if (listingsData.length !== listings.length) {
			return NextResponse.json({ message: "Some listings do not exist!" }, { status: 400 });
		}

		const newOrder = new Order({
			buyer: new mongoose.mongo.ObjectId(buyer),
			listings: objectIdListings,
			totalAmount,
			paymentMethod,
			shippingAddress,
			orderDate: Date.now(),
		});

		await newOrder.save();
		console.log("Order saved:", newOrder);

		return NextResponse.json(
			{
				message: "Order created successfully",
				order: newOrder,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Order creation error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
