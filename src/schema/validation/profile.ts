import z from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(
      2,
      "Name must be at least 2 characters."
    ),

  email: z
    .string()
    .trim()
    .email(
      "Please enter a valid email address."
    ),

  phone: z
    .string()
    .trim()
    .min(
      10,
      "Please enter a valid phone number."
    ),
});