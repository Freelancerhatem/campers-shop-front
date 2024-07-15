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

export const insertAddToCart = createAsyncThunk<CartItem[], CartItem, { rejectValue: string }>(
    'cart/insertAddToCart',
    async (cartItem, thunkAPI) => {
        try {
            const response = await AxiosLoader.post('/api/cart', { cartItem });
            return response.data as CartItem[];
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add item to cart'); // Handle error scenario
        }
    }
);

const addProduct = async (productData: Product) => {
    const response = await AxiosLoader.post('/api/products', productData);
    return response.data;
};

const updateProduct = async (productId: string, productData: Product) => {
    const response = await AxiosLoader.put(`/api/products/${productId}`, productData);
    return response.data;
};

const deleteProduct = async (productId: string) => {
    const response = await AxiosLoader.delete(`/api/products/${productId}`);
    return response.data;
};


export const addProductAsync = createAsyncThunk<Product, Product, { rejectValue: string }>(
    'products/addProduct',
    async (productData, thunkAPI) => {
        try {
            return await addProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to add product');
        }
    }
);

// Update Product Async Thunk
export const updateProductAsync = createAsyncThunk<Product, { productId: string; productData: Product }, { rejectValue: string }>(
    'products/updateProduct',
    async ({ productId, productData }, thunkAPI) => {
        try {
            return await updateProduct(productId, productData);
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to update product');
        }
    }
);

export const deleteProductAsync = createAsyncThunk<string, string, { rejectValue: string }>(
    'products/deleteProduct',
    async (productId, thunkAPI) => {
        try {
            await deleteProduct(productId);
            return productId;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to delete product');
        }
    }
);