import type { TOrderItem } from "@customTypes/order";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { readOrder, writeOrder } from "@services/orderStorage";
import type { RootState } from "@store/index";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subtotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;
    const userId = auth.user?.id;

    if (!userId) {
      return rejectWithValue("You must be logged in to place an order.");
    }

    const orderItems = cart.productsFullInfo.map((el) => ({
      id: el.id,
      quantity: cart.items[el.id],
      price: el.price,
      title: el.title,
      img: el.img,
    }));

    if (orderItems.length === 0) {
      return rejectWithValue("your cart is empty");
    }

    const orders = readOrder(userId);
    const nextId = orders.reduce((max, o) => Math.max(max, o.id), 0) + 1;

    const order: TOrderItem = {
      id: nextId,
      userId,
      items: orderItems,
      subtotal,
      createdAt: new Date().toISOString(),
    };

    writeOrder(userId, [...orders, order]);
    return order;
  },
);

export default actPlaceOrder;
