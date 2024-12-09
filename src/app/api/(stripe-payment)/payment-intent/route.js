import Stripe from 'stripe';
import { NextResponse } from 'next/server';

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export async function POST(req) {
  // Parse the amount from the request body
  const { amount, user } = await req.json();

  try {
      const customer = await stripe.customers.create({
        email: user,
        name: user
    });

    // Create a PaymentIntent with the specified amount and currency
    // stripe.customers.retrievePaymentMethod
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Respond with the client secret of the created payment intent
    return NextResponse.json({ clientSecret: paymentIntent.client_secret, intent: paymentIntent });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
