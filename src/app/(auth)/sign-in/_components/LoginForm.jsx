"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { loginScehma } from "@/utils/yup-schemas";
import FormField from "@/components/application/FormField";
import { signIn } from "next-auth/react";
import { loginUser } from "@/utils/auth-functions";

export default function LoginForm() {
  const onSubmit = async (values) => {
    console.log("Form Submitted", values);

    try {
      // Perform the login
      signIn("credentials", { ...values, redirectTo: "/account" });
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
      <div className="w-full max-w-sm mt-12">
        <div className="p-4 sm:p-7">
          <div className="text-center mb-4">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don&apos;t have an account yet?
              <Link
                className="text-purple-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-purple-500 ml-1"
                href="/sign-up"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <button
            type="button"
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <svg
              className="w-4 h-auto"
              width="46"
              height="47"
              viewBox="0 0 46 47"
              fill="none"
            >
              <path
                d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                fill="#4285F4"
              />
              <path
                d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                fill="#34A853"
              />
              <path
                d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                fill="#FBBC05"
              />
              <path
                d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                fill="#EB4335"
              />
            </svg>
            Sign in with Google
          </button>

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
                    placeholder="Email"
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
                    placeholder="Password"
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
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
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
