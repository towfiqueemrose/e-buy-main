import ProductList from "@/components/ProductList";
import { getAllProducts } from "@/lib/actions";
import { Suspense } from "react";

export default async function page() {
const allProducts = await getAllProducts();

if (!allProducts) {
  return <div>Products not found!</div>;
}

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
      <ProductList products={allProducts} title="Products" />
      </Suspense>
    </div>
  )
}
