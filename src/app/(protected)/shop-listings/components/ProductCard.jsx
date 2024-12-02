import Link from 'next/link';


export default function ProductCard({ product, userDetails }) {

    return (
        <div className="flex justify-center">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-lg focus:outline-none focus:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full max-w-sm">
                <div className="p-4 mt-8 w-full h-[290px] flex items-center justify-center overflow-hidden">
                    <img className="w-auto h-[700px] object-cover shadow-lg" src={product.images[0]} alt="Card Image" />
                </div>
                <div className="p-4 md:p-5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            <Link className='hover:underline' href={`/listing/${product._id}`}>{product.name}</Link>
                        </h3>
                        <p className="mt-1 text-lg font-medium text-gray-500 dark:text-neutral-400">
                            ${product.price}
                        </p>
                    </div>
                    <div className='flex items-start justify-start py-2'>
                        <div className="flex items-center justify-center">
                            <img className="inline-block w-[38px] h-[38px] rounded-full" src={userDetails.profilePicture} alt="Avatar" />
                            <Link className='hover:underline' href={`/profile/${userDetails.id}`}><span className="ml-2 text-sm font-medium text-gray-800 dark:text-white">{userDetails.username}</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );


}
