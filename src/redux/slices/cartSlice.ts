
import { cartItem } from "@/types/general";
import { createSlice } from "@reduxjs/toolkit";
// Define a type for the slice state
interface CategoryState {
    cartItems: null | cartItem[];
    totalItems: number
    totalPrice:number
}

// Define the initial state using that type
const initialState: CategoryState = {
    cartItems: null,
    totalItems: 0,
    totalPrice:0
};

export const CartSlice = createSlice({
    name: "cartItems",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const { data } = action.payload

            if (state.cartItems) {
                const prodExisted = state.cartItems?.findIndex(i => i.id === data.id && i.size === data.size)
                if (prodExisted >= 0) {

                    state.cartItems[prodExisted].count += 1
                    state.totalItems += 1
                    state.totalPrice += state.cartItems[prodExisted].price


                } else {
                    state.cartItems = [
                        ...state.cartItems, data
                    ]
                    state.totalItems += 1
                    state.totalPrice += data.price
                }
            } else {
                state.cartItems = [data]
                state.totalItems += 1
                state.totalPrice = data.price
            }

        },
        removeFromCart: (state, action) => {
            const { id,size } = action.payload

            if (state.cartItems) {
                const prodExisted = state.cartItems?.findIndex(i => i.id === id && i.size === size)

                console.log(`index is ${prodExisted}`);

                const { id: rMID , size : RMSize } = state.cartItems[prodExisted]

                if (rMID && RMSize) {
                    state.totalItems -= state.cartItems[prodExisted].count
                    state.totalPrice -= state.cartItems[prodExisted].price * state.cartItems[prodExisted].count
                    state.cartItems = state.cartItems.filter(i => i.id !== rMID || i.size !== RMSize)
                    
                }

                if (state.cartItems.length == 0) {
                    state.cartItems = null
                    state.totalItems = 0
                    state.totalPrice = 0
                }

            }

        }
    },
});

export const { addToCart, removeFromCart } =
    CartSlice.actions;



export default CartSlice.reducer;