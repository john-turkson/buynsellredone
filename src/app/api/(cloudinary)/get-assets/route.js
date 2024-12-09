import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folderDirec = searchParams.get("folder");

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");
  const authHeader = { Authorization: `Basic ${credentials}` };

  try {
    // Upload the image to Cloudinary
    const response = await axios.get(
      `${process.env.CLOUDINARY_BASE_URL}/resources/by_asset_folder`,
      {
        auth: {
          username: process.env.CLOUDINARY_API_KEY,
          password: process.env.CLOUDINARY_API_SECRET,
        },
        params: {
          asset_folder: folderDirec,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const publicIds = response.data.resources
      .filter((resource) => resource.public_id)
      .map((resource) => resource.public_id);

    return NextResponse.json({ message: "Success", public_ids: publicIds });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
