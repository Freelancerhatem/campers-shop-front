import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../redux/slices/productSlice";
import ReactImageMagnify from "react-image-magnify";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
      <div className="relative">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: product.name!,
              isFluidWidth: true,
              src: product.imageUrl!,
            },
            largeImage: {
              src: product.imageUrl!,
              width: 1200, // Adjust based on your large image dimensions
              height: 1800, // Adjust based on your large image dimensions
            },
            enlargedImagePosition: "over",
            enlargedImageContainerDimensions: {
              width: "200%", // Adjust as needed
              height: "200%", // Adjust as needed
            },
            imageClassName: "w-full h-64 object-cover object-center",
          }}
        />
      </div>
      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold">{product.name}</h2>
        <p className="mt-2 text-gray-600">${product.price!.toFixed(2)}</p>
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
