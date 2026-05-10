import {supabase} from "@/lib/supabase";
import {Database} from "@/types/generated/supabase";

export async function getMatch(matchId: string) {
    const { data: match } = await supabase
        .from("matches")
        .select("max_players")
        .eq("id", matchId)
        .single();

    if (!match) {
        throw new Error("Match not found");
    }
    return match;
}

type MatchUpdate = Database["public"]["Tables"]["matches"]["Update"];

export async function updateMatchRepo(matchId: string, payload: MatchUpdate) {
    const { data, error } = await supabase
        .from("matches")
        .update(payload)
        .eq("id", matchId)
        .select();

    if (error) throw error;

    return data;
}