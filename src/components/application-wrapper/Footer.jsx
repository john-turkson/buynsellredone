"use client";

import Image from "next/image";
import ThemeSwitch from "../application/ThemeSwitcher";

export default function Footer() {
  return (
    <div>
      {/* <!-- ========== FOOTER ========== --> */}
      <footer className="bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center">
          <div className="mb-4">
            <ThemeSwitch />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2024 Exchangr. All rights reserved.
          </p>
        </div>
      </footer>

      {/* <!-- ========== END FOOTER ========== --> */}
    </div>
  );
}
