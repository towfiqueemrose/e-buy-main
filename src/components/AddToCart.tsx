import Link from 'next/link'
import { addToCart } from '@/lib/actions'
import { revalidatePath } from 'next/cache'
import { AddToCartButton } from './AddToCartLoading'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default function AddToCart({ 
  productId, 
  isAdded 
}: { 
  productId: string, 
  isAdded: boolean 
}) {
  // Show "View Cart" button if item is already in cart  
  if (isAdded) {
    return (
      <div className="mb-4">
        <Link 
          href="/cart"
          className="px-6 py-2 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white"
        >
          VIEW CART
        </Link>
      </div>
    )
  }

  // Server action to add item to cart
  async function addToCartAction() {
    'use server'
    
    // Check authentication here instead
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/auth/signin");
    }
    
    await addToCart(productId)
    revalidatePath('/products/[id]')
  }
  
  // Show "Add to Cart" button for non-added items
  return (
    <div className="mb-4">
      <form action={addToCartAction}>
        <AddToCartButton />
      </form>
    </div>
  )
}
