import AddToCart from "@/components/AddToCart";
import { getSingleProduct, isInCart } from "@/lib/actions";
import Image from "next/image";

const ProductDisplay = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);
  const isProductInCart = await isInCart(id);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  const details = product.moreDetails
    ? product.moreDetails.split(',').map(item => item.trim()).filter(Boolean)
    : [];

  const midIndex = Math.ceil(details.length / 2);
  const firstColumn = details.slice(0, midIndex);
  const secondColumn = details.slice(midIndex);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-6xl mt-6 w-full p-6 px-10 bg-white rounded-lg shadow-sm">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Image Container */}
          <div className="flex justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={350}
              height={350}
              className="max-w-[350px] w-full h-auto object-contain"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4 mt-6">
            <h1 className="heading-green">{product.name}</h1>
            <h2 className="text-base font-semibold">Quantity: {product.quantity}</h2>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">${product.price}</h3>
              <span className="text-gray-500">+ Free Shipping</span>
            </div>
            <p className="text-gray-600">
              {product.details}
            </p>
            <div className="flex gap-2 md:mb-4">
              <h1>Free delevery</h1>
              <Image src="/truck.svg" alt="Free Delivery" width={25} height={25} />
            </div>
            <AddToCart productId={product.id} isAdded={isProductInCart} />
          </div>
        </div>
        <div>
          <h1 className="heading-green my-4">{product.name} Details</h1>
          {product.moreDetails && (
            <div className="grid md:grid-cols-2 gap-x-8">
              <ul className="list-disc pl-5 space-y-1">
                {firstColumn.map((detail, index) => (
                  <li key={index} className="text-gray-700">
                    {detail}
                  </li>
                ))}
              </ul>
              <ul className="list-disc pl-5 space-y-1">
                {secondColumn.map((detail, index) => (
                  <li key={index} className="text-gray-700">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;