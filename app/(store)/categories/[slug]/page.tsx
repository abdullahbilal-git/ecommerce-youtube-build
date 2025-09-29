/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import ProductsView from "@/components/ui/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
};

const CategoryPage = ({ slug }: Props) => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const prods = await getProductsByCategory(slug);
      const cats = await getAllCategories();
      setProducts(prods);
      setCategories(cats);
    };
    fetchData();
  }, [slug]);

  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb text-center">
          {slug
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
};

export default CategoryPage;
