import { prisma } from '@/lib/client'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('stripe-signature')!
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Get user ID from metadata
      const userId = session.metadata?.userId
      
      if (!userId) {
        throw new Error('No user ID in session metadata')
      }

      // Get cart items
      const cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      })

      if (!cart) {
        throw new Error('No cart found')
      }

      // Calculate totals
      const subtotal = cart.items.reduce(
        (total, item) => total + (item.product.price * item.quantity),
        0
      )
      const shippingFee = 0
      const total = subtotal + shippingFee

      // Create order
      await prisma.order.create({
        data: {
          userId,
          subtotal,
          shippingFee,
          total,
          paymentStatus: 'PAID',
          paymentMethod: 'ONLINE_PAYMENT',
          deliveryAddress: session.customer_details?.address?.line1 || '', // Changed from shipping to customer_details
          items: {
            create: cart.items.map(item => ({
              productId: item.product.id,
              quantity: item.quantity,
              price: item.product.price
            }))
          }
        }
      })
      
      // Clear the cart
      await prisma.cart.delete({
        where: { id: cart.id }
      })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

