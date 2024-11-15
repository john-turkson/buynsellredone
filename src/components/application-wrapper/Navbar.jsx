"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeSwitch from "../application/ThemeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full">
      <nav className="max-w-[85rem] relative w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
            href="/"
          >
            BuynSell
          </Link>

          <div className="md:hidden">
            <button
              type="button"
              className="relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-controls="hs-header-classic"
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <svg
                  className="size-4"
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  className="size-4"
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
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        <div
          id="hs-header-classic"
          className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
              <Link
                href="/sign-up"
                className="p-2 flex items-center text-sm text-purple-600 focus:outline-none focus:text-purple-600 dark:text-purple-500 dark:focus:text-purple-500"
              >
                Sign Up
              </Link>
              {/* <!-- Button Group --> */}
              <div className="relative flex flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
                <Link
                  className="p-2 w-full flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                  href="/sign-in"
                >
                  <svg
                    className="shrink-0 size-4 me-3 md:me-2"
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Log in
                </Link>
              </div>
              {/* <!-- End Button Group --> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
