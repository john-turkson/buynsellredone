import { HiX } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Alert({ message, style, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const alertStyle = {
    success: 'bg-teal-50 border border-teal-200 text-sm text-teal-800 rounded-lg p-4 dark:bg-teal-800/10 dark:border-teal-900 dark:text-teal-500',
    error: 'bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500',
    info: 'bg-blue-50 border border-blue-200 text-sm text-blue-800 rounded-lg p-4 dark:bg-blue-800/10 dark:border-blue-900 dark:text-blue-500',
    warning: 'bg-yellow-50 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500'
  };

  // Trigger entrance effect
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300); // Wait for the animation to finish before removing
  };

  return (
    <div
      className={`transition-all duration-300 transform ${
        isClosing ? "opacity-0 scale-95" : isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
    >
      <div
        id="dismiss-alert"
        className={`${alertStyle[style]} flex items-center`}
        role="alert"
        tabIndex="-1"
        aria-labelledby="hs-dismiss-button-label"
      >
        <div className="shrink-0">
          <svg
            className="shrink-0 w-5 h-5"
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
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
            <path d="m9 12 2 2 4-4"></path>
          </svg>
        </div>
        <div className="ms-2">
          <h3 id="hs-dismiss-button-label" className="text-sm font-medium">
            {message}
          </h3>
        </div>
        <div className="ms-auto pl-2">
          <button
            className="text-neutral-400 hover:text-neutral-600"
            aria-label="Close alert"
            onClick={handleClose}
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
