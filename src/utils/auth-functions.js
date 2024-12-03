import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.AUTH_URL, // Set the base URL
});


export const uploadProfilePictureToCloudinary = async (image, userId) => {
  const imageFormData = new FormData();

  // Generate a unique ID for the image
  const fileUploadInfo = await axiosInstance.get('/api/create-signature', {
    params: { folder: `Users/${userId}/Images` },
  });

  console.log(fileUploadInfo.data);

  // Append the necessary data for Cloudinary upload
  imageFormData.append("file", image);
  imageFormData.append("public_id", fileUploadInfo.data.public_id);
  imageFormData.append("signature", fileUploadInfo.data.signature);
  imageFormData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  imageFormData.append("timestamp", fileUploadInfo.data.timestamp);
  imageFormData.append("eager", fileUploadInfo.data.eager);
  imageFormData.append("folder", `Users/${userId}/Images`);

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
    return data.eager[0].secure_url;
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
    const response = await axiosInstance.post("/api/login-user", credentials);
    
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

