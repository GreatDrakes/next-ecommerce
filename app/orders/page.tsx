"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function OrdersPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) {
    redirect("/"); // not logged in → send home
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <p>Only logged-in users can see this page.</p>
    </div>
  );
}
