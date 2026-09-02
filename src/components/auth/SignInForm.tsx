"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { signInSchema } from "@/schema/validation/auth";
import { useAuth } from "@/components/auth/authContext";

import SocialAuthButtons from "./SocialAuthButtons";

type FieldErrors = {
  email?: string;
  password?: string;
};

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    isLoggedIn,
    signin,
  } = useAuth();

  const redirect =
    searchParams.get("redirect") || "/";

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [formError, setFormError] =
    useState("");

  /*
    Redirect already authenticated users.
  */
  useEffect(() => {
    if (isLoggedIn) {
      router.push(redirect);
    }
  }, [
    isLoggedIn,
    router,
    redirect,
  ]);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setFormError("");

    /*
      Validate input with Zod.
    */
    const result =
      signInSchema.safeParse({
        email,
        password,
      });

    if (!result.success) {
      const nextErrors: FieldErrors = {};

      result.error.issues.forEach(
        (issue) => {
          const field =
            issue.path[0] as keyof FieldErrors;

          if (!nextErrors[field]) {
            nextErrors[field] =
              issue.message;
          }
        }
      );

      setErrors(nextErrors);

      return;
    }

    const cleanEmail =
      email.trim();

    /*
      Try to authenticate the user.
    */
    const resultLogin = signin(
      cleanEmail,
      password
    );

    /*
      Successful login.
    */
    if (resultLogin.success) {
      router.push(redirect);
      return;
    }

    /*
      Credentials are correct, but
      email has not been verified.
    */
    if (
      resultLogin.reason ===
      "unverified"
    ) {
      router.push(
        `/verify-email?email=${encodeURIComponent(
          cleanEmail
        )}&redirect=${encodeURIComponent(
          redirect
        )}`
      );

      return;
    }

    /*
      Wrong email/password.
    */
    setFormError(
      "Invalid email or password."
    );
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          Welcome back
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900">
          Sign In
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Sign in to your THREADS account to continue
          shopping.
        </p>
      </div>

      <SocialAuthButtons mode="signin" />

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Or
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="signin-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="signin-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={Boolean(
                errors.email
              )}
              className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.email && (
              <p className="mt-2 text-xs text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="signin-password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/forgot-password${
                      redirect !== "/"
                        ? `?redirect=${encodeURIComponent(
                            redirect
                          )}`
                        : ""
                    }`
                  )
                }
                className="text-xs font-medium text-gray-500 transition hover:text-black hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <input
              id="signin-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={Boolean(
                errors.password
              )}
              className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.password && (
              <p className="mt-2 text-xs text-red-500">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        {formError && (
          <p className="mt-4 text-sm text-red-500">
            {formError}
          </p>
        )}

        <button
          type="submit"
          className="mt-8 h-14 w-full bg-black text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Sign In
        </button>
      </form>

      {/* Sign up */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account?{" "}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/sign-up${
                redirect !== "/"
                  ? `?redirect=${encodeURIComponent(
                      redirect
                    )}`
                  : ""
              }`
            )
          }
          className="font-medium text-black underline-offset-4 hover:underline"
        >
          Create an Account
        </button>
      </p>
    </div>
  );
}