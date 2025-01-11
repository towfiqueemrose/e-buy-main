'use client'
import { useFormStatus } from 'react-dom'

export function AddToCartButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-2 rounded-md bg-primary hover:bg-green-600 text-white flex items-center gap-2 ${
        pending ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      {pending ? (
        <>
          <svg 
            className="animate-spin h-5 w-5 text-white" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding to Cart...
        </>
      ) : (
        'ADD TO CART'
      )}
    </button>
  )
}