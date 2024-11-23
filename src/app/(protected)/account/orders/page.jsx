export default function AccountOrders() {
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
					<div className="row-span-3">Image</div>
					<div className="font-bold">Title</div>
					<div>$Price</div>
				</div>
				<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
					<div className="row-span-3">Image</div>
					<div className="font-bold">Title</div>
					<div>$Price</div>
				</div>
			</div>
		</div>
	);
}
