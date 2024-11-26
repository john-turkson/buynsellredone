'use client';

export default function PaymentSuccess({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-0 dark:bg-neutral-900">
        <h2 className="text-3xl font-semibold mb-4 text-center text-black dark:text-white">Payment Successful!</h2>
        <p className="text-lg mb-4 text-center text-black dark:text-white">Thank you for your purchase. Your payment has been processed successfully.</p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

