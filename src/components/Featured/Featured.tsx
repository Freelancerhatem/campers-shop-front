import React from "react";
import { useAppSelector } from "../../redux/store/hooks";
import { RootState } from "../../redux/store/store";
import { Product } from "../../redux/slices/productSlice";

const Featured: React.FC = () => {
  const featuredProducts = useAppSelector(
    (state: RootState) => state.products.products
  );

  return (
    <div className="bg-white py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product: Product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-500 mb-4">${product.price}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => console.log(`View details for ${product.name}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
