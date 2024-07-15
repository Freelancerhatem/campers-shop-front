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
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRangeFilter, setPriceRangeFilter] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (priceRangeFilter.min !== null && priceRangeFilter.max !== null) {
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRangeFilter.min! &&
          product.price <= priceRangeFilter.max!
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredProducts(filtered);
  }, [searchTerm, products, categoryFilter, priceRangeFilter, sortOrder]);

  // Function to handle clear filters
  const clearFilters = () => {
    setCategoryFilter(null);
    setPriceRangeFilter({ min: null, max: null });
    setSearchTerm("");
    setSortOrder("asc");
  };

  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (status === "idle") {
        await dispatch(fetchProducts());
      }
    };

    fetchInitialProducts();
  }, [status, dispatch]);

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
        {/* Category filter */}
        <select
          value={categoryFilter || ""}
          onChange={(e) => setCategoryFilter(e.target.value || null)}
          className="w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">All Categories</option>
          {/* Replace with actual categories */}
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        {/* Price range filter */}
        <input
          type="number"
          placeholder="Min Price"
          value={priceRangeFilter.min ?? ""}
          onChange={(e) =>
            setPriceRangeFilter({
              ...priceRangeFilter,
              min: e.target.value !== "" ? parseInt(e.target.value) : null,
            })
          }
          className="w-24 ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceRangeFilter.max ?? ""}
          onChange={(e) =>
            setPriceRangeFilter({
              ...priceRangeFilter,
              max: e.target.value !== "" ? parseInt(e.target.value) : null,
            })
          }
          className="w-24 ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="ml-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="asc">Price Low to High</option>
          <option value="desc">Price High to Low</option>
        </select>
        {/* Clear filters button */}
        <button
          onClick={clearFilters}
          className="ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Clear Filters
        </button>
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
