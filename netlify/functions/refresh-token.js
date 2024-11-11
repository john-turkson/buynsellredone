// netlify/functions/refresh-token.js
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  // Parse cookies from the request headers
  const cookies = cookie.parse(event.headers.cookie || "");
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "No refresh token provided" }),
    };
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

    // Create a new access token using the user's ID from the decoded refresh token
    const newAccessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Set the new access token to expire in 1 hour
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ accessToken: newAccessToken }),
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to refresh token" }),
    };
  }
}
