import { z } from "zod";

export const createMatchSchema = z.object({
    organizerName: z
        .string()
        .min(2, "Name too short")
        .max(50, "Name is too long")
        .trim(),

    maxPlayers: z.coerce.number()
        .int()
        .min(2, "At least 2 players required")
        .max(22, "Maximum 22 players allowed")
        .refine((n) => n % 2 === 0, "Must be an even number"),

    joinAsPlayer: z.preprocess(
        (val) => val === "on",
        z.boolean()
    ).default(false),
});

export type MatchInput = z.infer<typeof createMatchSchema>;