// netlify/functions/login.js
import User from "../../models/User";
import { comparePasswords } from "@/utils/password-hashing";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // You should define a separate secret for refresh tokens

const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { email, password } = JSON.parse(event.body);

    // Initiate MongoDB Connection using mongoose
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

    // Create JWT token when user is authenticated
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Create a refresh token with a long expiration time (e.g., 30 days)
    const refreshToken = jwt.sign(
        { userId: user._id },
        JWT_REFRESH_SECRET,
        { expiresIn: "30d" } // 30 days expiry for refresh token
      );

    // Set the cookie with the JWT token in the response headers
    return {
      statusCode: 200,
      headers: {
        "Set-Cookie": `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=2592000`, // 30 days expiry for refresh token
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        message: "Login successful",
        accessToken: accessToken,
      }),
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
