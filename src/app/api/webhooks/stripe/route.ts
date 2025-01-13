import { prisma } from '@/lib/client';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing stripe signature');
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;
    
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
        { status: 400 }
      );
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (!userId) {
        console.error('No userId found in session metadata');
        return NextResponse.json(
          { error: 'No userId found in session metadata' },
          { status: 400 }
        );
      }

      // Get user's delivery address from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { address: true }
      });

      if (!user?.address) {
        console.error('No delivery address found for user');
        return NextResponse.json(
          { error: 'No delivery address found' },
          { status: 400 }
        );
      }

      try {
        // Retrieve the expanded session with line items and product data
        const expandedSession = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ['line_items.data.price.product']
          }
        );

        const lineItems = expandedSession.line_items?.data || [];
        
        // Calculate totals in cents and convert to dollars
        const subtotalInCents = lineItems.reduce((sum, item) => 
          sum + (item.amount_total || 0), 0);
        const subtotal = Math.round(subtotalInCents / 100);

        // Create order with items
        const order = await prisma.order.create({
          data: {
            userId: userId,
            subtotal: subtotal,
            shippingFee: 0,
            total: subtotal,
            deliveryAddress: user.address,
            orderStatus: 'PENDING',
            paymentStatus: 'PAID',
            paymentMethod: 'ONLINE_PAYMENT',
            items: {
              create: lineItems.map(item => {
                // Get product data from the expanded price object
                const product = (item.price?.product as Stripe.Product);
                const databaseId = product.metadata.databaseId;
                
                if (!databaseId) {
                  throw new Error(`No database ID found in product metadata`);
                }

                return {
                  productId: databaseId,
                  quantity: item.quantity || 0,
                  price: Math.round((item.amount_total || 0) / (item.quantity || 1) / 100)
                };
              })
            }
          },
          include: {
            items: true,
            user: true
          }
        });

        // Clear the user's cart after successful order
        const cart = await prisma.cart.findFirst({
          where: { userId },
          include: { items: true }
        });

        if (cart) {
          await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
          });
        }

        console.log('Order created successfully:', order.id);
        return NextResponse.json({ success: true, orderId: order.id });

      } catch (error) {
        console.error('Error processing order:', error);
        return NextResponse.json(
          { error: 'Failed to process order' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error('Webhook handler failed:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};