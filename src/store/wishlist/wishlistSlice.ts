import { createSlice } from '@reduxjs/toolkit'
import actLikeToggle from './act/actLikeToggle'
import actGetWishlist from './act/actGetWishlist'
import type { TProduct } from '@customTypes/product'
import type { TLoading } from '@customTypes/shared';
import { isString } from '@customTypes/guards';
import { authLogout } from '@store/auth/authSlice';

interface IWishlist {
    itemsId : number[],
    error : null | string,
    productsFullInfo : TProduct[];
    loading : TLoading
}

const initialState : IWishlist = {
    itemsId: [],
    error: null,
    productsFullInfo: [],
    loading: 'idle'
}
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        wishlistFullInfoCleanUp: (state)=>{
            state.productsFullInfo = []
        },
        wishlistCleanUp: (state)=>{
            state.itemsId = [];
            state.productsFullInfo = [];
        }
    },
    extraReducers: (builder) => {
      // like toggle
      builder.addCase(actLikeToggle.pending, (state) => {
        state.error = null;
      });
      builder.addCase(actLikeToggle.fulfilled, (state, action) => {
        if (action.payload.type === "add") {
          state.itemsId.push(action.payload.id);
        } else {
          state.itemsId = state.itemsId.filter(
            (el) => el !== action.payload.id,
          );
          state.productsFullInfo = state.productsFullInfo.filter(
            (el) => el.id !== action.payload.id,
          );
        }
      });
      builder.addCase(actLikeToggle.rejected, (state, action) => {
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        }
      });

      // wishlist
      builder.addCase(actGetWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
      builder.addCase(actGetWishlist.fulfilled, (state, action) => {
        state.loading = "succeeded";
        if (action.payload.dataType === "productsFullInfo") {
          state.productsFullInfo = action.payload.data as TProduct[];
        } else {
          state.itemsId = action.payload.data as number[];
        }
      });
      builder.addCase(actGetWishlist.rejected, (state, action) => {
        state.loading = "failed";
        if (isString(action.payload)) {
          state.error = action.payload;
        }
      });

      // when logout reset
      builder.addCase(authLogout, (state) => {
        state.itemsId = [];
        state.productsFullInfo = [];
      });
    }
})

export const {wishlistFullInfoCleanUp, wishlistCleanUp} = wishlistSlice.actions
export { actLikeToggle, actGetWishlist }
export default wishlistSlice.reducer