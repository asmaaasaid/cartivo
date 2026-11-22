import {
  mapProduct,
  type TApiProduct,
  type TProduct,
} from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@services/api";
import type { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";

const actGetProductsByItems = createAsyncThunk(
  "act/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState & {
      cart: { items: Record<string, unknown> };
    };
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return [] as TProduct[];
    }

    try {
      const response = await Promise.allSettled(
        itemsId.map((id) =>
          api.get<TApiProduct>(`/products/${id}`, { signal }),
        ),
      );
      const productsInCart: TProduct[] = [];
      for (const res of response) {
        if (res.status === "fulfilled") {
          productsInCart.push(mapProduct(res.value.data));
        }
      }

      if (productsInCart.length === 0) {
        return rejectWithValue("Could not load your cart items.");
      }
      return productsInCart;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetProductsByItems;
