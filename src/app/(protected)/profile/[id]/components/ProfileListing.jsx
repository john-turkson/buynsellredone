

export default function ProfileListing({ product }) {

    return (
        <div className="flex justify-center">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full max-w-sm">
                <div className="p-4 mt-8 w-full h-[290px] flex items-center justify-center overflow-hidden">
                    <img className="w-auto h-[700px] object-cover shadow-lg" src={product.images[0]} alt="Card Image" />
                </div>
                <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {product.name}
                        </h3>
                        <p className="mt-1 text-lg font-medium text-gray-500 dark:text-neutral-400">
                            ${product.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );


}
