'use client'

export default function EditProfileField({ fieldTitle, editibleProperty, inputValue, collapseId }) {
    
  return (
    <div className="">
      <div className="py-5 my-3 border-t border-neutral-400">
        {/* Label and Value */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold dark:text-gray-300">{fieldTitle}</p>
            <p className="text-sm text-gray-500 dark:text-neutral-300">{editibleProperty}</p>
          </div>

          {/* Edit Button */}
          <button
            type="button"
            className="hs-collapse-toggle text-sm dark:text-neutral-200 hover:underline hover:text-purple-400 focus:outline-none"
            id="hs-unstyled-collapse"
            aria-expanded="false"
            aria-controls="hs-unstyled-collapse-heading"
            data-hs-collapse={`#${collapseId}`}
          >
            Edit
          </button>
        </div>

        {/* Collapsed Section */}
        <div
          id={collapseId}
          className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300 mt-2"
          aria-labelledby="hs-unstyled-collapse"
        >
          {/* Input Field */}
          <div className="max-w-sm space-y-3">
            <input
              type="text"
              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-purple-500 focus:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              value={inputValue}
              readOnly
            />
            <button
              type="button"
              className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-none focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:bg-white dark:text-neutral-800"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
