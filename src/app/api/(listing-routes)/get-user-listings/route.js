import mongoose from "mongoose";
import Listing from "@/models/Listing.mjs";
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

    // Validate userId
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Initiate MongoDB Connection
    await connectToDB();


   // Fetch all listings for the given userId
    const listings = await Listing.find({ user: userId });

    if (listings.length === 0) {
        return NextResponse.json({ message: "No listings found" }, { status: 404 });
      }
      

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}