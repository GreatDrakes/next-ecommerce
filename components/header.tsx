"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        🛍️ Next E-Commerce
      </Link>

      <nav className="space-x-6 flex items-center">
        <Link href="/">Home</Link>

        <Link href="/cart" className="relative">
          Cart
          {totalQuantity > 0 && (
            <span className="ml-1 px-2 py-0.5 bg-red-500 text-xs rounded-full">
              {totalQuantity}
            </span>
          )}
        </Link>

        {session && (
          <Link href="/orders" className="hover:underline">
            Orders
          </Link>
        )}

        {session?.user?.roles?.includes("admin") && (
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        )}

        {session ? (
          <>
            <span className="text-sm">Hi, {session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="ml-2 px-3 py-1 bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("auth0")}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
