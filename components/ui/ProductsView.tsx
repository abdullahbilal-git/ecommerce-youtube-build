import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col w-full space-y-6">
      {/* Filter by Category on top */}
      <div>
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* Product listing below */}
      <div>
        <ProductGrid products={products} />
        <hr className="my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default ProductsView;
