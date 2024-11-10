import bcrypt from "bcryptjs";
import { config } from 'dotenv';

config(); 


export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePasswords(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
}

export async function uploadImage(file, username) {
  const imageFormData = new FormData();
  imageFormData.append("file", file);
  imageFormData.append(
    "upload_preset",
    process.env.CLOUDINARY_UPLOAD_PRESET
  ); // replace with your Cloudinary unsigned preset
  imageFormData.append("folder", `Users/${username}/Images`); // replace with the desired Cloudinary directory
  imageFormData.append("public_id", `profilePicture`); // use custom name or default to image name

  // Upload the image to Cloudinary and get the secure URL
  try {
    const response = await fetch(process.env.CLOUDINARY_URL_ENDPOINT, {
      method: "POST",
      body: imageFormData,
    });
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}

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
