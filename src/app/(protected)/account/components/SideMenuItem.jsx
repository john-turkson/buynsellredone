import React from "react";

export default function SideMenuItem({ children, itemName }) {
  return (
    <li>
      <a className="w-full cursor-pointer text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300">
        {children}
        {itemName}
      </a>
    </li>
  );
}
