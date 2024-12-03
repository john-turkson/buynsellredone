// Nextjs register-user.js

import mongoose from "mongoose";
import User from "@/models/User.mjs";
import { hashPassword } from "@/utils/password-hashing";

const DEFAULT_PROFILE_PICTURE =
  "https://res.cloudinary.com/ddznwdhef/image/upload/t_ProfilePicture/v1731692514/default_profile_cu3qbl.jpg";

// Connect to the database
const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

// Handle the POST request
export async function POST(req) {
  try {
    // Parse the request body
    const { username, password, email, phone, profilePicture } = await req.json();

    // Validate the data
    if (!username || !password || !email || !phone) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectToDB();

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      phone,
      profilePicture: profilePicture && profilePicture !== "" 
        ? profilePicture 
        : DEFAULT_PROFILE_PICTURE,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully", newUserId: newUser._id}),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
