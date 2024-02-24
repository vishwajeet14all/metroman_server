import z from "zod";

const signupSchema = z.object({
  googleId: z.string().optional(),
  name: z.string().optional(),
  mobilenumber: z.number().int().optional(),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z.string().optional(),
  selectedOption: z.string().optional(),
  image: z.string().optional(),
  profileID: z.string().optional(), // Assuming profileID is a string
  isAdmin: z.boolean().default(false),
});

export default signupSchema;
