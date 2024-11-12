"use client";

import FormField from "@/components/application/FormField";
import AvatarUpload from "./AvatarUpload";
import ProfileField from "./ProfileField";
import { editProfileScehma } from "@/utils/yup-schemas";
import { useFormik } from "formik";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import axios from "axios";
import { useState } from "react";
import { uploadProfilePictureToCloudinary } from "@/utils/auth-functions";

export default function ProfileInfo() {
  const { user } = useAuthStore();
  const [avatar, setAvatar] = useState(user.profilePicture);

  // Function to update avatar state
  const handleAvatarChange = (newAvatar) => {
    formik.setFieldValue("profilePicture", newAvatar);
  };

  const onSubmit = async (values, actions) => {
    console.log("Form Submitted", values);
 
    const imageResponse = await uploadProfilePictureToCloudinary(values.profilePicture, values.username);
    console.log(imageResponse);

    const profileData = {
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phoneNumber,
      profilePicture: imageResponse, // Include the avatar in the data
    };

    // Send User Data to MongoDB
    try {
      const response = await axios.post(
        "/api/update-user-info",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        setAlertVisible(true);
        actions.resetForm();
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: "",
      confirmPassword: "",
      phoneNumber: user.phone,
      profilePicture: user.profilePicture, // Use the avatar as the initial value
    },
    validationSchema: editProfileScehma,
    onSubmit: onSubmit,
  });

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Left Column - Independent vertical size */}
        <div className="w-1/3 bg-gray-100 dark:bg-neutral-800 text-black dark:text-white m-8 p-8 rounded-lg self-start">
          <p>Left Column Content</p>
        </div>

        {/* Right Column - Takes the full height as per content */}
        <div className="w-2/3 bg-white dark:bg-neutral-800 text-black dark:text-white m-8 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-400 dark:text-gray-300 mb-4">
            Manage your name, password, and account settings.
          </p>

          <div className="flex flex-col">
            <div className="border-b-2 dark:border-neutral-700 my-8">
              <form onSubmit={formik.handleSubmit}>
                <ProfileField labelName="Personal Info">
                  <AvatarUpload onAvatarChange={handleAvatarChange} />

                  {/* <!-- Username Form Group --> */}
                  <div className="mb-4">
                    <FormField
                      label={"Username"}
                      name={"username"}
                      id={"username"}
                      type="text"
                      placeholder="Enter a Username"
                      touched={formik.touched.username || false} // fallback for untouched state
                      errors={formik.errors.username || ""}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      validationMessage={formik.errors.username}
                    />
                  </div>

                  {/* <!-- Email Form Group --> */}
                  <div className="mb-4">
                    <FormField
                      label={"Email"}
                      name={"email"}
                      id={"email"}
                      type="text"
                      placeholder="Enter an email"
                      touched={formik.touched.email || false}
                      errors={formik.errors.email || ""}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      validationMessage={formik.errors.email}
                    />
                  </div>

                  {/* <!-- Phone Number Form Group --> */}
                  <div className="mb-4">
                    <FormField
                      label={"Phone Number"}
                      name={"phoneNumber"}
                      id={"phoneNumber"}
                      type="tel"
                      placeholder="Enter a Phone Number"
                      touched={formik.touched.phoneNumber || false}
                      errors={formik.errors.phoneNumber || ""}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      validationMessage={formik.errors.phoneNumber}
                    />
                  </div>
                </ProfileField>

                <ProfileField>
                  <button
                    type="submit"
                    className="w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Update Profile
                  </button>
                </ProfileField>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
