"use client";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// Define types for items and orders
interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string; // assuming your DB gives each order an id
  userEmail: string;
  createdAt: string; // ISO string from DB
  items: OrderItem[];
  total: number;
}

export default function OrdersPage() {
  const { data: session } = useSession();

  // Pull orders from Redux
  const orders: Order[] =
    useSelector((state: RootState) => state.orders.allOrders) ?? [];

  // If not logged in
  if (!session) {
    return <p className="p-6">You must be logged in to view your orders.</p>;
  }

  // Filter only the logged-in user's orders
  const userOrders = orders.filter(
    (order) => order.userEmail === session?.user?.email
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {userOrders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow bg-white"
            >
              <p className="text-sm text-gray-500 mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <ul className="space-y-2">
                {order.items.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <div className="text-right font-bold mt-2">
                Total: ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

