"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You must be logged in to view this page.</p>;
  }

  if (!session.user.roles?.includes("admin")) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
      <p>You can manage the store here.</p>
    </div>
  );
}
