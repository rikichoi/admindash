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

export const createItemSchema = z.object({
    summary: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    name: z.string().min(1, "Required"),
    donationGoalValue: z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number"),
    totalDonationValue: z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number"),
    activeStatus: z.string().min(1, "Required").refine(value => value != "true" || "false", "This value must be a boolean"),
    itemImage: z.string().min(1, "Required")
})

export type CreateItemSchema = z.infer<typeof createItemSchema>

export const createDonationSchema = z.object({
    name: z.string().min(1, "Required"),
    email: z.string().min(1, "Required"),
    phoneNumber: data.phoneNumber,
    mailingAddress: z.string().min(1, "Required"),
    IsAnon: data.IsAnon,
    agreeToContact: data.agreeToContact,
    howHeard: data.howHeard
})