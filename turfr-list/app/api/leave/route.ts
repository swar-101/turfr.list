import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();

    const participation_id = String(formData.get("participation_id"));

    if (!participation_id) {
        return NextResponse.redirect(req.headers.get("referer") || "/");
    }

    // 1. Find participation before deleting
    const { data : participation } = await supabase
        .from("participation")
        .select("match_id")
        .eq("id", participation_id)
        .single();

    if (!participation) {
        return NextResponse.redirect(req.headers.get("referer") || "/");
    }

    const match_id = participation.match_id;

    // 2. Delete the player leaving
    await supabase
        .from("participation")
        .delete()
        .eq("id", participation_id);

    // 3. Get match capacity
    const { data: match } = await supabase
        .from("matches")
        .select("max_players")
        .eq("id", match_id)
        .single();

    // 4. Count active players
    const { count } = await supabase
        .from("participation")
        .select("*", { count: "exact", head: true })
        .eq("match_id", match_id)
        .eq("status", "active");

    // 5. Promote waitlist only if slot exists
    if (match && count !== null && count < match.max_players) {
        const { data: waitlistPlayer } = await supabase
            .from("participation")
            .select("id")
            .eq("match_id", match_id)
            .eq("status", "waitlist")
            .order("joined_at", { ascending: true })
            .limit(1)
            .maybeSingle();

        if (waitlistPlayer) {
            await supabase
                .from("participation")
                .update({ status: "active" })
                .eq("id", waitlistPlayer.id);
        }
    }

    return NextResponse.redirect(req.headers.get("referer") || "/");
}