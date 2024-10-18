import { z } from "zod";

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

const requiredNumericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")
const requiredString = z.string().min(1, "Required")
// const requiredBooleanString = z.string().min(1, "Required").refine(value => value != "true" || "false", "This value must be a boolean")

const contactSchema = z.object({
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number").optional().or(z.literal("")),
}).refine((data) => data.email || data.phone, {
    path: ["email"],
    message: "Email or Phone Number is required",
});


export const createDonationSchema = z.object({
    amount: requiredNumericString,
    orgName: requiredString,
    comment: requiredString,
    donorName: z.string().optional(),
    itemId: requiredString,
}).and(contactSchema)

export type CreateDonationSchema = z.infer<typeof createDonationSchema>