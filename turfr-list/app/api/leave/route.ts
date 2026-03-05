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

    // 3. Find first waitlist player
    const { data: waitlistPlayer } = await supabase
        .from("participation")
        .select("id")
        .eq("match_id", match_id)
        .eq("status", "waitlist")
        .order("joined_at", { ascending: true })
        .limit(1)
        .maybeSingle();

    // 4. Promote waitlist player
    if (waitlistPlayer) {
        await supabase
            .from("participation")
            .update({ status: "active" })
            .eq("id", waitlistPlayer.id)
    }

    return NextResponse.redirect(req.headers.get("referer") || "/");
}