import { productType } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
// Define a type for the slice state
interface HomeProductsState {
  products: null | productType[];
  totalPages:number;
  error: string | null;
  loading: boolean;
}

// Define the initial state using that type
const initialState: HomeProductsState = {
  products: null,
  error: null,
  loading: false,
  totalPages:0
};

export const HomeProductsSlice = createSlice({
  name: "Products",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    HomeProductsReq: (state) => {
      state.loading = true;
    },
    HomeProductsSuccess: (state, action) => {
      state.loading = false;
      state.totalPages = action.payload.totalPages
      state.products = action.payload.products;
    },
    HomeProductsFail: (state, action) => {
      state.error = action.payload.error.message;
    },
  },
});

export const { HomeProductsReq, HomeProductsSuccess, HomeProductsFail } =
  HomeProductsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHomeProducts = (state: RootState) =>
  state.homeProducts.products;

export default HomeProductsSlice.reducer;
