import { supabase } from "@/lib/supabase";
import MatchPageClient from "@/components/MatchPageClient";

export default async function MatchPage({
                                            params,
                                        }: {
    params: Promise<{ id: string }>;
}) {

    const { id } = await params;

    const { data: match } = await supabase
        .from("matches")
        .select("*")
        .eq("short_code", id.toUpperCase())
        .maybeSingle();

    if (!match) {
        return <div>Match not found</div>;
    }

    const { data: players } = await supabase
        .from("participation")
        .select("id, status, joined_at, players(name)")
        .eq("match_id", match.id)
        .order("joined_at", { ascending: true });

    const safePlayers= players ?? [];

    return (
        <MatchPageClient
            match={match}
            players={safePlayers}
        />
    );
}