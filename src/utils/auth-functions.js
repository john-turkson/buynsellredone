import axios from "axios";

export const uploadProfilePictureToCloudinary = async (image, username) => {
  const imageFormData = new FormData();

  // Append the necessary data for Cloudinary upload
  imageFormData.append("file", image);
  imageFormData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  );
  imageFormData.append("folder", `Users/${username}/Images`);
  imageFormData.append("public_id", `profilePicture`);

  try {
    // Upload the image to Cloudinary
    const response = await fetch(
      process.env.NEXT_PUBLIC_CLOUDINARY_URL_ENDPOINT,
      {
        method: "POST",
        body: imageFormData,
      }
    );

    const data = await response.json();

    // Return the secure URL of the uploaded image
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};

export async function uploadImages(files, username) {
  // Convert FileList to Array
  const fileArray = Array.isArray(files) ? files : Array.from(files);

  // Upload images to Cloudinary and get secure URLs
  const uploadPromises = fileArray.map((image) => {
    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    ); // replace with your Cloudinary unsigned preset
    imageFormData.append("folder", `Users/${username}/Images`); // replace with the desired Cloudinary directory
    imageFormData.append("public_id", `listing_${image.name}`); // use custom name or default to image name

    // Upload the image to Cloudinary and get the secure URL
    return fetch(import.meta.env.VITE_CLOUDINARY_URL_ENDPOINT, {
      method: "POST",
      body: imageFormData,
    })
      .then((response) => response.json())
      .then((data) => data.secure_url) // secure URL of the uploaded image
      .catch((error) => {
        console.error("Upload failed:", error);
        return null;
      });
  });
}

export async function loginUser(credentials) {
  try {
    const response = await axios.post("http://localhost:8888/netlify-api/login-user", credentials);
    return response.data.user;
  } catch (error) {
    console.error("Error in loginUser:", error);
    throw error; // Re-throw the original error to preserve details
  }
}
