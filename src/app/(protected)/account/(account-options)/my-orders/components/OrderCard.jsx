
import OrderModal from './OrderModal';

export default function OrderCard({ order }) {

    return (
        <>
            <div
                className="border rounded-lg p-4 m-4 hover:border-purple-500 dark:hover:border-purple-400
                bg-white text-black dark:bg-neutral-900 dark:text-white border-gray-300 dark:border-neutral-900"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between gap-x-4">
                        <div className="flex flex-col">
                            <h3 className="text-lg font-medium">Order: {order.orderId.slice(-7)}</h3>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                Listing(s) in Order: {order.listingAmount}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col items-end'>
                        <span className="text-lg font-bold text-gray-600 dark:text-gray-400">
                            ${order.price}
                        </span>
                        <OrderModal
                            order={order}
                        />
                    </div>
                </div>
            </div>

        </>
    );
}
