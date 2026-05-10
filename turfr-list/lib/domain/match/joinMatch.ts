import {
    JoinMatchInput,
    JoinMatchResult
} from "@/lib/domain/match/types";

import {supabase} from "@/lib/supabase";

/* Use-case: User joins a match */
export async function joinMatch(
    input: JoinMatchInput
): Promise<JoinMatchResult> {

    const { data, error } = await supabase.rpc("join_match_transaction", {
        p_player_id: input.playerId,
        p_name: input.name,
        p_match_id: input.matchId,
        p_role: input.role ?? "player",
    })

    if (error) {
        throw new Error(error.message);
    }

    const result = data[0];

    return {
        playerId: result.player_id,
        status: result.status,
        role: result.role
    };
}