import CategoryList from "@/components/CategoryList";
import Features from "@/components/Features";
import FlashSale from "@/components/FlashSale";
import HeroSection from "@/components/HeroSection";
import ProductList from "@/components/ProductList";
import { fetchCategories, getFlashSale, getForYou } from "@/lib/actions";


export default async function page() {
  const [categoryList, flashSale, forYou] = await Promise.all([
    fetchCategories(),
    getFlashSale(),
    getForYou(),
  ]);

  if (!categoryList || !flashSale || !forYou) {
    return <div>Data not found!</div>;
  }

  return (
    <div>
      <HeroSection />
      {flashSale && <FlashSale flashSale={flashSale} />}
      <CategoryList categories={categoryList} />
      <ProductList products={forYou} title="For You" />
      <Features />
    </div>
  )
}
