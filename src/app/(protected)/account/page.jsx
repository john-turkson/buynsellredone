// src/app/profile/[username]/page.jsx
import { signOut } from "@/auth";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

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
							<Image className="w-[62px] h-[62px] rounded-full object-cover" src={session.user.profilePicture} alt="Avatar" width={62} height={62} />
							<div>
								<span className="block text-base font-bold">{session.user.username}</span>
								<p className="text-sm font-medium text-neutral-500">{session.user.email}</p>
							</div>
						</div>

						{/* User Orders Link */}
						<Link href="/account/orders" className="text-sm font-medium text-neutral-500 hover:underline dark:hover:text-white hover:text-gray-800 focus:outline-none">
							See Orders
						</Link>

						{/* Logout Button */}
						<form
							action={async () => {
								"use server";
								await signOut();
							}}
						>
							<button type="submit" className="text-sm font-medium text-neutral-500 hover:underline dark:hover:text-white hover:text-gray-800 focus:outline-none">
								Logout
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
