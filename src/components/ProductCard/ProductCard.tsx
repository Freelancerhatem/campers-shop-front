import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../redux/slices/productSlice";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
      <img
        className="w-full h-64 object-cover object-center"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold">{product.name}</h2>
        <p className="mt-2 text-gray-600">${product.price.toFixed(2)}</p>
        <Link
          to={`/products/${product._id}`}
          className="block bg-gray-800 text-white text-center font-semibold py-2 px-4 mt-4 rounded-md hover:bg-gray-700 transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
