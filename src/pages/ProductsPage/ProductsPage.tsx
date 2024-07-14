import React, { useEffect, useState } from "react";
import { RootState } from "../../redux/store/store";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { fetchProducts } from "../../redux/api/useApi";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const status = useAppSelector((state: RootState) => state.products.status);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (status === "idle") {
        await dispatch(fetchProducts());
      }
    };

    fetchInitialProducts();
  }, [status, dispatch]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
      </header>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {/* Add category and price filters */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
