"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { loginScehma } from "@/utils/yup-schemas";
import FormField from "@/components/application/FormField";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function LoginForm() {
  const router = useRouter();

  const onSubmit = async (values) => {
    console.log("Form Submitted", values);

    try {
      // Perform the login
      signIn('credentials', {...values, redirectTo: '/account'})
      
    } catch (error) {
      console.error("Login failed:", error);
    }

  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginScehma,
    onSubmit: onSubmit,
  });

  return (
    <>
      <div className="w-full max-w-sm mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don&apos;t have an account yet?
              <Link
                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 ml-1"
                href="/sign-up"
              >
                Sign up here
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
                {/* <!-- Email Form Group --> */}
                <div>
                  <FormField
                    label={"Email"}
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
                    label={"Password"}
                    name={"password"}
                    id={"password"}
                    type="password"
                    touched={formik.touched.password || false} // fallback for untouched state
                    errors={formik.errors.password || ""}
                    value={formik.values.password} // Pass the value to make it controlled
                    onChange={formik.handleChange} // Pass onChange to handle updates
                    onBlur={formik.handleBlur}
                    validationMessage={formik.errors.password}
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
    </>
  );
}
