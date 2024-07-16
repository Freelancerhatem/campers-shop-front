import React, { useEffect, useState } from "react";
import {
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import ProductFormModal from "../../components/ProductFormModal/ProductFormModal";
import { RootState } from "../../redux/store/store";
import { Product } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { deleteProductAsync, fetchProducts } from "../../redux/api/useApi";

const ProductManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );

  const status = useAppSelector((state: RootState) => state.products.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const handleCreate = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAsync(id));
    }
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleCreate}
      >
        Create New Product
      </button>
      <div className="-mx-4 sm:mx-0">
        {" "}
        {/* Responsive container for horizontal scroll on small screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="border px-4 py-2">Image</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.price} USD</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(product._id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <ProductFormModal
          product={currentProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductManagementPage;
