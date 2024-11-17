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
    const response = await axios.post("/api/login-user", credentials);
    
    // Check if the response has a user
    if (response.data && response.data.user) {
      return response.data.user;
    } else {
      throw new Error("No user data received. Please try again.");
    }
  } catch (error) {
    // Log specific details for debugging but avoid exposing sensitive data
    console.error("Error in loginUser:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Customize error messages based on the error type
    if (error.response) {
      // Server responded with a status other than 2xx
      const status = error.response.status;
      if (status === 401) {
        throw new Error("Invalid credentials. Please check your email and password.");
      } else if (status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(`Login failed with status code ${status}.`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error("Network error. Please check your connection and try again.");
    } else {
      // Other unexpected errors
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

