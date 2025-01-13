"use client"
import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { OrderItemProps } from '@/types/types';
import { formatDate, formatPrice } from '@/lib/utils';

const OrderItem = ({ order }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Hardcoded status with specific colors
  const getOrderStatus = () => {
    return {
      text: 'Processing',  // Hardcoded status text
      className: 'bg-green-100 text-green-800 text-xs py-1 px-2 rounded-full' // Hardcoded color
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Package className="w-6 h-6 text-gray-500" />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-gray-700">Order #{order.id.slice(-8)}</h3>
                <span className={getOrderStatus().className}>
                  {getOrderStatus().text}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Ordered on {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">
              {formatPrice(order.total)}
            </span>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isExpanded ? 
                <ChevronUp className="w-5 h-5" /> : 
                <ChevronDown className="w-5 h-5" />
              }
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t p-6">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative w-20 h-20">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded bg-gray-100"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-700">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-700">
                    {formatPrice(item.price)}
                  </span>
                  <p className="text-sm text-gray-500">
                    {formatPrice(item.price / item.quantity)} each
                  </p>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-700">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-700">{formatPrice(order.shippingFee)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;