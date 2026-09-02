"use client";

type SocialAuthButtonsProps = {
  mode?: "signin" | "signup";
};

export default function SocialAuthButtons({
  mode = "signup",
}: SocialAuthButtonsProps) {
  const actionText =
    mode === "signup" ? "Sign up" : "Continue";

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Google authentication button */}
      <button
        type="button"
        onClick={() => {
          console.log("Google authentication will be connected later.");
        }}
        className="flex h-12 items-center justify-center gap-3 border border-blue-400 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
      >
        {/* Google icon */}
        <span
          aria-hidden="true"
          className="flex h-6 w-6 items-center justify-center text-xl font-bold"
        >
          G
        </span>

        <span>
          {actionText} with Google
        </span>
      </button>

      {/* Email authentication button */}
      <button
        type="button"
        onClick={() => {
          console.log("Email authentication uses the form below.");
        }}
        className="flex h-12 items-center justify-center gap-3 border border-blue-400 bg-white px-4 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
      >
        {/* Gmail-style icon */}
        <span
          aria-hidden="true"
          className="flex h-6 w-7 items-center justify-center text-xl font-bold text-red-500"
        >
          M
        </span>

        <span>
          {actionText} with Email
        </span>
      </button>
    </div>
  );
}