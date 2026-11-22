import type { RootState } from '@store/index';
import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import type { TProduct }  from '@customTypes/product'
import axiosErrorHandler from "@util/axiosErrorHandler";
import { readWishlist } from '@services/wishlistStorage';
import getProductsByIds from '@util/getProductsByIds';

type TDataType = "productsFullInfo" | "productIds"

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    // const { auth } = getState() as RootState;
    const userId = (getState() as RootState).auth.user?.id;

    if (!userId) {
        return { data: [], dataType };
      }

      const ids = readWishlist(userId);

      if(dataType === "productIds"){
        return {data: ids, dataType}
      }

      try {
        const products = await getProductsByIds(ids, signal);
        return {data: products, dataType}
      } catch (error) {
         return rejectWithValue(axiosErrorHandler(error));
      }
  },
);

export default actGetWishlist;