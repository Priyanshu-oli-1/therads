"use client";

import { useAuth } from "@/components/auth/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in?redirect=/profile");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold">
        My Profile
      </h1>

      <div className="mt-8 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{user?.name || "Guest User"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user?.email || "guest@example.com"}</p>
        </div>
      </div>
    </main>
  );
}