import Image from 'next/image';
import Link from 'next/link';
import { ProductCardTypes } from '@/types/types';

export default function ProductCard({ id, name, price, image }: ProductCardTypes) {
  return (
    <Link
      href={`/products/${id}`}
      className="border hover:scale-105 border-primary bg-white rounded-lg h-[250px] w-[180px] flex-shrink-0"
    >
      {/* Product Image */}
      <div className="flex justify-center">
        <Image
          src={image || '/product.jpeg'}
          alt=""
          width={178}
          height={178}
          className="rounded-t-md"
        />
      </div>

      {/* Product Details */}
      <div className="p-2 pt-0">
        <h1 className="text-primary text-md font-semibold text-center">
          {name}
        </h1>

        {/* Price and Free Shipping */}
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-gray-600 font-bold text-md">${price}</h1>
          <div className="flex items-center gap-1">
            <Image src="/truck.svg" alt="Free Shipping" width={15} height={15} />
            <span className="text-primary text-sm">Free Shipping</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
