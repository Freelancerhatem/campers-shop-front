import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../slices/productSlice";
import { RootState } from "../store/store";
import AxiosLoader from "../../Hooks/useAxios";
import { CartItem } from "../slices/cartSlices";

export const fetchProducts: AsyncThunk<Product[], void, { state: RootState }> = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await AxiosLoader.get('/api/products');
        return response.data.data;
    }
);

// export const insertAddToCart: AsyncThunk<CartItem[], void, { state: RootState }> = createAsyncThunk(
//     'insertCart',
//     async (data) => {
//         const res = await AxiosLoader.post('/api/cart', data)
//         return res.data
//     }
// )

export const insertAddToCart = createAsyncThunk<CartItem[], CartItem>(
    'cart/insertAddToCart',
    async (cartItem: CartItem) => {

        const response = await AxiosLoader.post('/api/cart', cartItem);
        return response.data as CartItem[];

    }
);