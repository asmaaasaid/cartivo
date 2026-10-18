import type { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios  from "axios";

type TResponse = TProduct[]
const actGetProductsByItems = createAsyncThunk(
  "act/actGetProductsByItems",
  async (_, thunkAPI) => {
    const {rejectWithValue, fulfillWithValue, getState , signal} = thunkAPI;
    const {cart} = getState() as RootState;
    const itemsId = Object.keys(cart.items);
    
    if(!itemsId.length){
        return fulfillWithValue([])
    }
    
    try {
      const concatanatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concatanatedItemsId}`,
        {signal}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error))
    }
        
  },
);

export default actGetProductsByItems