import mongoose from "mongoose";
import Order from "@/models/Order.mjs";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		// Parse the query string to get the userId
		// const { name, price, description, location, images, userId } = await req.json();

		// Initiate MongoDB Connection
		if (!mongoose.connection.readyState) {
			await mongoose.connect(process.env.MONGODB_URI, {
				dbName: "Main",
			});
		}

		// check if user exists
		const existingUser = await User.findById(userId).exec();
		if (!existingUser) {
			return NextResponse.json(
				{ message: "User cannot be found!" },
				{
					status: 400,
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
		}

		return NextResponse.json(response, {
			status: 200,
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
