import { HiOutlinePlus } from "react-icons/hi";
import NewListingForm from "./NewListingForm";

export default function AddListing() {
    return (
        <>
            <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-400 text-gray-500 hover:border-purple-600 hover:text-purple-600 focus:outline-none focus:border-purple-600 focus:text-purple-600 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-purple-500 dark:hover:border-purple-600 dark:focus:text-purple-500 dark:focus:border-purple-600 disabled:opacity-50 disabled:pointer-events-none" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-vertically-centered-modal" data-hs-overlay="#hs-vertically-centered-modal">
                <HiOutlinePlus />
                Create Listing
            </button>

            <NewListingForm id="hs-vertically-centered-modal" />
        </>
    )
}
