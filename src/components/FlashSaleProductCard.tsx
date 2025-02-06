import { FlashSaleProductTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function FlashSaleProductCard({ product }: { product: FlashSaleProductTypes }) {
    return (
        <Link href={`/products/${product.id}`} className="border hover:scale-105 transition-transform border-primary bg-white rounded-lg h-[220px] w-[150px] flex-shrink-0 m-1 mt-2">
            <div className="flex justify-center">
                <Image
                    src={product.image || ''}
                    alt={product.name}
                    width={145}
                    height={145}
                    className="rounded-t-md"
                />
            </div>
            <div className="p-2">
                <h1 className="text-primary text-lg font-bold text-center">{product.name}</h1>
                <div className="flex justify-evenly">
                    <h1 className="text-gray-600 font-bold text-md mr-10">$ {product.price}</h1>
                    <del className="text-red-600 font-semibold text-sm">$ {product.oldPrice}</del>
                </div>
            </div>
        </Link>
    )
}
