import { z } from "zod"

const requiredNumericString = z.string().min(1, "Required").regex(/^(0|[1-9]\d*(\.\d{1})?|0\.\d{1})$/, "Must be a number")
const requiredString = z.string().min(1, "Required")


export const createOrganisationSchema = z.object({
    ABN: requiredNumericString,
    activeStatus: z.boolean(),
    description: requiredString,
    name: requiredString,
    phone: requiredNumericString,
    summary: requiredString,
    website: requiredString.url(),
    image: z.array(z.instanceof(File)
        .refine((file) => file.size < 2 * 1024 * 1024, 'File size must be less than 2MB'),
    )
        .min(1, 'At least 1 file is required').refine(
            (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE), `Max image size is 5MB.`
        ),
    totalDonationsCount: requiredNumericString,
    totalDonationItemsCount: requiredNumericString,
    totalDonationsValue: requiredNumericString,
})

export type CreateOrganisationSchema = z.infer<typeof createOrganisationSchema>

export const editOrganisationSchema = z.object({
    ABN: requiredNumericString,
    activeStatus: z.boolean(),
    description: requiredString,
    name: requiredString,
    phone: requiredNumericString,
    summary: requiredString,
    website: requiredString.url(),
    previousImages: z.array(z.string().optional()),
    newImages: z.array(z.instanceof(File)
        .refine((file) => file.size < 2 * 1024 * 1024, 'File size must be less than 2MB'),
    )
        .refine(
            (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .refine(
            (files) => files.every((file) => file.size <= MAX_FILE_SIZE), `Max image size is 5MB.`
        ).optional(),
    totalDonationsCount: requiredNumericString,
    totalDonationItemsCount: requiredNumericString,
    totalDonationsValue: requiredNumericString,
})

export type EditOrganisationSchema = z.infer<typeof editOrganisationSchema>


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

const editItemImageSchema = z.object({
    itemImage: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        ).optional()
})

export const editItemSchema = z.object({
    summary: z.string().min(1, "Required"),
    description: requiredString,
    name: requiredString,
    donationGoalValue: requiredNumericString,
    totalDonationValue: requiredNumericString,
    activeStatus: z.boolean(),
    orgId: z.string()
}).and(editItemImageSchema)

export type EditItemSchema = z.infer<typeof editItemSchema>

