import React, { useState } from "react";
import { RootState } from "../../redux/store/store";
import { clearCart } from "../../redux/slices/cartSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { insertAddToCart } from "../../redux/api/useApi";

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "stripe", // Default payment method
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    dispatch(insertAddToCart(cartItems))
      .unwrap()
      .then((/* fulfilled action */) => {
        // Optionally handle success, e.g., show success message
        console.log("Item added to cart successfully:", cartItems);
      })
      .catch((error) => {
        // Handle any errors that occurred during the process
        console.error("Failed to add item to cart:", error);
        // Optionally display error message to user
        alert("Failed to add item to cart. Please try again.");
      });
    // Handle order placement logic
    dispatch(clearCart());
    alert("Order placed successfully!");
  };

  const calculateTotal = () => {
    if (Array.isArray(cartItems)) {
      return cartItems.reduce((accumulator, item) => {
        return accumulator + item.price! * (item.quantity! || 1);
      }, 0);
    } else {
      return 0; // Or handle differently based on your application logic
    }
  };

  return (
    <div className="checkout-page max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="john.doe@example.com"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Phone:</span>
              <input
                type="tel"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="(123) 456-7890"
              />
            </label>
          </div>
          <div>
            <label className="block mb-2">
              <span className="text-gray-700">Address:</span>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="123 Main St, City, Country"
              />
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold">Payment Method:</p>
          <div className="flex space-x-4 items-center">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={userDetails.paymentMethod === "stripe"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>Stripe</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={userDetails.paymentMethod === "cod"}
                onChange={handleChange}
                className="form-radio"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </p>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
