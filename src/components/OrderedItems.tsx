// components/OrderedItems.tsx
"use client";

import React, { useState } from 'react';
import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { OrderItemProps } from '@/types/types';

const OrderItem = ({ order }: OrderItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Package className="w-6 h-6 text-gray-500" />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-medium text-sm text-gray-700">ID: {order.id}</h3>
                <span className="px-2 py-1 text-sm rounded-full bg-green-100">
                  Processing
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Ordered on {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">
              ${order.total.toFixed(2)}
            </span>
            <button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="border-t p-6">
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <Image
                  height={80}
                  width={80}
                  src={item.product.image || "/api/placeholder/80/80"}
                  alt={item.product.name}
                  className="w-20 h-20 rounded object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-700">{item.product.name}</h4>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <span className="font-medium text-gray-700">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderItem;