"use client";

import { useAuth } from "@/components/auth/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * This page is a flow handler for sign-up
 * Create your own UI and call signup() from useAuth hook
 * Example:
 * const { signup } = useAuth();
 * signup(email, name);
 * This will register the user and redirect
 */

export default function SignUpPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // If already logged in, redirect to home or specified path
  useEffect(() => {
    if (isLoggedIn) {
      router.push(redirect);
    }
  }, [isLoggedIn, router, redirect]);

  return (
    <div>
      {/* Your sign-up UI goes here */}
      <p>Sign Up Page - Create your own UI here</p>
    </div>
  );
}
