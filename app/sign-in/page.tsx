"use client";

import { useAuth } from "@/components/auth/authContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * This page is a flow handler for sign-in
 * Create your own UI and call signin() from useAuth hook
 * Example:
 * const { signin } = useAuth();
 * signin(email, name);
 * This will set the user as logged in and redirect
 */

export default function SignInPage() {
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
      {/* Your sign-in UI goes here */}
      <p>Sign In Page - Create your own UI here</p>
    </div>
  );
}

