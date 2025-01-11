import { ProductListProps } from "@/types/types";
import ProductCard from "./ProductCard";

export default function ProductList({ title, products }: {title: string, products: ProductListProps[] }) {
  if (!products?.length) {
    return <div>No products found.</div>;
  }
  
  return (
    <div className="my-8 rounded-md p-6 pl-3 ml-3">
      <h1 className="heading-green">{title}</h1>
      <div className="">
        <div className="flex flex-wrap gap-3 items-center p-2">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
