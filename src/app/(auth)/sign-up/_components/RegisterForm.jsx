"use client";

import Link from "next/link";
import React, { useState } from "react";
import FormField from "../../../../components/application/FormField";
import FileInput from "./FileInput";
import { useFormik } from "formik";
import axios from "axios";
import { registrationScehma } from "@/utils/yup-schemas";
import SuccessAlert from "@/components/application/SuccessAlert";
import { uploadProfilePictureToCloudinary } from "@/utils/auth-functions";

export default function RegisterForm() {
  const [alertVisible, setAlertVisible] = useState(false);

  // const uploadProfilePictureToCloudinary = async(image, username) => {
  //   const imageFormData = new FormData();
  
  //   // Append the necessary data for Cloudinary upload
  //   imageFormData.append("file", image);
  //   imageFormData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); 
  //   imageFormData.append("folder", `Users/${username}/Images`); 
  //   imageFormData.append("public_id", `profilePicture`); 
  
  //   try {
  //     // Upload the image to Cloudinary
  //     const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL_ENDPOINT, {
  //       method: "POST",
  //       body: imageFormData,
  //     });
  
  //     const data = await response.json();
  
  //     // Return the secure URL of the uploaded image
  //     return data.secure_url;
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //     return null;
  //   }
  // }
  

  const onSubmit = async (values, actions) => {
    console.log("Form Submitted", values);

    // const imageResponse = await uploadProfilePictureToCloudinary(values.profilePicture, userName);
    // console.log(imageResponse);

    // const profileData = {
    //   username: values.username,
    //   email: values.email,
    //   password: values.password,
    //   phone: values.phoneNumber,
    //   profilePicture: imageResponse,
    // };

    // //Send User Data to MongoDB
    // try {
    //   const response = await axios.post("/api/register-user", profileData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
     
    //   if (response.status === 201) {
    //     setAlertVisible(true);
    //     actions.resetForm();
    //   } 

    // } catch (error) {
    //   console.error("Error creating user:", error.message);
    // }
    
    
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      profilePicture: "",
    },
    validationSchema: registrationScehma,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="w-full max-w-sm mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign Up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1"
                href="/sign-up"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-2">
            <div className="py-1 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
              Or
            </div>

            {/* <!-- Form --> */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4 mt-2">
                {/* <!-- Username Form Group --> */}
                <div>
                  <FormField
                    label={"Username"}
                    name={"username"}
                    id={"username"}
                    type="text"
                    placeholder="Enter a Username"
                    touched={formik.touched.username || false} // fallback for untouched state
                    errors={formik.errors.username || ""}
                    value={formik.values.username} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.username}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Email Form Group --> */}
                <div>
                  <FormField
                    label={"Email"}
                    name={"email"}
                    id={"email"}
                    type="text"
                    placeholder="Enter an email"
                    touched={formik.touched.email || false} // fallback for untouched state
                    errors={formik.errors.email || ""}
                    value={formik.values.email} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.email}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Phone Number Form Group --> */}
                <div>
                  <FormField
                    label={"Phone Number"}
                    name={"phoneNumber"}
                    id={"phoneNumber"}
                    type="tel"
                    placeholder="Enter a Phone Number"
                    touched={formik.touched.phoneNumber || false} // fallback for untouched state
                    errors={formik.errors.phoneNumber || ""}
                    value={formik.values.phoneNumber} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.phoneNumber}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Password Form Group --> */}
                <div>
                  <FormField
                    label={"Password"}
                    name={"password"}
                    id={"password"}
                    type="password"
                    placeholder="Enter a Password"
                    touched={formik.touched.password || false} // fallback for untouched state
                    errors={formik.errors.password || ""}
                    value={formik.values.password} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={
                      formik.errors.password
                        ? formik.errors.password.charAt(0).toUpperCase() +
                          formik.errors.password.slice(1)
                        : ""
                    }
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Confirm Password Form Group --> */}
                <div>
                  <FormField
                    label={"Confirm Password"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    type="password"
                    placeholder="Re-enter a Password"
                    touched={formik.touched.confirmPassword || false} // fallback for untouched state
                    errors={formik.errors.confirmPassword || ""}
                    value={formik.values.confirmPassword} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.confirmPassword}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Profile Picture Form Group --> */}
                <div>
                  <FileInput
                    label={"Profile Picture (Optional)"}
                    name={"profilePicture"}
                    id={"profilePicture"}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "profilePicture",
                        e.currentTarget.files[0]
                      )
                    } // Pass onChange to handle updates
                  />
                </div>
                {/* <!-- End Form Group --> */}

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign Up
                </button>
              </div>
            </form>
            {/* <!-- End Form --> */}
          </div>
        </div>
      </div>

      <SuccessAlert
        message="Account created successfully!"
        hidden={!alertVisible}
      />
    </>
  );
}
