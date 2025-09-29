"use client";
import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
  if (!products?.length) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        No products available right now.
      </div>
    );
  }

  return (
    <div className="w-full m-0 p-0"> {/* 🔑 remove all margin/padding */}
      <div className="grid grid-cols-2      /* 2 per row on mobile */
  sm:grid-cols-3   /* 3 per row on tablets */
  md:grid-cols-4   /* 4 per row on desktops */
  lg:grid-cols-5   /* 5 per row on large screens */
  xl:grid-cols-5   /* 6 per row on extra large screens */
  gap-4 mt-6">
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.03 }}
              className="w-full"
            >
              <ProductThumb product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ProductGrid;
