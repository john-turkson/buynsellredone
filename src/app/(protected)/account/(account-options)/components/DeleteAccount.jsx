'use client'
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";
import axios from "axios";
import { deleteAllImages, deleteUserFolder } from "@/utils/helper-functions";

export default function DeleteAccount() {

    const { data: session } = useSession();

    const closeModal = () => {
        // Close the modal by manipulating the `data-hs-overlay` attribute
        const modal = document.querySelector('[data-hs-overlay="#hs-scale-animation-modal"]');
        if (modal) {
            modal.click();  // Trigger the close action by simulating a click event
        }
    };

    const handleDeleteAccount = async () => {

        const userFolder = `Users/${session.user.userId}`

        const deleteResponse = await deleteAllImages(userFolder);

        if (deleteResponse.status === 200) {
            console.log("Images deleted successfully.");
        } else {
            console.error("Failed to delete images.");
            return
        }

        const deleteFolders = await deleteUserFolder(userFolder);

        if (deleteFolders) {
            const response = await axios.delete('/api/delete-user', {
                params: { id: session.user.userId },
              })

            if (response.status === 200) {
                console.log("User deleted successfully.");
                closeModal();
                signOut();
            } else {
                console.error("Failed to delete user.");
            }
        }

    }

    return (
        <>
            <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:border-red-400 hover:text-red-400 focus:outline-none focus:border-red-400 focus:text-red-400 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="hs-scale-animation-modal"
                data-hs-overlay="#hs-scale-animation-modal"
            >
                Delete Account
            </button>
            <div
                id="hs-scale-animation-modal"
                className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                role="dialog"
                tabIndex={-1}
                aria-labelledby="hs-scale-animation-modal-label"
            >
                <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 scale-95 opacity-0 ease-in-out transition-all duration-200 sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                            <h3
                                id="hs-scale-animation-modal-label"
                                className="font-bold text-gray-800 dark:text-white"
                            >
                                Delete Account
                            </h3>
                            <button
                                type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close"
                                data-hs-overlay="#hs-scale-animation-modal"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 overflow-y-auto">
                            <p className="mt-1 text-gray-800 dark:text-neutral-400">
                                Are you sure you want to permanently delete your account?
                            </p>
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                data-hs-overlay="#hs-scale-animation-modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
