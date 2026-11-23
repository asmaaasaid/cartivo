import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import type { TOrderItem } from "@customTypes/order";
import { readOrder } from "@services/orderStorage";

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const userId = (thunkAPI.getState() as RootState).auth.user?.id;

    if (!userId) {
      return [] as TOrderItem[];
    }

    return readOrder(userId).sort((a, b) => b.id - a.id);
  },
);

export default actGetOrders;
