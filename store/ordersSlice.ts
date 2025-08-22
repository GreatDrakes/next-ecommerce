import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;          
  userEmail: string;
  items: OrderItem[];
  createdAt: string; // ISO date string
  total: number;
}

interface OrdersState {
  allOrders: Order[];
}

const initialState: OrdersState = {
  allOrders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.allOrders.push(action.payload);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
