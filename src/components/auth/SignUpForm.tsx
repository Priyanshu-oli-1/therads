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

import { signUpSchema } from "@/schema/validation/auth";
import { useAuth } from "@/components/auth/authContext";

import SocialAuthButtons from "./SocialAuthButtons";

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    isLoggedIn,
    signup,
  } = useAuth();

  const redirect =
    searchParams.get("redirect") || "/";

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [formError, setFormError] =
    useState("");

  /*
    Already authenticated users should not
    create another account.
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
      Validate all signup fields.
    */
    const result =
      signUpSchema.safeParse({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
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
      result.data.email;

    const name =
      `${result.data.firstName} ${result.data.lastName}`;

    /*
      Create the account.

      The account is NOT logged in yet because
      email verification is required.
    */
    const created = signup(
      cleanEmail,
      name,
      result.data.password
    );

    if (!created) {
      setFormError(
        "An account with this email already exists."
      );

      return;
    }

    /*
      Send the user to email verification.
    */
    router.push(
      `/verify-email?email=${encodeURIComponent(
        cleanEmail
      )}&redirect=${encodeURIComponent(
        redirect
      )}`
    );
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          Create your account
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900">
          Sign Up
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Join THREADS and discover our latest fashion
          collection.
        </p>
      </div>

      <SocialAuthButtons mode="signup" />

      {/* Divider */}
      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Or
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Signup form */}
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="space-y-5">
          {/* Names */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="signup-first-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                id="signup-first-name"
                type="text"
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                placeholder="First Name"
                autoComplete="given-name"
                aria-invalid={Boolean(
                  errors.firstName
                )}
                className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.firstName && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="signup-last-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                id="signup-last-name"
                type="text"
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                placeholder="Last Name"
                autoComplete="family-name"
                aria-invalid={Boolean(
                  errors.lastName
                )}
                className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-gray-300 focus:border-black"
                }`}
              />

              {errors.lastName && (
                <p className="mt-2 text-xs text-red-500">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="signup-email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="signup-email"
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

          {/* Phone */}
          <div>
            <label
              htmlFor="signup-phone"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>

            <input
              id="signup-phone"
              type="tel"
              inputMode="numeric"
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
              placeholder="Phone Number"
              autoComplete="tel"
              aria-invalid={Boolean(
                errors.phone
              )}
              className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                errors.phone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.phone && (
              <p className="mt-2 text-xs text-red-500">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="signup-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Create a password"
              autoComplete="new-password"
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

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="signup-confirm-password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="signup-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              placeholder="Confirm your password"
              autoComplete="new-password"
              aria-invalid={Boolean(
                errors.confirmPassword
              )}
              className={`h-12 w-full border bg-white px-4 text-sm outline-none transition ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300 focus:border-black"
              }`}
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-500">
                {errors.confirmPassword}
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
          Create Account
        </button>
      </form>

      {/* Sign In */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Already have an account?{" "}

        <button
          type="button"
          onClick={() =>
            router.push(
              `/sign-in${
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
          Sign In
        </button>
      </p>
    </div>
  );
}