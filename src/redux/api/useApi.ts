import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../slices/productSlice";
import { RootState } from "../store/store";
import axios from "axios";

export const fetchProducts: AsyncThunk<Product[], void, { state: RootState }> = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        return response.data.data;
    }
);