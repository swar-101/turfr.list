"use client";

import { useState } from "react";

import JoinSection from "@/components/JoinSection";
import AutoRefresh from "@/components/AutoRefresh";
import MatchHeader from "@/components/MatchHeader";
import BottomAction from "@/components/BottomAction";
import PlayingCard from "@/components/PlayingCard";
import WaitlistCard from "@/components/WaitlistCard";
import EditMatch from "@/components/EditMatch";
import MatchCard from "@/components/MatchCard";

type MatchPageClientProps = {
    match: any
    players: any[]
    matchId: string
}

export default function MatchPageClient({
  match,
  players,
  matchId
}: MatchPageClientProps) {

    const [view, setView] = useState<"default" | "edit" | "info">("default");

    const normalizedPlayers =
    players?.map((p: any) => ({
      ...p,
      playerName: p.players?.name ?? "Unknown",
    })) || [];

    const activePlayers = normalizedPlayers.filter(
    (p: any) => p.status === "active"
    );

    const waitlistPlayers = normalizedPlayers.filter(
    (p: any) => p.status === "waitlist"
    );

    return (
    <main className="h-full flex flex-col bg-gradient-to-b from-zinc-950 via-black to-zinc-950">

      <AutoRefresh />

      {/* HEADER */}
      <div className="flex-shrink-0">
        <MatchHeader
          match={match}
          onEdit={() => setView("edit")}
          onInfo={() => setView("info")}
        />
      </div>

      {/* SCROLL AREA */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-4 space-y-4 pb-28">


            {view === "edit" && (
                <EditMatch match={match} onClose={()=> setView("default")} />
            )}

            {view === "info" && (
                <MatchCard match={match} onClose={() => setView("default")} />
            )}

            {/*<JoinSection players={players || []} matchId={matchId} />*/}

            <PlayingCard
                players={activePlayers}
                maxPlayers={match.max_players}
            />

            <WaitlistCard players={waitlistPlayers} />

        </div>
      </div>

      {/* BOTTOM ACTION */}
      <BottomAction match={match} players={players} />

    </main>
    );
}