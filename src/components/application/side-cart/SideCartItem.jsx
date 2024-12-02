import Link from "next/link";


export default function SideCartItem({ item, remove }) {
    return (
        <div>
            <div className="flex justify-between items-center pb-6 mb-6 border-b border-neutral-300 dark:border-neutral-700 ">
                <div className="flex space-x-4 ">
                    <img
                        src={item.images[0] || '/placeholder-image.png'}
                        alt={item.name}
                        className="w-[80px] h-[112px] object-cover rounded-lg shadow-md"
                    />
                    <div className="flex flex-col justify-between"> {/* Added justify-between */}
                        <div>
                            <Link href={`/listing/${item._id}`}>
                                <h3 className="text-base font-normal dark:text-white hover:underline">
                                    {item.name}
                                </h3>
                            </Link>
                            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-500">
                                ${item.price}
                            </p>
                        </div>
                        <p
                            onClick={() => remove(item._id)}
                            className="pb-2 text-base font-light underline cursor-pointer hover:text-purple-500 transition duration-150"
                        >
                            Remove
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}
