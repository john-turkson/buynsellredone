// netlify/functions/login.js
import User from "../../models/User";
import { comparePasswords } from "@/utils/password-hashing";
import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

// Define the handler for the login function
export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Initiate MongoDB connection
    await connectToDB();

    const user = await User.findOne({ email });

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "User does not exist!" }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      };
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
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
      phoneNumber: user.phone
    }

    // Set the cookie with the JWT token in the response headers
    return {
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
  } catch (error) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
