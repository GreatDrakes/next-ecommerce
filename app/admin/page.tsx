"use client";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllOrders } from "../../lib/ordersstore"; 

export default function AdminPage() {
  const { data: session } = useSession();

  const reduxOrders = useSelector((state: RootState) => state.orders.allOrders);
  const memoryOrders = getAllOrders(); 

  // merge both sources
  const orders = [...reduxOrders, ...memoryOrders];

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  // check if user has admin role
  if (!session.user?.roles?.some(r => r.toLowerCase() === "admin")) {
    return <p>Access denied. Only admins can view this page.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - All Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order, idx) => (
            <li
              key={idx}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <p><strong>User:</strong> {order.userEmail}</p>
              <p><strong>Items:</strong></p>
              <ul className="ml-6 list-disc">
                {order.items.map((item: any, i: number) => (
                  <li key={i}>{item.title} (x{item.quantity})</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
