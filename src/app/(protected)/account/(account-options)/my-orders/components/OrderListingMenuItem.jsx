import React from 'react'

export default function OrderListingMenuItem({ listing }) {

    const name = listing.name || 'Unnamed Listing';

    return (
        <div>
            <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-neutral-700 dark:text-neutral-200">

                <div className="flex items-center justify-between w-full">
                    <span>{name}</span>
                    <span>${listing.price}</span>
                </div>

            </li>
        </div>
    )
}
