import mongoose from "mongoose";
import Listing from "@/models/Listing.mjs";
import { NextResponse } from "next/server";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

export async function DELETE(req) {
  try {
    // Initiate MongoDB Connection
    await connectToDB();

    // Parse the request to get the listing ID
    const { searchParams } = new URL(req.url);
    const listingId = searchParams.get("id");

    if (!listingId) {
      return NextResponse.json(
        { message: "Listing ID is required" },
        { status: 400 }
      );
    }

    // Find and delete the listing
    const deletedListing = await Listing.findByIdAndDelete(listingId);

    if (!deletedListing) {
      return NextResponse.json(
        { message: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
