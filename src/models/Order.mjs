import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		buyer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		listings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Listing",
				required: true,
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			validate: {
				validator: function (value) {
					return value >= 0;
				},
				message: () => "Total amount must be a positive number",
			},
		},
		orderDate: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			enum: ["Pending", "Completed", "Cancelled"],
			default: "Pending",
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		shippingAddress: {
			type: String,
			required: true,
		},
	},
	{ collection: "Orders" }
);

const Order = mongoose.models.Orders || mongoose.model("Order", orderSchema);
export default Order;
