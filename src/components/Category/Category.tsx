import React, { useState } from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { RootState } from "../../redux/store/store";
import { Product } from "../../redux/slices/productSlice";
import ProductCard from "../ProductCard/ProductCard";

const Category: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const categories = ["All", "electronics", "books", "clothing"];

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-4xl text-center font-bold mb-8 text-gray-800">
          Explore Our Products
        </div>
        <div className="flex justify-center mb-8">
          <select
            className="p-3 rounded-lg shadow-lg text-lg border-none focus:outline-none"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((category: string) => (
              <option key={category} value={category} className="text-gray-800">
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-lg text-gray-600 text-center col-span-full">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
