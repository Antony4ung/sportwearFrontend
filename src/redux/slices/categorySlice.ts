import { Category } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
// Define a type for the slice state
interface CategoryState {
  categories: null | Category[];
  error: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: CategoryState = {
  categories: null,
  error: null,
  loading: false,
};

export const CategorySlice = createSlice({
  name: "Categories",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    CategoryReq: (state) => {
      state.loading = true;
    },
    CategorySuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
    },
    CategoryFail: (state, action) => {
      state.error = action.payload.error.message;
    },
  },
});

export const { CategoryReq, CategorySuccess, CategoryFail } =
  CategorySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategory = (state: RootState) =>
  state.CategoryRed.categories;

export default CategorySlice.reducer;
