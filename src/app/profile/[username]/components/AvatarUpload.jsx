// components/AvatarUpload.js
"use client";

import { useRef, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";

export default function AvatarUpload({ onAvatarChange }) {
  const [avatar, setAvatar] = useState(null);
  const fileInputRef = useRef(null);

  // Handle image upload (button click triggers the file input)
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input on button click
    }
  };

  // Handle file selection and pass the file object to parent
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatar(URL.createObjectURL(file)); // Set avatar preview
      if (onAvatarChange) {
        onAvatarChange(file); // Pass the file object to the parent component
      }
    } else {
      alert("Please upload an image file."); // Alert if the file is not an image
    }
  };

  // Handle removing the avatar (reset state)
  const handleRemoveAvatar = () => {
    setAvatar(null);
    if (onAvatarChange) {
      onAvatarChange(null); // Pass null back to parent component when avatar is removed
    }
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      {/* Avatar Circle with Dashed Border */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-dashed border-neutral-200 dark:border-neutral-400 flex items-center justify-center">
          {avatar ? (
            <>
              <img
                src={avatar}
                alt="Avatar Preview"
                className="object-cover w-full h-full"
              />
              {/* X Icon to remove the selected image */}
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full text-gray-500 hover:bg-gray-300"
              >
                <FaTimes className="text-lg" />
              </button>
            </>
          ) : (
            <FaImage className="text-gray-500 dark:text-gray-600 text-4xl" />
          )}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex gap-2">
        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUploadClick}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        >
          Upload Photo
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleRemoveAvatar}
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-red-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        >
          Delete Photo
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
