import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function POST(req) {
  // Parse the amount from the request body
  const { amount } = await req.json();

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad', // Or whichever currency you're using
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Respond with the client secret of the created payment intent
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
