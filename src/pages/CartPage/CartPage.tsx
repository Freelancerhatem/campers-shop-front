import React from "react";
import { RootState } from "../../redux/store/store";
import {
  CartItem,
  removeCart,
  updateQuantity,
} from "../../redux/slices/cartSlices";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { ShoppingCartIcon } from "@heroicons/react/outline"; // Importing an example icon

const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (_id: string, quantity: number) => {
    dispatch(updateQuantity({ _id, quantity }));
  };

  const handleRemove = (item: CartItem) => {
    const localProductsJSON = localStorage.getItem("CartProducts");
    if (localProductsJSON) {
      let localProducts: CartItem[] = JSON.parse(localProductsJSON);
      localProducts = localProducts.filter((prod) => prod._id !== item._id);
      localStorage.setItem("CartProducts", JSON.stringify(localProducts));
    }

    dispatch(removeCart(item));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price! * item.quantity!,
    0
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <ShoppingCartIcon className="h-24 w-24 text-gray-400 mx-auto" />
              <p className="text-gray-600 mt-4">Your cart is empty.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item._id} className="flex p-4">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">
                        ${item.price!.toFixed(2)} USD
                      </p>
                      <div className="flex items-center mt-2">
                        <input
                          type="number"
                          className="w-20 px-2 py-1 border border-gray-300 rounded"
                          value={item.quantity ? item.quantity : 1}
                          min="1"
                          max={item.stock}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              Number(e.target.value)
                            )
                          }
                        />
                        <button
                          className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                          onClick={() => handleRemove(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Total:</h2>
                <p className="text-lg font-semibold">
                  ${totalAmount.toFixed(2)} USD
                </p>
              </div>
              <Link
                to={"/checkout"}
                className="bg-green-500 text-white py-2 px-6 rounded-md font-semibold hover:bg-green-600"
              >
                Place Order
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
