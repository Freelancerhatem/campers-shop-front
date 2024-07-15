import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProductAsync, deleteProductAsync, fetchProducts, updateProductAsync } from "../api/useApi";

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

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const index = state.products.findIndex(product => product._id === action.payload._id);
            if (index !== -1) {
                state.products[index] = action.payload;
            }
        },
        deleteProduct(state, action: PayloadAction<string>) {
            state.products = state.products.filter(product => product._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Unknown error';
            })
            .addCase(addProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProductAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products.push(action.payload);
            })
            .addCase(addProductAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to add product';
            })
            .addCase(updateProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.products.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProductAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to update product';
            })
            .addCase(deleteProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProductAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = state.products.filter((p) => p._id !== action.payload);
            })
            .addCase(deleteProductAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to delete product';
            });
    },
});
export const { addProduct, updateProduct, deleteProduct } = productSlice.actions
export default productSlice.reducer;
