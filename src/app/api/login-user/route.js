// Nextjs login-user.js

import User from "../../../../models/User.mjs";
import { comparePasswords } from "@/utils/password-hashing";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Function to connect to the database
const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

// Handle the POST request
export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Initiate MongoDB connection
    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 400 }
      );
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Incorrect Password!" },
        { status: 400 }
      );
    }

    // User Object to be returned
    const userData = {
      userId: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      phoneNumber: user.phone,
    };

    // Return success response
    return NextResponse.json(
      {
        message: "Login successful",
        user: userData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
