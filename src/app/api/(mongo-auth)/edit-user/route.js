// Nextjs edit-user.js

import mongoose from "mongoose";
import User from "@/models/User.mjs";
import { hashPassword } from "@/utils/password-hashing";
import { NextResponse } from "next/server";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

export async function POST(req) {
  try {
    // Parse the request body
    const { username, password, email, phone, profilePicture, userId } =
      await req.json();

    // Connect to the database
    await connectToDB();

    // Find the user    
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!" },
        { status: 400 }
      );
    }

    let passwordChanged = false;

    // Update user fields
    if (email) user.email = email;
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (password) {
      const hashedPassword = await hashPassword(password);
      if (user.password !== hashedPassword) {
        user.password = hashedPassword;
        passwordChanged = true;
      }
    }
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();

    return NextResponse.json(
      {
        message: "User Updated successfully",
        passwordChanged, // Return the passwordChanged boolean
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
