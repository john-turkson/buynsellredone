import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Gradients */}
      <div
        aria-hidden="true"
        className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
      >
        <div className="bg-gradient-to-r from-transparent via-violet-300/50 to-transparent blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-transparent dark:via-violet-900/50 dark:to-transparent"></div>
        <div className="bg-gradient-to-tl from-transparent via-blue-100 to-transparent blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 -translate-x-[15rem] dark:from-transparent dark:via-indigo-900/70 dark:to-transparent"></div>
      </div>
      {/* End Gradients */}

      <div className="relative z-10">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="max-w-2xl text-center mx-auto">
            <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400"></p>

            {/* Title */}
            <div className="mt-5 max-w-2xl">
              <h1 className="block font-semibold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                Discover Everything You Need
              </h1>
            </div>
            {/* End Title */}

            <div className="mt-5 max-w-3xl">
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                BuynSell connects to buyers and sellers across a range of
                categories. Find great deals, sell your items, and make
                connections in a thriving online marketplace.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 gap-3 flex justify-center">
              <Link
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="/sign-up"
              >
                Get started
                <svg
                  className="shrink-0 size-4"
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
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
            {/* End Buttons */}
          </div>
        </div>
      </div>
    </div>
  );
}
