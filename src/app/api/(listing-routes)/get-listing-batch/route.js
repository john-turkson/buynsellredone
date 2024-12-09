// Utility to handle database connection
import Listing from "@/models/Listing.mjs"; // Assuming a Mongoose model for the listing schema
import mongoose from "mongoose";

const connectToDB = async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
    }
  };


export async function POST(req) {

    connectToDB();

  try {
    const body = await req.json(); // Parse request body
    const { listingIds } = body;

    // Validate input
    if (!Array.isArray(listingIds) || listingIds.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid input. listingIds must be a non-empty array." }),
        { status: 400 }
      );
    }

    // Query database for all the listings
    const validListingIds = listingIds.filter(id => id);
    const listings = await Listing.find({ _id: { $in: validListingIds } });

    return new Response(
      JSON.stringify({ listings }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching listings batch:", error);

    return new Response(
      JSON.stringify({ message: "Failed to fetch listings", error }),
      { status: 500 }
    );
  }
}
