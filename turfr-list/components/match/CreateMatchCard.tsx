"use client";

import { useActionState } from "react";
import Image from "next/image";
import { useCreateMatch } from "@/components/match/hooks/useCreateMatch";
import { createMatchSchema } from "@/lib/validations/match";

interface FormState {
    error: string | null;
    success: boolean;
}

export default function CreateMatchCard() {

    const { submitCreateMatch } = useCreateMatch();

    const [state, formAction, isPending] = useActionState(
        async (_prevState: FormState, formData: FormData): Promise<FormState> => {
            const rawData = Object.fromEntries(formData);

            // 1. Validate
            const validated = createMatchSchema.safeParse(rawData);

            if (!validated.success) {
                return {
                    error: validated.error.issues[0].message,
                    success: false
                };
            }

            // 2. Execute (Use validated.data directly!)
            try {
                await submitCreateMatch(validated.data);
                return { error: null, success: true };
            } catch (err: unknown) {
                return {
                    error: err instanceof Error ? err.message : "An unknown error occurred",
                    success: false
                };
            }
        },
        { error: null, success: false }
    );

    return (
        <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-8 -translate-y-12">
            <Image src="/turfr-logo.svg" alt="Turfr logo" width={180} height={60} className="opacity-90" />

            <form action={formAction} className="w-full bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col gap-4">
                    <input name="organizerName" placeholder="Your name" type="text"
                           className="w-full border border-zinc-700 bg-zinc-950 p-3 rounded-lg" required />

                    <input name="maxPlayers" placeholder="Max players" type="number"
                           className="w-full border border-zinc-700 bg-zinc-950 p-3 rounded-lg" required />

                    <label className="flex items-center gap-3 text-sm text-zinc-400 cursor-pointer">
                        <input name="joinAsPlayer" type="checkbox" defaultChecked={true}
                               className="accent-blue-500 w-4 h-4 transition" />
                        <span className="tracking-tight">Join as player</span>
                    </label>

                    {/* Cleaned up Button Logic */}
                    <button
                        disabled={isPending}
                        type="submit"
                        className="w-full bg-blue-600 disabled:opacity-50 hover:bg-blue-500 active:scale-[0.98] transition text-white py-3 rounded-xl font-medium"
                    >
                        {isPending ? "Creating..." : "Create Match"}
                    </button>

                    {state.error && <p className="text-red-500 text-sm text-center">{state.error}</p>}
                </div>
            </form>
        </div>
    );
}