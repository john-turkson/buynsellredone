import mongoose, { Types } from "mongoose";
import Listing from "@/models/Listing.mjs";
import { NextResponse } from "next/server";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    try {
      await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
    } catch (err) {
      console.error("Database connection error:", err);
      throw new Error("Failed to connect to the database");
    }
  }
};

export async function POST(req) {
  try {
    // Parse the request body
    const { name, price, description, images, listingId } = await req.json();

    // Validate listingId
    if (!Types.ObjectId.isValid(listingId)) {
      return NextResponse.json(
        { message: "Invalid listing ID!" },
        { status: 400 }
      );
    }

    // Validate at least one field to update
    if (!name && !price && !description && !images) {
      return NextResponse.json(
        { message: "No fields provided to update!" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find the listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json(
        { message: "Listing does not exist!" },
        { status: 400 }
      );
    }

    // Update listing fields
    if (name) listing.name = name;
    if (price) listing.price = price;
    if (description) listing.description = description;
    if (images) listing.images = images;

    await listing.save();

    // Sanitize response data
    const updatedListing = listing.toObject();
    delete updatedListing.__v;

    return NextResponse.json(
      {
        message: "Listing Updated successfully",
        listing: updatedListing,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
