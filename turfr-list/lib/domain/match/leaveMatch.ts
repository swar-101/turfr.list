import {supabase} from "@/lib/supabase";

export async function leaveMatch(matchId: string, playerId: string) {
    const { error } = await supabase.rpc("leave_match_transaction", {
        p_match_id: matchId,
        p_player_id: playerId,
    });

    if (error) throw new Error(error.message);
}