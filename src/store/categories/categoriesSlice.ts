import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import type { TLoading } from "@customTypes/shared";
import type { TCategory } from "@customTypes/category";
import { isString } from "@customTypes/guards";

interface ICategoriesState  {
    records: TCategory[],
    loading: TLoading,
    error: string | null
}
const initialState : ICategoriesState = {
    records: [],
    loading: "idle",
    error: null,
}
const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        categoriesFullInfoCleanUp: (state)=>{
            state.records= []
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(actGetCategories.pending, (state)=>{
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetCategories.fulfilled, (state, action)=>{
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetCategories.rejected, (state, action)=>{
            state.loading = "failed";
            if(isString(action.payload)){
               state.error = action.payload 
            }
            
        })
    }
})

export {actGetCategories}
export const {categoriesFullInfoCleanUp} = categoriesSlice.actions
export default categoriesSlice.reducer