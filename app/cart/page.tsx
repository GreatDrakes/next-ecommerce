"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, checkout } from "../../store/cartSlice";

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item) => (
            <li key={item.id} className="border p-2 rounded">
              {item.title} — {item.quantity}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button
          onClick={() => dispatch(checkout())}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Checkout
        </button>
      )}
    </div>
  );
}
