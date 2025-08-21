"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();
  const orders = useSelector((state: RootState) => state.cart.orders);

  if (!session) {
    return <p>Only logged-in users can see this page.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-2">
          {orders.map((order, index) => (
            <li key={index} className="border p-2 rounded">
              {order.map((item: any) => (
                <p key={item.id}>
                  {item.title} — {item.quantity}
                </p>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
