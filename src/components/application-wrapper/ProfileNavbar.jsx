
import { auth } from "@/auth";
import Link from "next/link";
import ThemeSwitch from "../application/ThemeSwitcher";
import Avatar from "../application/Avatar";
import SideCart from "../application/side-cart/SideCart";

export default async function ProfileNavbar() {
  const session = await auth();

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

        </div>

        <div
          id="hs-header-classic"
        >
          <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1">
            
              <Link className="p-2 flex items-center text-sm text-purple-800 hover:text-purple-500 focus:outline-none focus:text-purple-500 dark:text-purple-200 dark:hover:text-purple-500 dark:focus:text-purple-500" href='/shop-listings'>View Catalogue</Link>
              <ThemeSwitch />
              <SideCart />
            
              {/* <!-- Button Group --> */}
              <div className="relative flex flex-wrap items-center gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 dark:before:bg-neutral-700">
                <Avatar username={session.user.username} email={session.user.email} profilePicture={session.user.profilePicture} />
              </div>
              {/* <!-- End Button Group --> */}
             
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
