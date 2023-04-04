import { configureStore } from '@reduxjs/toolkit'
import homeProducts from './slices/homeSlice'
import CategoryRed from './slices/categorySlice'
import productDetailSlice from './slices/productDetailSlice'
import cartSlice from './slices/cartSlice'
import userSlice from './slices/userSlice'
// ...

export const store = configureStore({
  reducer: {
    homeProducts:homeProducts,
    CategoryRed:CategoryRed,
    ProductDetail:productDetailSlice,
    cart:cartSlice,
    user:userSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch