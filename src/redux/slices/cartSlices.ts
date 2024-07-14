import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { insertAddToCart } from "../api/useApi";

export interface CartItem {
    _id: string;
    name?: string;
    price?: number;
    quantity?: number;
    stock?: number;
    imageUrl?: string;
}

interface CartState {
    items: CartItem[];
}

// Load initial state from local storage if available
const initialState: CartState = {
    items: JSON.parse(localStorage.getItem("CartProducts") || "[]"),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = state.items.find((item) => item._id === action.payload._id);
            if (item) {
                if (item.quantity! < item.stock!) {
                    item.quantity! += 1;
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }

            localStorage.setItem("CartProducts", JSON.stringify(state.items));
        },
        removeCart(state, action: PayloadAction<CartItem>) {
            state.items = state.items.filter(item => item._id !== action.payload._id);

            localStorage.setItem("CartProducts", JSON.stringify(state.items));
        },
        updateQuantity(state, action: PayloadAction<CartItem>) {
            const item = state.items.find(item => item._id === action.payload._id);
            if (item) {
                item.quantity = action.payload.quantity;

                localStorage.setItem("CartProducts", JSON.stringify(state.items));
            }
        },
        clearCart(state) {
            state.items = [];

            localStorage.removeItem("CartProducts");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertAddToCart.pending, (state) => {
                state.items = [];

            })
            .addCase(insertAddToCart.fulfilled, (state, action) => {
                state.items = action.payload;

            })
            .addCase(insertAddToCart.rejected, (state) => {
                state.items = [];

            });
    }
});

export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
