import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const formData = await req.formData();

    const match_id = formData.get("match_id");
    const name = formData.get("name");

    if (!match_id || !name) {
        return NextResponse.json({ error: "Invalid input"}, { status : 400 });
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
            },
        ]);

    if (joinError) {
        return NextResponse.json({ error: joinError.message }, { status: 500 });
    }

    return NextResponse.redirect(req.headers.get("referer") || "/");
}