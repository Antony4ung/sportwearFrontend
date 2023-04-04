import { orderType, productType } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
// Define a type for the slice state
interface userState {
    data: {
        _id:string
        favProducts: null | productType[];
        orderHistory: null | orderType[];
        phoneNumber: string
    }
    error: string | null;
    loading: boolean;
}

// Define the initial state using that type
const initialState: userState = {
    
    data: {
        _id:"",
        favProducts: [] ,
        orderHistory: [],
        phoneNumber: "",
    },
    error: null,
    loading: false
};

export const userSlice = createSlice({
    name: "User",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        userReq: (state) => {
            state.loading = true;
        },
        userSuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload.data
        },
        userFail: (state, action) => {
            state.error = action.payload.error.message;
        },
    },
});

export const { userReq, userSuccess, userFail } =
    userSlice.actions;



export default userSlice.reducer;
