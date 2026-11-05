import type { RootState } from "@store/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (id: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState() as RootState;
    const userId = auth.user?.id;

    if (!userId) {
      return rejectWithValue("You must be logged in to update your wishlist.");
    }

    try {
      const isRecordExist = await axios.get(
        `/wishlist?userId=${userId}&productId=${id}`,
      );
      if (isRecordExist.data.length > 0) {
        await axios.delete(`/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id };
      }

      await axios.post("/wishlist", { userId, productId: id });
      return { type: "add", id };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actLikeToggle;