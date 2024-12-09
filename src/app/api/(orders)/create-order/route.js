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

const validateRequestBody = (body) => {
  const requiredFields = ["buyer", "listings", "totalAmount", "paymentMethod", "shippingAddress"];
  const missingFields = requiredFields.filter(field => !body[field]);

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(", ")}`;
  }

  if (!mongoose.Types.ObjectId.isValid(body.buyer)) {
    return "Invalid buyer ID";
  }

  return null;
};

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Received order data:', body);

    // Validate request body
    const validationError = validateRequestBody(body);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const { buyer, listings, totalAmount, paymentMethod, shippingAddress } = body;

    await connectToDB();

    // Validate buyer existence
    const user = await User.findById(buyer);
    if (!user) {
      return NextResponse.json({ message: "Buyer does not exist!" }, { status: 400 });
    }

    // Validate listings
    console.log(listings);


    // Create and save the new order
    const newOrder = await Order.create({
      buyer: buyer,
      listings: listings,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    console.log('Order saved:', newOrder);

    return NextResponse.json({
      message: "Order created successfully",
      order: newOrder,
    }, { status: 201 });

  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({
      message: "Internal server error",
      error: error.message,
    }, { status: 500 });
  }
}
