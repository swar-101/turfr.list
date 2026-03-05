import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const formData = await req.formData();

    const match_id = formData.get("match_id");
    const name = formData.get("name");

    if (!match_id || !name) {
        return NextResponse.json({ error: "Invalid input"}, { status : 400 });
    }

    // fetch match capacity
    const { data: match } = await supabase
        .from("matches")
        .select("max_players")
        .eq("id", match_id)
        .single();

    // count active players
    const { count } = await supabase
        .from("participation")
        .select("*", { count: "exact", head: true})
        .eq("match_id", match_id)
        .eq("status", "active");

    // decide status
    let status = "active";
    if (count != null && match && count >= match.max_players) {
        status = "waitlist";
    }

    // create player
    const { data: player, error: playerError } = await supabase
        .from("players")
        .insert([{ name }])
        .select()
        .single();
    if (playerError) {
        return NextResponse.json({ error: playerError.message }, { status: 500 });
    }

    // create participation
    const { error: joinError } = await supabase
        .from("participation")
        .insert([
            {
                match_id,
                player_id: player.id,
                status,
            },
        ]);
    if (joinError) {
        return NextResponse.json({ error: joinError.message }, { status: 500 });
    }

    return NextResponse.redirect(req.headers.get("referer") || "/");
}