'use client'

import { loadStripe } from '@stripe/stripe-js'
import { useState } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()

      if (data.error) {
        console.error('Error:', data.error)
        return
      }

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const result = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

      if (result.error) {
        console.error('Stripe redirect error:', result.error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
    >
      {loading ? 'Processing...' : 'Checkout'}
    </button>
  )
}