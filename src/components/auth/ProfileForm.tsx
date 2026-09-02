"use client";

import {
  FormEvent,
  useState,
} from "react";

import { profileSchema } from "@/schema/validation/profile";
import { useAuth } from "./authContext";

export default function ProfileForm() {
  const {
    user,
    updateProfile,
  } = useAuth();

  const [name, setName] =
    useState(user?.name ?? "");

  const [email, setEmail] =
    useState(user?.email ?? "");

  const [phone, setPhone] =
    useState(user?.phone ?? "");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    const result =
      profileSchema.safeParse({
        name,
        email,
        phone,
      });

    if (!result.success) {
      setError(
        result.error.issues[0]?.message ??
          "Please check your information."
      );

      return;
    }

    const updated =
      updateProfile(
        result.data.name,
        result.data.email,
        result.data.phone
      );

    if (!updated) {
      setError(
        "Unable to update your profile."
      );

      return;
    }

    setSuccess(
      "Profile updated successfully."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Name */}
      <div>
        <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>

        <input
          id="profile-name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="h-12 w-full border border-gray-300 px-4 text-sm outline-none focus:border-black"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="profile-email"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Email Address
        </label>

        <input
          id="profile-email"
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="h-12 w-full border border-gray-300 px-4 text-sm outline-none focus:border-black"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="profile-phone"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>

        <input
          id="profile-phone"
          type="tel"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          className="h-12 w-full border border-gray-300 px-4 text-sm outline-none focus:border-black"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      {success && (
        <p className="text-sm text-green-600">
          {success}
        </p>
      )}

      <button
        type="submit"
        className="h-12 bg-black px-8 text-sm font-medium text-white hover:bg-gray-800"
      >
        Save Changes
      </button>
    </form>
  );
}