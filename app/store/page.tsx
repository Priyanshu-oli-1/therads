"use client";

import { useAuth } from "@/components/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Store Page - Placeholder
 * Requires authentication
 * Create your own UI here
 */

export default function StorePage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/store");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      {/* Your store UI goes here */}
      <p>Store Page - Create your own UI here</p>
      <p>User: {user?.name}</p>
    </main>
  );
}
