import type { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@services/api";
import axiosErrorHandler from "@util/axiosErrorHandler";



type TApiCategory = {slug: string, name: string, url: string};
type TProductThumb = {category: string, thumbnail: string};

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        api.get<TApiCategory[]>("/products/categories", {signal}),
        api.get<{products: TProductThumb[]}>("/products", {params: {limit:0, select: "category,thumbnail"}, signal})
      ]);

      const firstImageForEachCategory : Record<string, string> = {};
      for (const product of productsRes.data.products) {
        if (!firstImageForEachCategory[product.category])
          firstImageForEachCategory[product.category] = product.thumbnail;
      }

      const categories : TCategory[] = categoriesRes.data.map((category)=>({
        
        title: category.name,
        prefix: category.slug,
        img: firstImageForEachCategory[category.slug] ?? "",
      }));
      return categories
    } catch (error) {
       return rejectWithValue(axiosErrorHandler(error))
    }
  },
);
export default actGetCategories;
