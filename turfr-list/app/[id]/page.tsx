import { supabase } from "@/lib/supabase";
import JoinSection, { PlayerParticipation } from "@/components/JoinSection";
import AutoRefresh from "@/components/AutoRefresh";
import CopyLinkButton from "@/components/CopyLinkButton";
import MatchHeader from "@/components/MatchHeader";
import BottomAction from "@/components/BottomAction"
import PlayingCard from "@/components/PlayingCard";
import WaitlistCard from "@/components/WaitlistCard";

export default async function MatchPage({ params, }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    const { data: match } = await supabase
        .from("matches")
        .select("*")
        .eq("id", id)
        .single();

    if (!match) {
        return <div>Match not found</div>;
    }

    const { data: players } = await supabase
        .from("participation")
        .select("id, status, joined_at, players(name)")
        .eq("match_id", id)
        .order("joined_at", { ascending: true }) as { data: PlayerParticipation[] | null};

    console.log("PLAYERS DATA:", players);

    const normalizedPlayers =
        players?.map((p) => ({
            ...p,
            playerName: p.players?.name ?? "Unknown",
        })) || [];

    const activePlayers = normalizedPlayers.filter(p => p.status === "active");
    const waitlistPlayers = normalizedPlayers.filter(p => p.status === "waitlist");

    return (
        <main className="h-full flex flex-col bg-gradient-to-b from-zinc-950 via-black to-zinc-950">

            <AutoRefresh />

            {/* HEADER */}
            <div className="flex-shrink-0">
                <MatchHeader match={match} />
            </div>

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-md mx-auto px-4 space-y-4 pb-28">

                    <CopyLinkButton />

                    <JoinSection players={players || []} matchId={id} />

                    <PlayingCard
                        players={activePlayers}
                        maxPlayers={match.max_players}
                    />

                    <WaitlistCard players={waitlistPlayers} />

                </div>
            </div>

            {/* BOTTOM ACTION */}
            <BottomAction match={match} />

        </main>
    );
}