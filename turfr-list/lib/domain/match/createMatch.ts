import { supabase } from "@/lib/supabase";
import {CreateMatchInput, CreateMatchResult} from "@/lib/domain/match/types";

function generateShortCode(length = 5) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

export async function createMatch(
    input : CreateMatchInput
): Promise<CreateMatchResult> {

    const { data, error } = await supabase
        .from("matches")
        .insert([
            {
                organizer_name: input.organizerName,
                max_players: input.maxPlayers,
                short_code: generateShortCode(),
            },
        ])
        .select()
        .single();

    if (error) throw error;

    return {
        id: data.id,
        shortCode: data.short_code,
        organizerName: data.organizer_name,
        maxPlayers: data.max_players,
    };
}