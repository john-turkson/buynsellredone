import Link from 'next/link';

export default function MenuCard({ cardName, cardDescription, link, Icon }) {
    return (
        <Link href={link || '#'}>
            <div className="flex flex-col bg-white border border-gray-300 shadow-sm rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-80 h-48 transition-colors duration-200 hover:border-purple-500 dark:hover:border-purple-400">
                <div className="py-3">
                    {Icon && <Icon className="size-6" />}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {cardName}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-neutral-400">
                    {cardDescription}
                </p>
            </div>
        </Link>
    );
    
}
