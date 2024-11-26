import Image from "next/image";

export default function AccountOrders() {
	useEffect(() => {
		const fetchOrders = async () => {
			const response = await axios.get("/api/get-orders", {
				params: { userId: loggedInUserData.userId },
			});
			console.log(response);
		};
	});
	return (
		<div className="flex items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="flex flex-col items-center space-y-4 border-2 p-2">
					<div className="text-left">Order Date</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
						<Image src="https://http.cat/522.jpg" alt="Image" width={200} height={200} className="row-span-2" />
						<div className="font-bold">Title</div>
						<div>$Price</div>
					</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 border-2 rounded p-2">
						<Image src="https://http.cat/522.jpg" alt="Image" width={200} height={200} className="row-span-2" />
						<div className="font-bold">Title</div>
						<div>$Price</div>
					</div>
					<div className="font-bold text-left">Order Amount</div>
					<div className="text-left">Status</div>
				</div>
			</div>
		</div>
	);
}
