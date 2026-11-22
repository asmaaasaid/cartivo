import type { TProduct } from "@customTypes/product";
import { createSlice } from "@reduxjs/toolkit";
import { getCartTotalQuantitySelector } from "./selectors";
import actGetProductsByItems from "./act/actGetProductsByItems";
import type { TLoading } from "@customTypes/shared";
import { isString } from "@customTypes/guards";
import { actAuthLogin, authLogout } from "@store/auth/authSlice";

type TItems = { [key: string]: number };

interface IcartState {
  items: TItems;
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
  ownerId: string | null;
  savedCarts: { [userId: string]: TItems };
}
const initialState: IcartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
  ownerId: null,
  savedCarts: {},
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },
    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload.id];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload.id,
      );
    },
    cartFullInfoCleanUp: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      ((state.items = {}), (state.productsFullInfo = []));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      ((state.loading = "pending"), (state.error = null));
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      ((state.loading = "succeeded"),
        (state.productsFullInfo = action.payload));
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // login: merge all products user&visitor
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      const userId = String(action.payload.user.id);
      const merged: TItems = { ...(state.savedCarts[userId] ?? {}) };

      for (const [id, qty] of Object.entries(state.items)) {
        merged[id] = Math.max(merged[id] ?? 0, qty);
      }

      state.items = merged;
      state.ownerId = userId;
      delete state.savedCarts[userId];
    });

    // logout: delete cart items
    builder.addCase(authLogout, (state) => {
      if (state.ownerId) {
        state.savedCarts[state.ownerId] = { ...state.items };
      }
      state.items = {};
      state.ownerId = null;
      state.productsFullInfo = [];
    });
  },
});

export { getCartTotalQuantitySelector, actGetProductsByItems };
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cartFullInfoCleanUp,
  clearCartAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
