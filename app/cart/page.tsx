"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, checkout } from "../../store/cartSlice";
import { addOrder } from "../../store/ordersSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addOrderToMemory } from "../../lib/ordersstore"; 

export default function CartPage() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!session) {
      alert("You must be logged in to place an order.");
      return;
    }

    // Save order
    const order = {
      id: Date.now().toString(),
      userEmail: session.user?.email || "guest",
      items: cart,
      total,
      createdAt: new Date().toISOString(),
    };


    dispatch(addOrder(order));

    addOrderToMemory(order);

    // Clear cart
    dispatch(checkout());

    // Redirect
    router.push("/orders");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />
                <div>
                  <h2 className="font-semibold text-sm">{item.title}</h2>
                  <p className="text-gray-500 text-sm">
                    ${item.price} × {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="flex justify-between font-bold text-lg border-t pt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Checkout */}
          <button
            onClick={handleCheckout}
            className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
