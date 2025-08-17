"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity } from "../../store/cartSlice";

export default function CartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <p className="p-8 text-lg">Your cart is empty.</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">${item.price}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: Number(e.target.value) })
                  )
                }
                className="w-16 border rounded px-2 py-1"
              />
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-xl font-bold">Total: ${total.toFixed(2)}</div>
    </div>
  );
}
