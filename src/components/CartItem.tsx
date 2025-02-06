"use client"

import { removeFromCart, updateCartItemQuantity } from '@/lib/actions';
import { CartItemProps } from '@/types/types';
import { Trash2, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const CartItem = ({ 
  id, 
  productId,
  productName, 
  productImage, 
  price, 
  initialQuantity 
}: CartItemProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await updateCartItemQuantity(id, newQuantity);
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await updateCartItemQuantity(id, newQuantity);
    }
  };

  const handleRemove = async () => {
    await removeFromCart(id);
  };

  return (
    <div className="max-w-2xl mx-auto flex items-center justify-between rounded-lg p-4 bg-white">
      <div className="flex items-center space-x-4">
        <Image
          src={productImage}
          width={50}
          height={50}
          alt={productName}
          className="object-cover"
        />
        <Link href={`/products/${productId}`} className="text-base font-medium">
          {productName}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-orange-500 text-base font-medium">${price}</span>

        <div className="flex items-center space-x-1">
          <button 
            onClick={handleDecrement}
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center">{quantity}</span>
          <button 
            onClick={handleIncrement}
            className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-md"
          >
            <Plus size={14} />
          </button>
        </div>

        <button 
          onClick={handleRemove}
          className="p-1 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;