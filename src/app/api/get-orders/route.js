import mongoose from "mongoose";
import Order from "@/models/Order.mjs";

const connectToDB = async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
	}
};

export async function GET(req) {
	return req;
}
