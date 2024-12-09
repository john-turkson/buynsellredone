import React from "react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";

const PaymentIcon = ({ paymentMethod }) => {
	switch (paymentMethod) {
		case "visa":
			return <FaCcVisa className="w-4 h-4" />;
		case "mastercard":
			return <FaCcMastercard className="w-4 h-4" />;
		case "amex":
			return <FaCcAmex className="w-4 h-4" />;
		default:
			return <span>Unsupported Payment Method</span>;
	}
};

export default PaymentIcon;
