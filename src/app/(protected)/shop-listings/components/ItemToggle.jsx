import React from 'react';

export default function ItemToggle({ onToggleChange }) {
    const handleChange = (event) => {
        onToggleChange(event.target.checked); // Pass the checkbox value back to the parent
    };

    return (
        <div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="hs-basic-with-description"
                    className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-purple-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-purple-600 checked:border-purple-600 focus:checked:border-purple-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-purple-500 dark:checked:border-purple-500 dark:focus:ring-offset-gray-600 before:inline-block before:size-6 before:bg-white checked:before:bg-purple-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-neutral-400 dark:checked:before:bg-purple-200"
                    onChange={handleChange}
                />
                <label htmlFor="hs-basic-with-description" className="text-sm text-gray-500 ms-3 dark:text-neutral-400">Hide My Listings</label>
            </div>
        </div>
    );
}
