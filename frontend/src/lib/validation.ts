import { z } from "zod"

const requiredNumericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")
const requiredString = z.string().min(1, "Required")


export const createOrganisationSchema = z.object({
    ABN: z.string().optional(),
    activeStatus: z.boolean(),
    description: requiredString,
    image: requiredString,
    name: requiredString,
    phone: requiredString,
    summary: requiredString,
    website: requiredString.url(),
    totalDonationsCount: requiredNumericString,
    totalDonationItemsCount: requiredNumericString,
    totalDonationsValue: requiredNumericString,
})

export type CreateOrganisationSchema = z.infer<typeof createOrganisationSchema>

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const itemImageSchema = z.object({
    itemImage: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})

export const createItemSchema = z.object({
    summary: z.string().min(1, "Required"),
    description: requiredString,
    name: requiredString,
    donationGoalValue: requiredNumericString,
    totalDonationValue: requiredNumericString,
    activeStatus: z.boolean(),
    orgId: z.string()
}).and(itemImageSchema)

export type CreateItemSchema = z.infer<typeof createItemSchema>