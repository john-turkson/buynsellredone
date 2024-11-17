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

  const onSubmit = async (values, actions) => {
    // console.log("Form Submitted", values);

    const imageResponse = await uploadProfilePictureToCloudinary(
      values.profilePicture,
      values.username
    );
    console.log(imageResponse);

    const profileData = {
      username: values.username,
      email: values.email,
      password: values.password,
      phone: values.phoneNumber,
      profilePicture: imageResponse,
    };

    //Send User Data to MongoDB
    try {
      const response = await axios.post(
        ".netlify/functions/register-user",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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
      <div className="w-full max-w-sm mt-3 ">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold my-6 text-gray-800 dark:text-white">
              Create an Account
            </h1>
          </div>

          <div className="py-2">
            {/* <!-- Form --> */}
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-y-4 mt-2">
                {/* <!-- Email Form Group --> */}
                <div>
                  <FormField
                    placeholder={"Email"}
                    name={"email"}
                    id={"email"}
                    type="text"
                    touched={formik.touched.email || false} // fallback for untouched state
                    errors={formik.errors.email || ""}
                    value={formik.values.email} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.email}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Password Form Group --> */}
                <div>
                  <FormField
                    placeholder={"Password"}
                    name={"password"}
                    id={"password"}
                    type="password"
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
                    placeholder={"Confirm Password"}
                    name={"confirmPassword"}
                    id={"confirmPassword"}
                    type="password"
                    touched={formik.touched.confirmPassword || false} // fallback for untouched state
                    errors={formik.errors.confirmPassword || ""}
                    value={formik.values.confirmPassword} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.confirmPassword}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                <hr />

                {/* <!-- Username Form Group --> */}
                <div>
                  <FormField
                    placeholder={"Username"}
                    name={"username"}
                    id={"username"}
                    type="text"
                    touched={formik.touched.username || false} // fallback for untouched state
                    errors={formik.errors.username || ""}
                    value={formik.values.username} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.username}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Phone Number Form Group --> */}
                <div>
                  <FormField
                    placeholder={"Phone Number"}
                    name={"phoneNumber"}
                    id={"phoneNumber"}
                    type="tel"
                    touched={formik.touched.phoneNumber || false} // fallback for untouched state
                    errors={formik.errors.phoneNumber || ""}
                    value={formik.values.phoneNumber} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.phoneNumber}
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
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign Up
                </button>
                <div className="text-center">
                  <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                    Already have an account yet?
                    <Link
                      className="text-purple-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-purple-500 ml-1"
                      href="/sign-in"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
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
