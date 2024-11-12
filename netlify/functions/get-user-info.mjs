import mongoose from "mongoose";
import User from "../../models/User.mjs";
import jwt from "jsonwebtoken"; // Assuming you're using JWT for token decoding
import cookie from "cookie";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function handler(event) {
  // Ensure method is POST
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const path = event.path;
    const username = path.split("/").pop();

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });

    // Find the user by ID
    const foundUser = await User.findOne({username}).lean(); // `.lean()` for better performance when not modifying docs

    if (!foundUser) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found" }),
      };
    }

    // Return the user data
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ user: foundUser }),
    };
  } catch (error) {
    // General error handling
    console.error("Error in getUser function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error" }),
    };
  }
}
