import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import ProductsView from "@/components/ui/ProductsView";
import BlackFridayBanner from "@/components/ui/BlackFridayBanner";

export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  console.log(
    crypto.randomUUID().slice(0, 5) +
      `>>> Rendered store page with ${products.length} products and ${categories.length} categories`
  );

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <BlackFridayBanner />
      <ProductsView products={products} categories={categories} />
    </div>
  );
}
