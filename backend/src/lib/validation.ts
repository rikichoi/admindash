import { z } from "zod";

const envSchema = z.object({
    MONGO_DB_CONNECTION_STRING: z.string().url(),
    PORT: z.coerce.number().min(1000),
    JWT_SECRET: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    BUCKET_NAME: z.string(),
    BUCKET_REGION: z.string(),
    ACCESS_KEY: z.string(),
    SECRET_ACCESS_KEY: z.string()
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

// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const editItemSchema = z.object({
    summary: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    name: z.string().min(1, "Required"),
    donationGoalValue: z.number(),
    totalDonationValue: z.number(),
    activeStatus: z.boolean().optional(),
    orgId: z.string().min(1, "Required")
})

export const createItemSchema = z.object({
    summary: z.string().min(1, "Required"),
    description: z.string().min(1, "Required"),
    name: z.string().min(1, "Required"),
    donationGoalValue: z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number"),
    totalDonationValue: z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number"),
    activeStatus: z.string().min(1, "Required").refine(value => value != "true" || "false", "This value must be a boolean"),
    orgId: z.string().min(1, "Required")
})

export const itemImageSchema = z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string(),
    buffer: z.any(),
    size: z.number()
})

const requiredNumericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")
const requiredString = z.string().min(1, "Required")
// const requiredBooleanString = z.string().min(1, "Required").refine(value => value != "true" || "false", "This value must be a boolean")

export type CreateItemSchema = z.infer<typeof createItemSchema>

const contactSchema = z.object({
    email: z.string().optional().or(z.literal("")),
    phone: z.string().regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number").optional().or(z.literal("")),
}).refine((data) => data.email || data.phone, {
    message: "Email or url is required",
    path: ["email"],
});


export const createDonationSchema = z.object({
    amount: requiredNumericString,
    orgName: requiredString,
    comment: requiredString,
    donorName: z.string().optional(),
    itemId: requiredString,
}).and(contactSchema)

export type CreateDonationSchema = z.infer<typeof createDonationSchema>

export const createOrganisationSchema = z.object({
    ABN: z.number(),
    activeStatus: z.boolean(),
    description: requiredString,
    name: requiredString,
    phone: z.number(),
    summary: requiredString,
    website: requiredString,
    image: requiredString,
    totalDonationsCount: z.number(),
    totalDonationItemsCount: z.number(),
    totalDonationsValue: z.number(),
})