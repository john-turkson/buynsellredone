// netlify/functions/login-user.mjs

import User from "../../models/User";
import { comparePasswords } from "@/utils/password-hashing";
import mongoose from "mongoose";

const connectToDB = async () => {
  console.log("Connecting to MongoDB...");
  if (mongoose.connection.readyState === 0) {
    console.log("No active connection, establishing new connection...");
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
    console.log("MongoDB connection established.");
  } else {
    console.log("Already connected to MongoDB.");
  }
};

// Define the handler for the login function
export const handler = async (event) => {
  console.log("Received event:", event);

  if (event.httpMethod !== "POST") {
    console.log("Invalid HTTP method:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);
    console.log("Parsed request body:", { email, password });

    // Initiate MongoDB connection
    await connectToDB();

    // Check if user exists
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      console.log("User does not exist.");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User does not exist!" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    }

    // Validate the password
    const isPasswordValid = await comparePasswords(password, user.password);
    console.log("Password valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Incorrect password.");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Incorrect Password!" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    }

    // User Object to be returned
    const userData = {
      userId: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      phoneNumber: user.phone,
    };

    console.log("Login successful, returning user data:", userData);

    // Return response with user data
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: "Login successful",
        user: userData,
      }),
    };
    console.log("Returning response:", response);
    return response;

  } catch (error) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
