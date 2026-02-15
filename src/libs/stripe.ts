import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

/**
 * Singleton pattern for loading the Stripe object.
 * Ensures Stripe is only loaded once.
 * @returns {Promise<Stripe | null>} The Stripe object.
 */
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
  }

  return stripePromise;
};
