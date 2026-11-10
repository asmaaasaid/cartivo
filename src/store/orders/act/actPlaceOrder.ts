import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;

    const { cart, auth } = getState() as RootState;

    const orderItems = cart.productsFullInfo.map((el)=> ({
        id: el.id,
        quantity: cart.items[el.id],
        price: el.price,
        title: el.title,
        img: el.img
    }));

    try{
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItems,
        subtotal
      })
      return res.data;
    } catch (error){
        return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actPlaceOrder;