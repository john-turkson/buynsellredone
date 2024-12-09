import axios from "axios";
import mongoose from "mongoose";
import User from "@/models/User.mjs";
import Listing from "@/models/Listing.mjs";
import Order from "@/models/Order.mjs";
import { NextResponse } from "next/server";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing User ID" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectToDB();

    // Step 1: Delete the User
    const userToBeDeleted = await User.findByIdAndDelete(id);
    if (!userToBeDeleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Step 2: Delete all user Listings if any exist
    const userListings = await Listing.find({ user: id });
    if (userListings.length > 0) {
      await Listing.deleteMany({ user: id });
    }

    // Step 3: Delete all user Orders if any exist
    const userOrders = await Order.find({ buyer: id });
    if (userOrders.length > 0) {
      await Order.deleteMany({ buyer: id });
    }

    return NextResponse.json(
      {
        message:
          "User and all associated Listings and Orders deleted successfully",
        data: {
          userDeleted: userToBeDeleted._id,
          listingsDeleted: userListings.length,
          ordersDeleted: userOrders.length,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
