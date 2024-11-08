"use client"

// Reusable FormField component
export default function FormField({
  label,
  type = "text",
  id,
  name,
  placeholder = "",
  pattern = "",
  helperText = "",
  validationStatus = "", // "error" or "success"
  validationMessage = "",
  isRequired = false,
}) {
  // Determine styles based on validation status
  const borderColor =
    validationStatus === "error"
      ? "border-red-500"
      : validationStatus === "success"
      ? "border-teal-500"
      : "border-gray-300";
  const focusBorderColor =
    validationStatus === "error"
      ? "focus:border-red-500 focus:ring-red-500"
      : validationStatus === "success"
      ? "focus:border-teal-500 focus:ring-teal-500"
      : "focus:border-blue-500 focus:ring-blue-500";
  const textColor =
    validationStatus === "error"
      ? "text-red-600"
      : validationStatus === "success"
      ? "text-teal-600"
      : "text-gray-600";
  const iconColor =
    validationStatus === "error"
      ? "text-red-500"
      : validationStatus === "success"
      ? "text-teal-500"
      : "";

  return (
    <div className="max-w-sm space-y-1">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm mb-1 dark:text-white"
      >
        {label}
      </label>

      {/* Helper text */}
      {helperText && (
        <span className="block mb-2 text-sm text-gray-500 dark:text-neutral-500">
          {helperText}
        </span>
      )}

      {/* Input field */}
      <div className="relative">
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={isRequired}
          pattern={pattern}
          className={`py-3 px-4 block w-full rounded-lg text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 ${borderColor} ${focusBorderColor}`}
          aria-describedby={`${id}-helper`}
        />

        {/* Validation icon */}
        {validationStatus && (
          <div className="absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
            {validationStatus === "error" ? (
              <svg
                className={`shrink-0 size-4 ${iconColor}`}
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
            ) : (
              <svg
                className={`shrink-0 size-4 ${iconColor}`}
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
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Validation message */}
      {validationMessage && (
        <p className={`text-sm mt-2 ${textColor}`} id={`${id}-helper`}>
          {validationMessage}
        </p>
      )}
    </div>
  );
}
