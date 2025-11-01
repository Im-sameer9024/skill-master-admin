import z from "zod";

export const notificationFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status",
  }),
  message: z
    .string()
    .min(10, "Message is required")
    .max(150, "Message must be at most 150 characters"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .refine(
      (files) => files[0]?.type.startsWith("image/"),
      "Must be an image file"
    )
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "Image must be less than 5MB"
    ),
});
