"use client";

import { useState } from "react";

import AutoRefresh from "@/components/AutoRefresh";
import MatchHeader from "@/components/MatchHeader";
import BottomAction from "@/components/BottomAction";
import PlayingCard from "@/components/PlayingCard";
import WaitlistCard from "@/components/WaitlistCard";
import EditMatch from "@/components/EditMatch";
import MatchCard from "@/components/MatchCard";
import PaymentSection from "@/components/PaymentSection";

type MatchPageClientProps = {
    match: any
    players: any[]
}

export default function MatchPageClient({
  match,
  players,
}: MatchPageClientProps) {

    const [view, setView] = useState<"default" | "edit" | "info">("default");
    const [ mode, setMode ] = useState<"list" | "payment">("list");

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
        <main className="h-full flex flex-col bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-zinc-200">

            {/* AUTO REFRESH (TEMP) */}
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

                    {mode === "list" && (
                        <>
                            <PlayingCard
                                players={activePlayers}
                                maxPlayers={match.max_players}
                            />

                            <WaitlistCard players={waitlistPlayers} />
                        </>
                    )}

                    {/* TODO: Change the hardcoded UPI ID to Organizer's input */}
                    {mode === "payment" && (
                            <PaymentSection
                                upiId="swar.kunwar8@okhdfcbank"
                                amount={match.price_per_player}
                                onBackAction={() => setMode("list")}
                            />
                    )}

                </div>
            </div>

            {/* BOTTOM ACTION */}
            <BottomAction
                match={match}
                players={players}
                onPayClick={() => setMode("payment")}
                onBackAction={() => setMode("list")}
                mode={mode}
            />

        </main>
    );
}