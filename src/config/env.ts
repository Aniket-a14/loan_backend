import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    GEMINI_API_KEY: z.string().min(1),
    PORT: z.string().default('5000').transform((val) => parseInt(val, 10)),
});

export const env = envSchema.parse(process.env);
