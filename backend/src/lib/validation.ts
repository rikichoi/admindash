import { z } from "zod";

const envSchema = z.object({
    MONGO_DB_CONNECTION_STRING: z.string().url(),
    PORT: z.coerce.number().min(1000)
});

export const envSanitisedSchema = envSchema.parse(process.env);