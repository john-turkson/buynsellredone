import crypto from "crypto";
import sha1 from "crypto-js/sha1";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const public_id = searchParams.get("public_id");

  // Preset values
  const publicId = public_id // Replace with the desired public ID
  const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp

  // Replace with your actual API secret
  const apiSecret = process.env.CLOUDINARY_API_SECRET; // Your Cloudinary API secret

  // Create the parameters to include in the signature
  const parameters = {
    public_id: publicId,
    timestamp,
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
      timestamp,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
