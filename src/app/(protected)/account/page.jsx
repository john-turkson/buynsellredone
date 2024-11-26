// src/app/profile/[username]/page.jsx
import { signOut } from "@/auth";
import { auth } from "@/auth";
import Image from "next/image";
import MenuCard from "./components/MenuCard";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";

export default async function AccountPage() {
	const session = await auth();
	// console.log(session);

	return (
		<>
			<div className="max-w-[75rem] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="py-20 px-8">
					{/* Account Header */}
					<h1 className="text-xl font-semibold">Account</h1>

          {/* User Info Section */}
          <div className="flex items-center justify-between py-5">
            {/* Avatar and Info */}
            <div className="flex items-center gap-x-4">
              <Image
                className="w-[46px] h-[46px] rounded-full object-cover"
                src={session.user.profilePicture}
                alt="Avatar"
                width={46}
                height={46}
              />
              <div>
                <span className="block text-base font-bold">
                  {session.user.username}
                </span>
                <p className="text-sm font-medium text-neutral-500">
                  {session.user.email}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="text-sm font-medium text-neutral-500 hover:underline dark:hover:text-white hover:text-gray-800 focus:outline-none"
              >
                Logout
              </button>
            </form>
          </div>

          {/* Cards Section */}
          <div className="flex flex-row justify-between mt-4">
            <MenuCard
              cardName={'Personal Info'}
              cardDescription={'Update your details, email preferences, or password'}
              link={'/account/account-info'}
              Icon={HiOutlineUser}
            />
            <MenuCard
              cardName={'My Listings'}
              cardDescription={'View and manage all the items you’ve listed for sale. Update details, track activity, and make changes anytime'}
              link={'/account/my-listings'}
              Icon={HiOutlineShoppingBag}
            />
            <MenuCard
              cardName={'My Orders'}
              cardDescription={'Check the status of your orders or see past orders'}
              link={'/account/my-orders'}
              Icon={HiOutlineCollection}
            />
          </div>
        </div>
      </div>
    </>
  );
}
