import React, { useState } from "react";
import { RootState } from "../../redux/store/store";
import { clearCart } from "../../redux/slices/cartSlices";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic
    dispatch(clearCart());
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity!,
    0
  );

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleChange}
          />
        </label>
        <div className="payment-methods">
          <label>
            <input type="radio" name="paymentMethod" value="cod" /> Cash on
            Delivery
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="stripe" /> Stripe
          </label>
        </div>
        <div className="total">
          <p>Total: {totalAmount} USD</p>
          <button type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
