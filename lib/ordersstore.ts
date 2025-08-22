// lib/ordersstore.ts
import type { Order } from "../store/ordersSlice";

const STORAGE_KEY = "orders_memory";

export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addOrderToMemory(order: Order) {
  if (typeof window === "undefined") return;
  const orders = getAllOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}