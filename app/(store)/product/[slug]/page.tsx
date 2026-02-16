'use client'; // make this a client component

import AddToBasketButton from "@/components/ui/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/sanity.types";

type ProductPageProps = {
  params: { slug: string };
};

const ProductPage = ({ params }: ProductPageProps) => {
  const { slug } = params;

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      // fetch a mock product locally to avoid Sanity
      const prod = {
        _id: "mock-id", // Added required field
        _type: "product" as const, // Added required field
        _createdAt: new Date().toISOString(),
        _updatedAt: new Date().toISOString(),
        _rev: "mock-rev",
        name: "Demo Product",
        price: 19.99,
        stock: 5,
        description: [{
          _type: "block" as const,
          _key: "block-1",
          style: "normal" as const,
          children: [{ _type: "span", _key: "span-1", text: "This is a demo product." }]
        }],
        image: undefined,
      };
      setProduct(prod as unknown as Product);
    };
    fetchProduct();
  }, [slug]);

  if (!product) return <p>Loading...</p>;

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : ""
            }`}
        >
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-xl font-semibold mb-4">£{product.price?.toFixed(2)}</div>
            <div className="prose max-w-none mb-6">
              {Array.isArray(product.description) && <PortableText value={product.description} />}
            </div>
          </div>

          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
