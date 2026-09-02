"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { verifyEmailSchema } from "@/schema/validation/auth";
import { useAuth } from "@/components/auth/authContext";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    user,
    verifyEmail,
  } = useAuth();

  const email =
    searchParams.get("email") ||
    user?.email ||
    "";

  const redirect =
    searchParams.get("redirect") || "/";

  const [code, setCode] = useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /*
    For our learning project we use a fixed
    demo verification code.

    Later this will come from the backend
    and email service.
  */
  const DEMO_VERIFICATION_CODE = "123456";

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
      Validate the code using Zod.
    */
    const result =
      verifyEmailSchema.safeParse({
        code,
      });

    if (!result.success) {
      setError(
        result.error.issues[0].message
      );

      return;
    }

    /*
      Check the demo verification code.

      In production this comparison would
      happen on the server.
    */
    if (
      result.data.code !==
      DEMO_VERIFICATION_CODE
    ) {
      setError(
        "Invalid verification code."
      );

      return;
    }

    /*
      Mark the user's email as verified.
    */
    verifyEmail();

    setSuccess(
      "Your email has been verified successfully."
    );

    /*
      Give the user a moment to see the
      success message before redirecting.
    */
    setTimeout(() => {
      router.push(
        `/sign-in${
          redirect !== "/"
            ? `?redirect=${encodeURIComponent(
                redirect
              )}`
            : ""
        }`
      );
    }, 800);
  }

  /*
    If there is no email/user, the user probably
    opened this page directly.
  */
  if (!email) {
    return (
      <div className="text-center">
        <h2 className="font-serif text-3xl font-semibold">
          Verify Your Email
        </h2>

        <p className="mt-4 text-sm text-gray-500">
          We could not find an email address
          to verify.
        </p>

        <button
          type="button"
          onClick={() =>
            router.push("/sign-up")
          }
          className="mt-6 bg-black px-6 py-3 text-sm font-medium text-white"
        >
          Back to Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          Almost there
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900">
          Verify Your Email
        </h2>

        <p className="mt-4 text-sm leading-6 text-gray-500">
          Enter the verification code for:
        </p>

        <p className="mt-1 text-sm font-medium text-gray-900">
          {email}
        </p>
      </div>

      {/* Demo code information */}
      <div className="mb-6 border border-gray-200 bg-gray-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Learning Project
        </p>

        <p className="mt-2 text-sm text-gray-700">
          Your demo verification code is:
        </p>

        <p className="mt-1 text-lg font-semibold tracking-[0.3em] text-black">
          123456
        </p>
      </div>

      {/* Verification form */}
      <form
        onSubmit={handleSubmit}
        noValidate
      >
        <div>
          <label
            htmlFor="verification-code"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Verification Code
          </label>

          <input
            id="verification-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(event) =>
              setCode(
                event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6)
              )
            }
            placeholder="Enter 6-digit code"
            aria-invalid={Boolean(error)}
            className={`h-14 w-full border bg-white px-4 text-center text-lg tracking-[0.4em] outline-none transition ${
              error
                ? "border-red-500"
                : "border-gray-300 focus:border-black"
            }`}
          />

          {error && (
            <p className="mt-2 text-xs text-red-500">
              {error}
            </p>
          )}
        </div>

        {success && (
          <p className="mt-4 text-sm text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          className="mt-8 h-14 w-full bg-black text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Verify Email
        </button>
      </form>

      {/* Back to sign in */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Already verified?{" "}
        <button
          type="button"
          onClick={() =>
            router.push("/sign-in")
          }
          className="font-medium text-black underline-offset-4 hover:underline"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}