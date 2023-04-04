import { productType } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
// Define a type for the slice state
interface DetailProductsState {
    product: null | productType;
    error: string | null;
    loading: boolean;
}

// Define the initial state using that type
const initialState: DetailProductsState = {
    product: null,
    error: null,
    loading: false,
};

export const ProductDetailSlice = createSlice({
    name: "ProductDetails",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        ProductDetailsReq: (state) => {
            state.loading = true;
        },
        ProductDetailsSuccess: (state, action) => {
            state.loading = false;
            state.product = action.payload.data;
        },
        ProductDetailsFail: (state, action) => {
            state.error = action.payload.error.message;
        },
    },
});

export const { ProductDetailsReq, ProductDetailsSuccess, ProductDetailsFail } =
    ProductDetailSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectDetailProducts = (state: RootState) =>
    state.ProductDetail.product;

export default ProductDetailSlice.reducer;
