import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(1, { message: "Password must be required" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .optional(),
});

export default userValidationSchema;
