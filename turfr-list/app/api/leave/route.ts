import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.formData();

    const participation_id = String(formData.get("participation_id"));

    if (!participation_id) {
        return NextResponse.redirect(req.headers.get("referer") || "/");
    }

    await supabase
        .from("participation")
        .delete()
        .eq("id", participation_id);

    return NextResponse.redirect(req.headers.get("referer") || "/");
}