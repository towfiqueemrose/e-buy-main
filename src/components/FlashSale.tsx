import { FlashSaleTypes } from "@/types/types";
import FlashSaleProductCard from "./FlashSaleProductCard";

export default function FlashSale({ flashSale}:{flashSale: FlashSaleTypes[]}) {
    return (
        <div className="bg-green-100 my-8 border-green-200 shadow-lg rounded-md p-6">
            <h1 className="text-4xl font-bold animate-colorChange mb-6">
                Flash Sale
            </h1>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-[#8bc249] scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                <div className="flex flex-row gap-4 pb-4">
                    {flashSale.map((product, index) => (
                        <FlashSaleProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}