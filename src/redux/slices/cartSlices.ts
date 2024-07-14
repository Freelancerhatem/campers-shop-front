import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    _id: string;
    name?: string;
    price?: number;
    quantity?: number;
    stock?: number;
    imageUrl?: string
}
interface CartState {
    items: CartItem[]
}
const initialState: CartState = {
    items: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>) {
            const item = state.items.find((item) => item.id === action.payload.id)
            if (item) {
                if (item.quantity < item.stock) {
                    item.quantity += 1
                }
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        removeCart(state, action: PayloadAction<CartItem>) {
            state.items = state.items.filter(item => item._id !== action.payload._id)
        },
        updateQuantity(state, action: PayloadAction<CartItem>) {
            const item = state.items.find(item => item.id === action.payload.id)
            if (item) {
                item.quantity = action.payload.quantity
            }
        },
        clearCart(state) {
            state.items = []
        }
    }
})
export const { addToCart, removeCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer