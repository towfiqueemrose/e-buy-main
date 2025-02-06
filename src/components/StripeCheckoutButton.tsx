"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  hasDeliveryAddress: boolean;
}

export default function CheckoutButton({ hasDeliveryAddress }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!hasDeliveryAddress) {
      alert('Please add a delivery address in your profile before checking out.');
      router.push('/profile'); // Redirect to profile page
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { sessionId } = await response.json();

      // Redirect to Stripe checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full px-6 mt-3 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-blue-300 transition-colors"
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  );
}