import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { addToCart, CartItem } from "../../redux/slices/cartSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { fetchProducts } from "../../redux/api/useApi";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // Fetch products and status from Redux store
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  const status = useAppSelector((state: RootState) => state.products.status);

  // State to track local storage quantity
  const [localStorageQuantity, setLocalStorageQuantity] = useState<number>(0);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchInitialProducts = async () => {
      if (status === "idle") {
        await dispatch(fetchProducts());
      }
    };

    fetchInitialProducts();
  }, [status, dispatch]);

  // Find the product by id from Redux store
  const product = products.find((product) => product._id === id);

  useEffect(() => {
    // Fetch existing products from localStorage
    const existingProductsJSON = localStorage.getItem("CartProducts");
    if (existingProductsJSON && product) {
      const existingProducts: CartItem[] = JSON.parse(existingProductsJSON);
      // Calculate total quantity of this product in localStorage
      const quantityInCart = existingProducts.reduce((total, item) => {
        if (item._id === product._id) {
          return total + item.quantity!;
        } else {
          return total;
        }
      }, 0);
      setLocalStorageQuantity(quantityInCart);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center text-gray-800 py-4">Product not found</div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock > 0 && localStorageQuantity < product.stock) {
      dispatch(addToCart(product));
      console.log("Product added to cart!");
    } else if (localStorageQuantity >= product.stock) {
      alert("You have reached the maximum quantity for this product.");
    } else {
      alert("Product is out of stock.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                ${product.price.toFixed(2)} USD
              </p>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <button
                className={`bg-red-500 disabled:cursor-not-allowed disabled:bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold uppercase ${
                  product.stock > 0
                    ? "hover:bg-red-600"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={handleAddToCart}
                disabled={
                  product.stock === 0 || localStorageQuantity >= product.stock
                }
              >
                {product.stock === 0 || localStorageQuantity >= product.stock
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link to="/products" className="text-gray-600 hover:text-gray-800">
            &larr; Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
