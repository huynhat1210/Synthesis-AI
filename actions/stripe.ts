"use server";
/**
 * @file actions/stripe.ts
 * @description Server Actions: Handles creation and verification of Stripe Checkout Sessions.
 */

import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { upgradeProfileToPro } from "@/lib/storage";
import type { ApiResponse, MasterProfile } from "@/types";

/**
 * Creates a Stripe Checkout Session for the Pro Plan upgrade.
 * Returns the Stripe checkout URL.
 */
export async function createCheckoutSessionAction(): Promise<ApiResponse<string>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized. Please sign in." };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return {
      data: null,
      error: "Stripe configuration is missing on the server. Please configure STRIPE_SECRET_KEY.",
    };
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2024-11-20.accredited" as any, // compatible versioning
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Synthesis AI - Pro Plan Lifetime Upgrade 🚀",
              description: "Unlimited AI pitch creations, dynamic JD PDF analysis, full match alignment metrics, and shareable QR hubs.",
            },
            unit_amount: 2900, // $29.00 USD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/dashboard?payment=cancel`,
    });

    if (!session.url) {
      throw new Error("Stripe checkout session failed to return a valid redirection URL.");
    }

    return { data: session.url, error: null };
  } catch (err: any) {
    console.error("[Stripe] Failed to create checkout session:", err);
    return { data: null, error: err.message || "Failed to initiate Stripe payment checkout." };
  }
}

/**
 * Verifies a Stripe Checkout Session ID.
 * If paid successfully, unlocks the Pro Plan in the database.
 */
export async function verifyCheckoutSessionAction(
  sessionId: string
): Promise<ApiResponse<MasterProfile>> {
  const { userId } = await auth();
  if (!userId) {
    return { data: null, error: "Unauthorized." };
  }

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return { data: null, error: "Invalid Stripe checkout session identifier." };
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return { data: null, error: "Stripe is not configured." };
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2024-11-20.accredited" as any,
  });

  try {
    // Retrieve checkout session details directly from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return { data: null, error: "Payment checkout has not been completed successfully." };
    }

    // Persist the plan status to PostgreSQL
    const upgradedProfile = await upgradeProfileToPro(userId);
    if (!upgradedProfile) {
      return { data: null, error: "Payment received, but failed to upgrade active profile in database." };
    }

    return { data: upgradedProfile, error: null };
  } catch (err: any) {
    console.error("[Stripe] Verification failed:", err);
    return { data: null, error: err.message || "Failed to verify payment checkout." };
  }
}
