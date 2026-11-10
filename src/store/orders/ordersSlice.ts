import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@customTypes/shared";
import type { TOrderItem } from "@customTypes/order";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
import { isString } from "@customTypes/guards";

interface IOrderSlice {
  loading: TLoading;
  error: string | null;
  orderList: TOrderItem[];
}

const initialState: IOrderSlice = {
  loading: "idle",
  error: null,
  orderList: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetOrderStatus : (state)=>{
      state.loading = 'idle',
      state.error = null
    }
  },
  extraReducers: (builder) => {
    // place order
    builder.addCase(actPlaceOrder.pending, (state) => {
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // get orders
    builder.addCase(actGetOrders.pending, (state) => {
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export {actPlaceOrder, actGetOrders}
export const {resetOrderStatus} = orderSlice.actions
export default orderSlice.reducer;
