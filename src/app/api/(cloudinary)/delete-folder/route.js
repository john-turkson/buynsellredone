import axios from "axios";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    // Parse the request body
    const { searchParams } = new URL(req.url);
    const folderDirec = searchParams.get("folder");

    // Detailed credentials validation
    const missingCredentials = [];

    if (!process.env.CLOUDINARY_BASE_URL) {
      missingCredentials.push('CLOUDINARY_BASE_URL');
    }
    if (!process.env.CLOUDINARY_API_KEY) {
      missingCredentials.push('CLOUDINARY_API_KEY');
    }
    if (!process.env.CLOUDINARY_API_SECRET) {
      missingCredentials.push('CLOUDINARY_API_SECRET');
    }

    // Check if any credentials are missing
    if (missingCredentials.length > 0) {
      return NextResponse.json(
        { 
          error: "Missing Cloudinary credentials",
          missingCredentials: missingCredentials
        },
        { status: 500 }
      );
    }

    // Validate folderId
    if (!folderDirec) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    // Create Basic Authentication credentials
    const credentials = Buffer.from(
      `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`
    ).toString('base64');

    // Construct Cloudinary DELETE URL
    const cloudinaryDeleteUrl = `${process.env.CLOUDINARY_BASE_URL}/folders/${folderDirec}`;

    // Configure axios request with Basic Authentication
    const response = await axios.delete(cloudinaryDeleteUrl, {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    // Log successful deletion (remove in production)
    console.log("Cloudinary DELETE response: ", response.data);

    return NextResponse.json(
      {
        message: `Folder ${folderDirec} deleted successfully`,
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    // Detailed error handling
    console.error("Error deleting Cloudinary folder: ", error);

    // Handle Cloudinary API specific errors
    if (error.response) {
      return NextResponse.json(
        {
          error: "Cloudinary API deletion error",
          status: error.response.status,
          details: error.response.data
        },
        { status: error.response.status || 500 }
      );
    }

    // Generic error handling
    return NextResponse.json(
      {
        error: "Failed to delete folder",
        details: error.message,
      },
      { status: 500 }
    );
  }
}