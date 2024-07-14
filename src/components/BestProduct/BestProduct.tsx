import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { RootState } from "../../redux/store/store";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../redux/api/useApi";

const BestProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const status = useAppSelector((state: RootState) => state.products.status);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (status === "idle") {
        await dispatch(fetchProducts());
      }
    };

    fetchInitialProducts();
  }, [status, dispatch]);

  return (
    <section className="best-sellers py-10 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Best Selling Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="bg-green-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-600"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestProduct;
