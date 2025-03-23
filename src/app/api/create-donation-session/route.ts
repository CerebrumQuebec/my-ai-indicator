import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const { amount, isSubscription, success_url, cancel_url } =
      await request.json();

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: "Invalid amount. Minimum donation is $1" },
        { status: 400 }
      );
    }

    const params: Stripe.Checkout.SessionCreateParams = {
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: isSubscription ? "Monthly Donation" : "One-time Donation",
              description: "Thank you for supporting our project!",
            },
            unit_amount: amount * 100, // Convert to cents
            ...(isSubscription && { recurring: { interval: "month" } }),
          },
          quantity: 1,
        },
      ],
      success_url: success_url,
      cancel_url: cancel_url,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
