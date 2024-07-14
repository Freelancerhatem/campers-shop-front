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
    // Assuming product is defined somewhere in your component
    if (product.stock > 0) {
      // Dispatch action to add product to Redux store
      dispatch(addToCart(product));

      // Retrieve existing products from localStorage
      const existingProductsJSON = localStorage.getItem("CartProducts");
      let existingProducts: CartItem[] = [];

      // Parse existing products if they exist in localStorage
      if (existingProductsJSON) {
        existingProducts = JSON.parse(existingProductsJSON);
      }

      // Check if the product already exists in localStorage
      const duplicateProduct = existingProducts.find(
        (item) => item._id === product._id
      );

      if (duplicateProduct) {
        alert("This product is already added to your cart.");
      } else {
        // Add the new product to the existing products array
        existingProducts.push(product);
        // Update localStorage with the updated products array
        localStorage.setItem("CartProducts", JSON.stringify(existingProducts));
        alert("Product added to cart!");
        dispatch(addToCart(product));
      }
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
