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
    // Parse the query string to get the listingId
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("listingId");

    // Validate userId
    if (!listingId) {
      return NextResponse.json(
        { message: "A Listing ID is required" },
        { status: 400 }
      );
    }

    // Initiate MongoDB Connection
    await connectToDB();


   // Fetch all listings for the given userId
    const listing = await Listing.findById(listingId);

    if (listing == null) {
        return NextResponse.json({ message: "No listings found" }, { status: 404 });
      }
      

    return NextResponse.json({ listing }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}