'use client'

import React, { useEffect, useState } from 'react';
import FormField from '@/components/application/FormField';
import { editProfileScehma } from "@/utils/yup-schemas";
import { useFormik } from 'formik';
import axios from 'axios';
import { useToast } from '@/context/ToastContext';
import { signOut } from "next-auth/react"
import { uploadProfilePictureToCloudinary } from "@/utils/helper-functions";
import { useSession } from "next-auth/react"
import DeleteAccount from './DeleteAccount';

export default function InfoEdit({ user }) {

    const { data: session } = useSession();
    const { addToast } = useToast();
    const [countdown, setCountdown] = useState(null);

    const [previewImage, setPreviewImage] = useState(user.profilePicture);

    useEffect(() => {
        if (countdown === null) return; // Exit if countdown is not active

        if (countdown === 0) {
            signOut();
        } else {
            const timeout = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);

            return () => clearTimeout(timeout); // Cleanup timeout on component unmount or state change
        }
    }, [countdown]); // Effect runs whenever countdown changes

    const onSubmit = async (values) => {
        // e.preventDefault();
        // Handle form submission, e.g., send data to backend
        console.log("Form Submitted", values);

        // console.log(values.profilePicture);

        const imageResponse = await uploadProfilePictureToCloudinary(
            values.profilePicture,
            session.user.userId,
          );

          console.log(imageResponse);
          
          
          if (imageResponse) {
            values.profilePicture = imageResponse;
          }

        try {
            const response = await axios.post(
                "/api/edit-user",
                values,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {

                addToast('Profile updated successfully! Logging you out shortly...', 'success');
                setCountdown(3);

            }
        } catch (error) {
            console.error("Error creating user:", error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file); // Create a preview URL
            setPreviewImage(previewUrl); // Update the preview state
            formik.setFieldValue("profilePicture", file); // Set the file in formik
        }
    };

    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            password: "",
            phoneNumber: user.phoneNumber,
            profilePicture: user.profilePicture,
            userId: user.userId,
        },
        validationSchema: editProfileScehma,
        onSubmit: onSubmit,
    });

    return (
        <div>
            <div className="mb-8">
                <div className='flex gap-x-2 mb-2'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex gap-x-1'>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">Profile</h2>
                            <div className="hs-tooltip [--placement:right] inline-block">
                                <svg className="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                </svg>
                                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                                    Upon making any changes, you will be logged out.
                                </span>
                            </div>
                        </div>
                        <DeleteAccount />
                    </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-neutral-400">
                    Manage your name, password and account settings.
                </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                    {/* Profile photo */}
                    <div className="sm:col-span-3">
                        <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            Profile photo
                        </label>

                    </div>
                    <div className="sm:col-span-9">
                        <div className="flex items-center gap-5">
                            <img
                                className="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-800"
                                src={previewImage}
                                alt="Avatar"
                            />
                            <div>
                                <label
                                    htmlFor="upload-photo"
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 cursor-pointer"
                                >
                                    <svg
                                        className="shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" x2="12" y1="3" y2="15" />
                                    </svg>
                                    Upload photo
                                </label>
                                <input
                                    id="upload-photo"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Username */}
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            Username
                        </label>
                    </div>
                    <div className="sm:col-span-9">
                        <FormField
                            placeholder={"Username"}
                            name={"username"}
                            id={"username"}
                            type="text"
                            touched={formik.touched.username || false}
                            errors={formik.errors.username || ""}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            validationMessage={formik.errors.username}
                        />
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-3">
                        <label htmlFor="email" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            Email
                        </label>
                    </div>
                    <div className="sm:col-span-9">
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

                    {/* Password */}
                    <div className="sm:col-span-3">
                        <label htmlFor="password" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            Password
                        </label>
                    </div>
                    <div className="sm:col-span-9 space-y-2">
                        {/* <input
                            id="password"
                            name="password"
                            type="password"
                            className="py-2 px-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter current password"
                        /> */}
                        <FormField
                            placeholder={"Enter new password"}
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

                    {/* Phone */}
                    <div className="sm:col-span-3">
                        <label htmlFor="phone" className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                            Phone
                        </label>
                    </div>
                    <div className="sm:col-span-9">
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
                </div>

                {/* Submit buttons */}
                <div className="mt-5 flex justify-end gap-x-2">
                    <button
                        type="submit"
                        className="py-2 px-3 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700"
                    >
                        Save changes
                    </button>
                </div>
            </form >
        </div >
    );
}
