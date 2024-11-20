import Image from "next/image";
import { HiArrowUpTray } from "react-icons/hi2";
import EditProfileField from "./EditProfileField";

export default function PersonalInfo({ user }) {
  return (
    <div>
      <div className="flex items-center gap-x-4 mb-4">
        <Image
          className="inline-block size-[62px] rounded-full"
          src={user.profilePicture}
          alt="Avatar"
          width={300}
          height={300}
        />
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-purple-600 hover:text-purple-600 focus:outline-none focus:border-purple-600 focus:text-purple-600 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-purple-500 dark:hover:border-purple-600 dark:focus:text-purple-500 dark:focus:border-purple-600"
        >
          <HiArrowUpTray />
          Upload Photo
        </button>
      </div>

      <EditProfileField editibleProperty={user.username} inputValue={user.username} />

      {/* <EditProfileField editibleProperty={user.email} inputValue={user.email} /> */}

    </div>
  );
}
