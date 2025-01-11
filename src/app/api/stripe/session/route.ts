import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function GET(req: Request) {
  const url = new URL(req.url)
  const sessionId = url.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    )
  }

  try {
    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer'],
    })

    return NextResponse.json(session)
  } catch (error) {
    console.error('Error fetching Stripe session:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session details' },
      { status: 500 }
    )
  }
}
