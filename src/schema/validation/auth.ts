import z from "zod";

/**
 * Sign In validation.
 *
 * Used when an existing user enters
 * their email and password.
 */
export const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});


/**
 * Sign Up validation.
 *
 * Used when a new user creates an account.
 */
export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must be at least 2 characters."),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must be at least 2 characters."),

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address."),

    phone: z
      .string()
      .trim()
      .min(10, "Please enter a valid phone number."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),

    confirmPassword: z
      .string()
      .min(8, "Please confirm your password."),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );


/**
 * Email verification validation.
 *
 * For our learning project we will use
 * a 6-digit verification code.
 */
export const verifyEmailSchema = z.object({
  code: z
    .string()
    .trim()
    .length(6, "Verification code must be 6 digits.")
    .regex(
      /^\d+$/,
      "Verification code must contain only numbers."
    ),
});


/**
 * Forgot password validation.
 *
 * The user enters their email address
 * to start the password recovery process.
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
});


/**
 * Reset password validation.
 *
 * Makes sure the new password is valid
 * and both password fields match.
 */
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters."),

    confirmPassword: z
      .string()
      .min(8, "Please confirm your password."),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );