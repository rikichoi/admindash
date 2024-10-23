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