import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useAuthStore } from "@/lib/stores/useAuthStore";

export default function Avatar() {
  
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Default Props
  const defaultImg = "/default_profile.jpg";

  const handleLogout = async () => {
    try {
      // Perform the login
      await logout();
  
      // Redirect to the profile page after successful login
      router.push("/"); // Redirect to the profile page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="hs-dropdown relative inline-flex">
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Dropdown"
      >
        <Image
          className="w-8 h-auto rounded-full"
          src={user?.profilePicture ? user.profilePicture : defaultImg}
          alt="Avatar"
          width={36}
          height={36}
        />
        <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-neutral-400">
          {user.username}
        </span>
        <svg
          className="hs-dropdown-open:rotate-180 size-4"
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="hs-dropdown-with-header"
      >
        <div className="py-3 px-4 border-b border-gray-200 dark:border-neutral-700">
          <p className="text-sm text-gray-500 dark:text-neutral-400">
            Signed in as
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-neutral-300">
            {user.email}
          </p>
        </div>
        <div className="p-1 space-y-0.5">
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="/profile"
          >
            <FaRegCircleUser />
            Profile
          </Link>
          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="/cart"
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
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            Cart
          </Link>

          <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
            href="#"
            onClick={handleLogout}
          >
            <FaArrowRightFromBracket />
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
