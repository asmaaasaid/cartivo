import type { RootState } from '@store/index';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct }  from '@customTypes/product'
import axiosErrorHandler from "@util/axiosErrorHandler";

type TDataType = "productsFullInfo" | "productIds"
type TResponse = TProduct[] 
const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      const userWishList = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`,
        { signal },
      );

      if (!userWishList.data.length) {
        return { data: [], dataType };
      }

      if (dataType === "productIds") {
        const concatenatedItemsId = userWishList.data.map(
          (el) => el.productId,
        );
        return { data: concatenatedItemsId, dataType };
      } else {
        const concatenatedItemsId = userWishList.data
        .map((el) => `id=${el.productId}`)
        .join("&");

      const response = await axios.get<TResponse>(
        `/products?${concatenatedItemsId}`,
        { signal },
      );

        return { data: response.data, dataType };
      }
      
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetWishlist;