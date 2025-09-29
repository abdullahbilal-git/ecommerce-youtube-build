"use client";

import { useBasketStore } from "@/app/(store)/stores";
import { Product } from "@/sanity.types";
import { useEffect, useState } from "react";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

function AddToBasketButton({ product, disabled }: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // render a skeleton so SSR/CSR markup matches
    return (
      <div className="flex items-center space-x-2">
        <span className="w-8 h-8 bg-gray-100 rounded-full"></span>
        <span className="w-8 text-center font-semibold">0</span>
        <span className="w-8 h-8 bg-gray-100 rounded-full"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Minus button */}
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? "bg-gray-100 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${
            itemCount === 0 ? "text-gray-400" : "text-gray-600"
          }`}
        >
          -
        </span>
      </button>

      {/* Count */}
      <span className="w-8 text-center font-semibold">{itemCount}</span>

      {/* Plus button */}
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          disabled ? "bg-gray-300 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"
        }`}
        disabled={disabled}
      >
        <span className="text-xl font-bold text-white">+</span>
      </button>
    </div>
  );
}

export default AddToBasketButton;
