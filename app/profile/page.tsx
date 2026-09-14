"use client";
import { useRouter } from "next/navigation";

import { useAuth } from "@/components/auth/authContext";
import ProfileForm from "@/components/auth/ProfileForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 lg:py-16">
          {/* Heading */}
          <div className="border-b border-gray-200 pb-8">
            <p className="text-sm font-medium text-gray-500">My Account</p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-gray-900">
            Profile
          </h1>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Account navigation */}
          <aside>
            <nav className="space-y-1">
              <button
                type="button"
                className="w-full border-l-2 border-black bg-gray-50 px-4 py-3 text-left text-sm font-medium"
              >
                Profile Information
              </button>

              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                Orders
              </button>

              <button
                type="button"
                className="w-full px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-50"
              >
                Addresses
              </button>
            </nav>
          </aside>

          {/* Profile */}
          <section className="border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-6">
              <h2 className="text-lg font-semibold">Personal Information</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your THREADS account information.
              </p>
            </div>

            <div className="px-6 py-8">
              <ProfileForm />
            </div>

            <div className="border-t border-gray-200 px-6 py-6">
              <button
                type="button"
                onClick={handleLogout}
                className="h-12 border border-gray-300 px-6 text-sm font-medium hover:border-black"
              >
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
