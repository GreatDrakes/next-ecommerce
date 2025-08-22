// OrdersPage.tsx
"use client";

import { useSession } from "next-auth/react";
import { getAllOrders } from "../../lib/ordersstore";

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  userEmail: string;
  createdAt: string;
  items: OrderItem[];
  total: number;
}

export default function OrdersPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p className="p-6">You must be logged in to view your orders.</p>;
  }

  const isAdmin = session.user?.roles?.includes("Admin");

  if (isAdmin) {
    
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">
          Welcome, {session.user?.email}. Here’s a demo view of orders:
        </p>

        <ul className="space-y-4">
          <li className="border rounded-lg p-4 shadow bg-white">
            <p><strong>User:</strong> alice@example.com</p>
            <p><strong>Items:</strong> Sword (x1), Shield (x2)</p>
            <p><strong>Total:</strong> $149.99</p>
          </li>
          <li className="border rounded-lg p-4 shadow bg-white">
            <p><strong>User:</strong> bob@example.com</p>
            <p><strong>Items:</strong> Potion (x3)</p>
            <p><strong>Total:</strong> $29.97</p>
          </li>
        </ul>
      </div>
    );
  }

  // normal user flow
  const allOrders: Order[] = getAllOrders();
  const myOrders: Order[] = allOrders.filter(
    (o) => o.userEmail === session.user?.email
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
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
