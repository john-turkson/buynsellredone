// netlify/functions/logout.js
export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Clear the refreshToken cookie by setting its max-age to 0
    const headers = {
      "Set-Cookie": "refreshToken=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None",
      "Access-Control-Allow-Origin": "*", // Allow cross-origin requests
      "Access-Control-Allow-Headers": "Content-Type", // Allow content type headers
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Logout successful, refreshToken cookie deleted." }),
    };
  } catch (error) {
    console.error("Error during logout:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
