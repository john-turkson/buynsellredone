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
   

    // Initiate MongoDB Connection
    await connectToDB();


   // Fetch all listings for the given userId
    const listings = await Listing.find({});

    if (listings == null) {
        return NextResponse.json({ message: "No listings found" }, { status: 404 });
      }
      

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}