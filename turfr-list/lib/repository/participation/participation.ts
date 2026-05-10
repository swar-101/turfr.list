import {supabase} from "@/lib/supabase";
import {InsertParticipationInput} from "@/lib/repository/participation/types";

export async function findParticipation(matchId: string, playerId: string) {
    const { data } = await supabase
        .from("participation")
        .select("*")
        .eq("match_id", matchId)
        .eq("player_id", playerId)
        .maybeSingle();

    return data;
}

export async function countActiveParticipants(matchId: string) {

}

export async function insertParticipation(input: InsertParticipationInput) {
    const {matchId, playerId, status, role}  = input;

    const { error } = await supabase
        .from("participation")
        .insert([
            {
                match_id: matchId,
                player_id: playerId,
                status,
                role,
            },
        ]);

    if (error) {
        throw new Error("Participation insert failed");
    }
}