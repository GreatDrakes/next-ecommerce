// lib/ordersStore.ts
import type { Order } from "../store/ordersSlice";

// shared in-memory array (resets on server restart, fine for demo)
const ordersMemory: Order[] = [];

export function getAllOrders(): Order[] {
  return ordersMemory;
}

export function addOrderToMemory(order: Order) {
  ordersMemory.push(order);
}