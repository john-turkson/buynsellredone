import Stripe from "stripe";
import { NextResponse } from "next/server";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const payIntent = searchParams.get("paymentIntent");

    // Retrieve the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(payIntent);

    // Extract the payment method ID
    const paymentMethodId = paymentIntent.payment_method;

    // Retrieve the payment method details
    const payMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    // Respond with the payment method details
    return NextResponse.json({
      method: payMethod.card.brand, // Correct property for the card brand
    });
  } catch (error) {
    console.error("Error retrieving payment method:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
