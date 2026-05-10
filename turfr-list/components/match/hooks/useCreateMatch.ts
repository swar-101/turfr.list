"use client";

import { useRouter } from "next/navigation";
import { joinMatchAction } from "@/lib/actions/joinMatchAction";
import { createMatch } from "@/lib/domain/match/createMatch";
import { useIdentity } from "@/components/match/hooks/useIdentity";
import { MatchInput } from "@/lib/validations/match";

export function useCreateMatch() {
    const router = useRouter();
    const playerId = useIdentity();

    async function submitCreateMatch(input: MatchInput) {

        if (!playerId) {
            throw new Error("Identity not ready. Please try again in a second.");
        }

        // TODO: Make this into 1 RPC
        const data = await createMatch({
            organizerName: input.organizerName,
            maxPlayers: input.maxPlayers,
        });

        if (input.joinAsPlayer) {
            await joinMatchAction({
                playerId,
                matchId: data.id,
                name: input.organizerName,
                role: "organizer",
            });
        }

        router.push(`/${data.shortCode}`);
    }

    return {submitCreateMatch};
}