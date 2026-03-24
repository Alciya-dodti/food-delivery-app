import { createSlice } from "@reduxjs/toolkit";
 
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],          // array of items in the cart
    totalAmount: 0,     // total price
    totalQuantity: 0,   // badge count on cart icon
  },
 
  // REDUCERS = functions that update state
  // Redux Toolkit lets you "mutate" state directly (it handles immutability internally)
  reducers: {
 
    // ADD item or increase quantity if already in cart
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((i) => i.id === newItem.id);
 
      state.totalQuantity++;
      state.totalAmount += newItem.price;
 
      if (!existingItem) {
        // Item not in cart yet — add it with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        // Already in cart — just increase quantity
        existingItem.quantity++;
      }
    },
 
    // REMOVE one unit of an item
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      if (!existingItem) return;
 
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
 
      if (existingItem.quantity === 1) {
        // Remove item completely from array
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
 
    // DELETE item completely regardless of quantity
    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((i) => i.id === id);
      if (!existingItem) return;
 
      state.totalAmount -= existingItem.price * existingItem.quantity;
      state.totalQuantity -= existingItem.quantity;
      state.items = state.items.filter((i) => i.id !== id);
    },
 
    // CLEAR entire cart (used after order placed)
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});
 
// Export actions so components can dispatch them
export const { addItem, removeItem, deleteItem, clearCart } = cartSlice.actions;
 
// Export reducer to register in store
export default cartSlice.reducer;
