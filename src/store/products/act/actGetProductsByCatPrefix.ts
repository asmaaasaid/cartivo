import { mapProduct, type TApiProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@services/api";
import axiosErrorHandler from "@util/axiosErrorHandler";

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const response = await api.get<{ products: TApiProduct[] }>(
        `/products/category/${prefix}`,
        {
          params: { limit: 0 },
          signal,
        },
      );
      return response.data.products.map(mapProduct);
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
export default actGetProductsByCatPrefix;
