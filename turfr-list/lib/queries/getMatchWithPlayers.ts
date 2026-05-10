import { supabase } from "@/lib/supabase";
import { RawParticipation } from "@/lib/types/participation";
import { MatchRow } from "@/types/db/match";

type GetMatchWithPlayersResult = {
    match: MatchRow;
    players: RawParticipation[];
} | null;

export async function getMatchWithPlayers(
    shortCode: string
): Promise<GetMatchWithPlayersResult> {

    const { data: match } = await supabase
        .from("matches")
        .select(`
            *,
            organizer:players!organizer_id(name)
        `)
        .eq("short_code", shortCode.toUpperCase())
        .maybeSingle();

    if (!match) return null;

    const { data: players } = await supabase
        .from("participation")
        .select("id, status, joined_at, player_id, players(name)")
        .eq("match_id", match.id)
        .order("joined_at", { ascending: true });

    return {
        match: {
            ...match,
            organizer_name: match.organizer?.name || match.organizer_name
        },
        players: players ?? [],
    };
}