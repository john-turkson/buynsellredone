import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.AUTH_URL, // Set the base URL
});

//** Cloudinary Functions */

export const uploadProfilePictureToCloudinary = async (image, userId) => {
  const imageFormData = new FormData();

  // Generate a unique ID for the image
  const fileUploadInfo = await axiosInstance.get(
    "/api/create-profile-signature",
    {
      params: { folder: `Users/${userId}` },
    }
  );

  console.log(fileUploadInfo.data);

  // Append the necessary data for Cloudinary upload
  imageFormData.append("file", image);
  imageFormData.append("public_id", fileUploadInfo.data.public_id);
  imageFormData.append("signature", fileUploadInfo.data.signature);
  imageFormData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  imageFormData.append("timestamp", fileUploadInfo.data.timestamp);
  imageFormData.append("eager", fileUploadInfo.data.eager);
  imageFormData.append("folder", `Users/${userId}`);

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

export async function deleteImageFromCloudinary(publicId) {
  const imageFormData = new FormData();

  const fileUploadInfo = await axiosInstance.get(
    "/api/create-delete-signature",
    {
      params: { public_id: `${publicId}` },
    }
  );

  console.log(fileUploadInfo.data);

  // Append the necessary data for Cloudinary upload
  imageFormData.append("public_id", fileUploadInfo.data.public_id);
  imageFormData.append("signature", fileUploadInfo.data.signature);
  imageFormData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  imageFormData.append("timestamp", fileUploadInfo.data.timestamp);

  try {
    // Upload the image to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/ddznwdhef/image/destroy`,
      {
        method: "POST",
        body: imageFormData,
      }
    );

    const data = await response.json();
    console.log(data);

    // Return the secure URL of the uploaded image
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
}

export async function deleteAllImages(folder) {
  const imagePublic_ids = await axios.get(`/api/get-assets`, {
    params: { folder: folder },
  });

  let listingResources = imagePublic_ids.data.public_ids.filter(
    (id) => !id.includes("profilePicture")
  );

  if (listingResources.length == 0) {
    console.log('No Listing Resources. Deleting the profile picture');
    listingResources = imagePublic_ids.data.public_ids
  }

  console.log(listingResources);

  const listingsToDelete = new FormData();

  listingResources.forEach((listing) => {
    listingsToDelete.append("public_ids[]", listing);
  });

  const deleteResponse = await axios.delete("/api/delete-assets", {
    data: listingsToDelete,
  });

  return deleteResponse;
}

export async function deleteUserFolder(folder) {
  const response = await axiosInstance.delete(`/api/delete-folder`, {
    params: { folder: folder }
  });

  return response.data;
}

/* String & Array Helper Functions */

export function extractListingPath(url) {
  const regex = /Users\/[^\/]+\/[^\/]+(?=\.jpg)/;
  const match = url.match(regex);
  return match ? match[0] : null;
}

export function isValidUrl(string) {
  try {
    new URL(string); // Try parsing the string as a valid URL
    return true;
  } catch (_) {
    return false;
  }
}

export function checkArrayType(arr) {
  if (!Array.isArray(arr)) {
    return "Not an array";
  }

  if (arr.length === 0) {
    return "Empty array";
  }

  const isArrayOfStrings = arr.every((item) => typeof item === "string");
  const isArrayOfObjects = arr.every(
    (item) => typeof item === "object" && item !== null
  );

  if (isArrayOfStrings) return "Array of strings";
  if (isArrayOfObjects) return "Array of objects";

  return "Mixed array or invalid elements";
}

/** Auth Functions */

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
        throw new Error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (status === 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error(`Login failed with status code ${status}.`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(
        "Network error. Please check your connection and try again."
      );
    } else {
      // Other unexpected errors
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
}

/** Stripe Functions */
export async function getPaymentMethod(intent) {
  try {
    const response = await axiosInstance.get("/api/get-payment-method", {
      params: { paymentIntent: intent },
    });
    return response.data.method;
  } catch (error) {
    console.error('An error occurred getting payment method: ', error.message)
  }
}
