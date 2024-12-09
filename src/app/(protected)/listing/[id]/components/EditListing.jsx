import React from 'react'
import EditListingForm from './EditListingForm'

export default function EditListing({ listing }) {
    return (
        <div>
            <button type="button" className="w-full mt-6 bg-purple-600 hover:bg-purple-500 text-white py-3 rounded-lg font-semibold shadow-sm transition duration-200 >Edit Button</button>)" aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-vertically-centered-modal" data-hs-overlay="#hs-vertically-centered-modal">
                Edit Listing
            </button>

            <EditListingForm listing={listing} id="hs-vertically-centered-modal" />
        </div>
    )
}
