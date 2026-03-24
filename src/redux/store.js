import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
 
const store = configureStore({
  reducer: {
    cart: cartReducer,   // state.cart will be managed by cartSlice
    // Add more slices here later e.g. user: userReducer
  },
});
 
export default store;
 