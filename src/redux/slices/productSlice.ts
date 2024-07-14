import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../api/useApi";

export interface Product {
    _id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    description: string;
    imageUrl: string;
}

interface ProductState {
    products: Product[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    status: 'idle',
    error: null
};

// Define fetchProducts as an async thunk


const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        // Optional: Add reducers for additional functionality
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null; // Reset error when starting to fetch
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.error = null; // Reset error upon successful fetch
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            });
    },
});

export default productSlice.reducer;
