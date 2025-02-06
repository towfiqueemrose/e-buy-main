import { CategoryTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface CategoryListProps {
  categories: CategoryTypes[]; // Expect an array of CategoryTypes
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="mb-6 pl-4">
      <h1 className="heading-green">Categories</h1>
      <div className="flex flex-wrap mt-2">
        {categories.map((category) => (
          <div key={category.id} className="h-30 w-30 hover:scale-105 transition-transform">
            <Link
              href={`/category/${category.slug}`}
              className="flex flex-col items-center gap-2 m-4"
            >
              <Image
                src={category.image || ""}
                alt={category.name}
                width={70}
                height={70}
                className="rounded-full ring-4 ring-primary"
              />
              <h1 className="font-semibold text-lg text-primary">
                {category.name}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
