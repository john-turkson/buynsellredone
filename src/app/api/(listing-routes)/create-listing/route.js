// src/app/api/create-listing/route.js
import mongoose from "mongoose";
import Listing from "@/models/Listing.mjs";
import User from "@/models/User.mjs";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { name, price, description, location, images, userId } = await req.json();

    // Ensure all required fields are present
    if (!name || !price || !description || !images || !userId) {
      return NextResponse.json(
        { message: "All fields are required" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Initiate MongoDB Connection
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "Main",
      });
    }

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

    // Create the new listing in the database
    const newListing = new Listing({
      name,
      price,
      description,
      location,
      images,
      user: userId,
    });

    await newListing.save(); // Save the listing in MongoDB

    // Update the user's listings array
    existingUser.listings.push(newListing._id);
    await existingUser.save(); // Save the updated user document

    // Construct response
    const response = {
      message: "Listing uploaded successfully",
      listing: newListing, // Return the newly created listing
    };

    return NextResponse.json(
      response,
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Listing Creation Error!", error: error.message },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
