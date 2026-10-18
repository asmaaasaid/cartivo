import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct }  from '@customTypes/product'
import axiosErrorHandler from "@util/axiosErrorHandler";


type TResponse = TProduct[] 
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (_, thunkAPI) => {
    const {rejectWithValue, fulfillWithValue, signal} = thunkAPI

    try {
        const userWishList = await axios.get<{productId: number}[]>("/wishlist?userId=1")

        if(!userWishList.data.length){
            return fulfillWithValue([])
        }

       const concatenatedItemsId = userWishList.data.map((el)=> `id=${el.productId}`).join("&");

       const response = await axios.get<TResponse>(`/products?${concatenatedItemsId}`, {signal});

       return response.data

    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
  }
)

export default actGetWishlist;