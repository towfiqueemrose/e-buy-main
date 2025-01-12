import { getProductsByCategory } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = (await params);
  const category = await getProductsByCategory(slug);

  if (!category) {
    return <div>Category not found!</div>;
  }

  return (
    <div className="mt-8">
      <h1 className="heading-green">Category: {category.name}</h1>
      <h2 className="text-gray-500 text-md font-semibold mb-8">
        {category.products.length} Products in this category
      </h2>
      <div className="flex flex-wrap my-8 gap-3 rounded-md pr-4 py-0">
      {category.products.map((product) => (
          <ProductCard
          id={product.id}
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}
