import Link from "next/link";
import React from "react";
import FormField from "./FormField";

export default function RegisterForm() {
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
            <form>
              <div className="grid gap-y-4 mt-2">
                
                {/* <!-- Username Form Group --> */}
                <div>
                  <FormField
                    label={"Username"}
                    type="text"
                    id={"text"}
                    name={"username"}
                    placeholder="Enter username"
                    isRequired={true}
                  />
                </div>
                {/* <!-- End Form Group --> */}
                
                {/* <!-- Email Form Group --> */}
                <div>
                  <FormField
                    label={"Email"}
                    type="text"
                    id={"text"}
                    name={"email"}
                    placeholder="me@example.com"
                    isRequired={true}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Phone Number Form Group --> */}
                <div>
                  <FormField
                    label={"Phone Number"}
                    type="tel"
                    id={"phoneNumber"}
                    name={"phoneNumber"}
                    pattern="[0-9]*"
                    placeholder="i.e. (123) 456-7890"
                    isRequired={true}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Password Form Group --> */}
                <div>
                  <FormField
                    label={"Password"}
                    type="password"
                    id={"password"}
                    name={"password"}
                    placeholder="Enter a Password"
                    isRequired={true}
                  />
                </div>
                {/* <!-- End Form Group --> */}

                {/* <!-- Confirm Password Form Group --> */}
                <div>
                  <FormField
                    label={"Confirm Password"}
                    type="password"
                    id={"confirmPassword"}
                    name={"confirmPassword"}
                    placeholder="Re-enter your Password"
                    isRequired={true}
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
