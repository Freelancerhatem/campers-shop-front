import React from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { addToCart, CartItem } from "../../redux/slices/cartSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state: RootState) =>
    state.products.products.find((product) => product._id === id)
  );

  if (!product) {
    return (
      <div className="text-center text-gray-800 py-4">Product not found</div>
    );
  }

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(addToCart(product));

      // Retrieve cart products from localStorage
      const storedProductsString = localStorage.getItem("CartProducts");

      if (storedProductsString !== null) {
        // Parse the JSON string to get the array of products
        const localProducts = JSON.parse(storedProductsString);

        // Check for duplicates based on product _id
        const checkDuplicate = localProducts.some(
          (item: CartItem) => item._id === product._id
        );

        if (!checkDuplicate) {
          // Add the product to localProducts array
          localProducts.push(product);

          // Store updated cart products back to localStorage
          localStorage.setItem("CartProducts", JSON.stringify(localProducts));
        } else {
          // Handle duplicate product scenario, if needed
          console.log("Product is already in cart");
        }
      } else {
        // Handle case where 'CartProducts' is not found in localStorage
        console.log("No products found in cart");
      }
    } else {
      // Handle out of stock scenario, if needed
      console.log("Product is out of stock");
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
                className={`bg-red-500 text-white py-3 px-6 rounded-lg font-semibold uppercase ${
                  product.stock > 0
                    ? "hover:bg-red-600"
                    : "cursor-not-allowed opacity-50"
                }`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
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
