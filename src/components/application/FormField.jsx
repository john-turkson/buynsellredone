"use client";

// Reusable FormField component
export default function FormField({
  label,
  type = "text",
  id,
  name,
  placeholder = "",
  pattern,
  touched,
  errors,
  value = "",
  onChange,
  onBlur,
  validationMessage = "",
  isRequired = false,
}) {
  return (
    <div className="max-w-full space-y-4">
      <div>
        <label
          htmlFor={id} // Set to match the input `id`
          className="block text-sm font-small mb-2 dark:text-white"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={type}
            id={id}
            name={name}
            className={`py-3 px-4 block w-full rounded-lg text-sm ${
              touched && errors
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-purple-500"
            } dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400`}
            value={value} // Use the controlled value from Formik
            onChange={onChange} // Formik handles onChange
            onBlur={onBlur}
            required={isRequired}
            placeholder={placeholder}
            pattern={pattern}
          />
          {touched && errors && (
            <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
              <svg
                className="shrink-0 size-4 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" x2="12" y1="8" y2="12"></line>
                <line x1="12" x2="12.01" y1="16" y2="16"></line>
              </svg>
            </div>
          )}
        </div>
        {touched && errors && (
          <p className="text-sm text-red-600 mt-2">{validationMessage}</p>
        )}
      </div>
    </div>
  );
}
