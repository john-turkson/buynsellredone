import mongoose from "mongoose";
import User from "@/models/User.mjs";

// Connect to the database
const connectToDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "Main" });
  }
};

// Handle the PATCH request
export async function POST(req) {
  try {
    // Parse the request body and query parameters
    const { newUserId, profilePicture } = await req.json();

    // Validate the data
    if (!newUserId || !profilePicture) {
      return new Response(
        JSON.stringify({ message: "UserId and Profile Picture are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectToDB();

    // Find the user and update the profile picture
    const updatedUser = await User.findByIdAndUpdate(
        newUserId,
      { profilePicture },
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Profile picture updated successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error updating profile picture:", error);
    return new Response(
      JSON.stringify({
        message: "Server error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
