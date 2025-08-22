import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;   // ✅ add this
  quantity: number;
}

interface CartState {
  items: CartItem[];
  orders: CartItem[][]; // each order = array of items
}

const initialState: CartState = {
  items: [],
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    checkout: (state) => {
      if (state.items.length > 0) {
        state.orders.push([...state.items]); // save current cart as new order
        state.items = []; // empty the cart
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, checkout } =
  cartSlice.actions;
export default cartSlice.reducer;
