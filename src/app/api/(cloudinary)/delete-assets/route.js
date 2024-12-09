import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // Parse the form data from the request
    const formData = await req.formData();
    

    if (!formData) {
      return NextResponse.json(
        { error: "Prefix is required to delete resources." },
        { status: 400 }
      );
    }

    // Cloudinary API endpoints
    const cloudinaryAssetUrl = `${process.env.CLOUDINARY_BASE_URL}/resources/image/upload/`;

    // Retrieve and validate credentials from environment variables
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "Cloudinary API credentials are not configured." },
        { status: 500 }
      );
    }

    // Create Basic Authentication header
    const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
    const authHeader = { Authorization: `Basic ${credentials}` };

    // Delete assets
    const assetResponse = await axios.delete(cloudinaryAssetUrl, {
      data: formData, // Cloudinary expects formData for asset deletion
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
      },
    });

    // Check for successful asset deletion
    if (assetResponse.status !== 200) {
      return NextResponse.json(
        { error: "Failed to delete assets from Cloudinary." },
        { status: assetResponse.status }
      );
    }

    // Return success response
    return NextResponse.json(
      {
        message: "Files deleted successfully.",
        deletedAssets: assetResponse.data.deleted,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE operation:", error);

    // Return a detailed error message
    return NextResponse.json(
      {
        error: "An error occurred while processing the request.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
