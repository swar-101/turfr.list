import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

/*
* TODO: Write a cleaner and safter join API
* */
export async function POST(req: Request) {
    const formData = await req.formData();

    const match_id = String(formData.get("match_id"));
    const name = String(formData.get("name")).trim();

    if (!match_id || !name) {
        return NextResponse.json({ error: "Invalid input"}, { status: 400 });
    }

    // 1. Find existing player
    let { data: player } = await supabase
        .from("players")
        .select("id")
        .eq("name", name)
        .maybeSingle();

    // 2. Create player if not found
    console.log("CREATING A NEW PLAYER")
    if (!player) {
        const { data: newPlayer } = await supabase
            .from("players")
            .insert([{ name }])
            .select()
            .single();

        player = newPlayer;
    }

    if (!player) {
        return NextResponse.json({ error: "Player creation failed" }, { status: 500 });
    }

    // 3. Check existing participation
    const { data: existing } = await supabase
        .from("participation")
        .select("id")
        .eq("match_id", match_id)
        .eq("player_id", player.id)
        .maybeSingle();

    if (existing) {
        return NextResponse.redirect(req.headers.get("referer") || "/");
    }

    // 4. Fetch match capacity
    const { data: match } = await supabase
        .from("matches")
        .select("max_players")
        .eq("id", match_id)
        .single();

    // 5. Count active players
    const { count } = await supabase
        .from("participation")
        .select("*", { count: "exact", head: true })
        .eq("match_id", match_id)
        .eq("status", "active");

    // 6. Decide status
    let status = "active";
    if (count !== null && match && count >= match.max_players) {
        status = "waitlist";
    }

    // 7. Insert participation
    await supabase
        .from("participation")
        .insert([
            {
                match_id,
                player_id: player.id,
                status,
            },
        ]);

    return NextResponse.redirect(req.headers.get("referer") || "/");
}