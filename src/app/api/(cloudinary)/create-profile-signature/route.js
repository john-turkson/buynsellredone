import crypto from "crypto";
import sha1 from "crypto-js/sha1";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const folderDirec = searchParams.get("folder");

  // Preset values
  const publicId = "profilePicture"; // Replace with the desired public ID
  const eager = "c_crop,w_400,h_400,g_auto"; // Preset eager transformation
  const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp
  const folder = folderDirec; // Replace with the desired folder name

  // Replace with your actual API secret
  const apiSecret = process.env.CLOUDINARY_API_SECRET; // Your Cloudinary API secret

  // Create the parameters to include in the signature
  const parameters = {
    eager,
    public_id: publicId,
    timestamp,
    folder,
  };

  // Sort parameters alphabetically and construct the string-to-sign
  const sortedString = Object.keys(parameters)
    .sort()
    .map((key) => `${key}=${parameters[key]}`)
    .join("&");

  // Append the API secret to the string
  const stringToSign = `${sortedString}${apiSecret}`;
  console.log(stringToSign);

  // Generate the SHA-1 signature using crypto-js
  const signature = sha1(stringToSign).toString();

  // Return the signature along with the other parameters in the response
  return new Response(
    JSON.stringify({
      signature,
      public_id: publicId,
      eager,
      timestamp,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
