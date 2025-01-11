
import CartItem from '@/components/CartItem'
import { getCartItems } from '@/lib/actions'
import { redirect } from 'next/navigation'
import { auth } from '../auth'
import CheckoutButton from '@/components/StripeCheckoutButton'

export default async function CartPage() {
  const session = await auth()
  
  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const cartResult = await getCartItems(session.user.id)

  if ('error' in cartResult) {
    return (
      <div className="container mx-auto p-4">
        <div className="p-4 text-red-600">
          Error: {cartResult.error}
        </div>
      </div>
    )
  }

  if (cartResult.items.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="p-4 text-gray-600">Your cart is empty</div>
      </div>
    )
  }

  const subtotal = cartResult.items.reduce(
    (total, item) => total + (item.product.price * item.quantity),
    0
  )

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="heading-green text-center mb-6">Shopping Cart</h1>
      <div className="space-y-4">
      {cartResult.items.map((item) => (
  <CartItem
    key={item.id}
    id={item.id}
    productId={item.product.id}
    productName={item.product.name}
    productImage={item.product.image}
    price={item.product.price}
    initialQuantity={item.quantity}
  />
))}
      </div>
      
      {/* Cart Summary */}
      <div className="mt-6 max-w-2xl text-white mx-auto p-4 bg-primary rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Subtotal:</span>
          <span className="font-bold">${subtotal.toLocaleString()}</span>
        </div>
        <CheckoutButton />
      </div>
    </div>
  )
}