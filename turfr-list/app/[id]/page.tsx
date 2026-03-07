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
        <main className="min-h-screen flex justify-center px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
            <div className="w-full max-w-md flex flex-col gap-2">

                <AutoRefresh />

                <MatchHeader match={match} />

                <CopyLinkButton />
                <div className="flex-1 overflow-y-auto px-4 space-y-4">
                    <JoinSection players={players || []} matchId={id} />
                    <PlayingCard players={activePlayers} maxPlayers={match.max_players} />
                    <WaitlistCard players={waitlistPlayers} />
                </div>

                <BottomAction match={match} />

            </div>
        </main>
    );
}