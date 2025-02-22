import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../redux/slices/productSlice";
import {
  addProductAsync,
  fetchProducts,
  fetchProductsAsync,
  updateProductAsync,
} from "../../redux/api/useApi";

interface ProductFormModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  product,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    _id: product?._id || "",
    name: product?.name || "",
    price: product?.price || 0,
    category: product?.category || "", // Default value is empty string
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    stock: product?.stock || 0,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (product) {
        await dispatch(
          updateProductAsync({ productId: formData._id, productData: formData })
        );
      } else {
        await dispatch(addProductAsync(formData));
      }
      // After update or add, fetch the updated products
      await dispatch(fetchProducts());
      onClose();
    } catch (error) {
      console.error("Error:", error);
      // Handle error state or feedback to the user
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full sm:max-w-lg">
        <h2 className="text-2xl mb-4">
          {product ? "Edit Product" : "Create Product"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Cloth</option>
              <option value="books">Book</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {product ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
