import { z } from "zod";

const envSchema = z.object({
    MONGO_DB_CONNECTION_STRING: z.string().url(),
    PORT: z.coerce.number().min(1000),
    JWT_SECRET: z.string()
});

export const envSanitisedSchema = envSchema.parse(process.env);

export const userSchema = z.object({
    password: z.string().min(1, "Password is required!"),
    email: z.string().email().min(5, "Email is required!")
})

export type UserSchema = z.infer<typeof userSchema>;

export const createUserSchema = z.object({
    name: z.string().min(1, "Username is Required!"),
    password: z.string().min(1, "Password is required!"),
    email: z.string().email().min(5, "Email is required!")
})

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional()
}).refine((values) => {
    for (const val of Object.values(values)) {
        if (val !== undefined) return true;
    } return false;
}, {
    message: "Object must have at least one property defined"
});