import mongoose from "mongoose";
import User from "../../models/User";
import jwt from "jsonwebtoken"; // Assuming you're using JWT for token decoding
import cookie from "cookie";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function handler(event) {
  // Ensure method is POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Retrieve the refresh token from the cookies (since it's HTTP-only, it's not accessible via JavaScript)
    const { email, phone, username, profilePicture } = JSON.parse(event.body);
    const cookies = cookie.parse(event.headers.cookie || "");
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Authentication token missing" }),
      };
    }

    // Decode the token to retrieve user info (e.g., userId)
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET); // Assuming the JWT secret is the same for both access and refresh tokens
    } catch (error) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid or expired token" }),
      };
    }

    // Check if decoded userId exists
    if (!decoded.userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid token payload" }),
      };
    }

     // Connect to MongoDB
     await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });

    const updatedUser = await User.findByIdAndUpdate(decoded.userId, { email, phone, username, profilePicture }, { new: true });

    if (!updatedUser) {
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
      body: JSON.stringify(updatedUser),
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
