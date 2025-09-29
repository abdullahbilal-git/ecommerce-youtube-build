import ProductGrid from "@/components/ui/ProductGrid";
import searchProductsByName from "@/sanity/lib/products/searchProductsByName";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams; // await the promise
  const q = Array.isArray(params?.q) ? params.q[0] : params?.q ?? "";

  const products = await searchProductsByName(q);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {products.length
            ? `Search results for "${q}"`
            : `No products found for "${q}"`}
        </h1>

        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <p className="text-gray-600 text-center">
            Try searching with different keywords
          </p>
        )}
      </div>
    </div>
  );
}
