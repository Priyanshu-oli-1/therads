"use client";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { resetPasswordSchema } from "@/schema/validation/auth";
import { useAuth } from "@/components/auth/authContext";

type FieldErrors = {
  password?: string;
  confirmPassword?: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { resetPassword } = useAuth();

  const email =
    searchParams.get("email") || "";

  const redirect =
    searchParams.get("redirect") || "/";

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const [formError, setFormError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrors({});
    setFormError("");

    /*
      Validate the new password with Zod.
    */
    const result =
      resetPasswordSchema.safeParse({
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

    /*
      Make sure the reset request contains
      an email address.
    */
    if (!email) {
      setFormError(
        "Password reset request is invalid."
      );

      return;
    }

    /*
      Update the password through authContext.
    */
    const updated = resetPassword(
      email,
      password
    );

    if (!updated) {
      setFormError(
        "Unable to reset the password. Please try again."
      );

      return;
    }

    /*
      Remove the temporary reset state.
    */
    localStorage.removeItem(
      "threads-password-reset"
    );

    setSuccess(true);

    /*
      Send the user back to Sign In.
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
    }, 1000);
  }

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          Account recovery
        </p>

        <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-gray-900">
          Reset Password
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Create a new password for your THREADS
          account.
        </p>

        {email && (
          <p className="mt-3 text-sm font-medium text-gray-900">
            {email}
          </p>
        )}
      </div>

      {!success ? (
        <form
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="reset-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>

              <input
                id="reset-password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Create a new password"
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
                htmlFor="reset-confirm-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>

              <input
                id="reset-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Confirm your new password"
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
            Reset Password
          </button>
        </form>
      ) : (
        <div className="border border-gray-200 bg-gray-50 p-6">
          <p className="text-sm font-medium text-green-600">
            Password updated successfully.
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your password has been changed. Redirecting
            you to Sign In...
          </p>
        </div>
      )}

      {/* Back to Sign In */}
      {!success && (
        <p className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{" "}

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
      )}
    </div>
  );
}