import { supabase } from "@/lib/supabase";
import MatchPageClient from "@/components/MatchPageClient";

export default async function MatchPage({ params, }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    const { data: match } = await supabase
        .from("matches")
        .select("*")
        .eq("id", id)
        .maybeSingle();

    if (!match) {
        return <div>Match not found</div>;
    }

    const { data: players } = await supabase
        .from("participation")
        .select("id, status, joined_at, players(name)")
        .eq("match_id", id)
        .order("joined_at", { ascending: true });

    return (
        <MatchPageClient
            match={match}
            players={players}
            matchId={id}
        />
    );
}