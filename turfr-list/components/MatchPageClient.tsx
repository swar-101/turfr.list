"use client";

import { useState } from "react";

import AutoRefresh from "@/components/AutoRefresh";
import MatchHeader from "@/components/MatchHeader";
import BottomAction from "@/components/BottomAction";
import PlayingCard from "@/components/PlayingCard";
import WaitingCard from "@/components/WaitingCard";
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

    const showWaitlist = waitlistPlayers.length > 0;

    return (
        <main className="min-h-[100dvh] flex flex-col text-zinc-300">
            <div
                className="flex flex-col flex-1 min-h-0 bg-black/70"
                style={{
                    backgroundImage: "url('/grass-dark.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

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
                    {/*<div className="flex-1 overflow-y-auto min-h-0">*/}
                    <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                        {/*<div className="max-w-md mx-auto px-4 space-y-4">*/}
                        {/*<div className="max-w-md mx-auto px-4 flex flex-col flex-1 min-h-0 pb-24">*/}
                        <div className="w-full max-w-lg mx-auto px-4 flex flex-col pb-[100px]">

                            {/* Edit View for Organizers only */}
                            {view === "edit" && (
                                <EditMatch match={match} onClose={()=> setView("default")} />
                            )}

                            {/* Info View for Match Details */}
                            {view === "info" && (
                                <MatchCard match={match} onClose={() => setView("default")} />
                            )}

                            {/*// TODO: Optimize player prioritization logic (single-pass promotion instead of filter-based split)*/}
                            {/*// Reason: current implementation is fine for small lists but not ideal for scalability*/}
                            {mode === "list" && (
                                <div className="flex flex-col flex-1 min-h-0 gap-0">

                                    {/* Playing */}
                                    <PlayingCard
                                        players={activePlayers}
                                        maxPlayers={match.max_players}
                                    />

                                    {/* Waitlist */}
                                    {waitlistPlayers.length > 0 && (
                                        <div className="flex-shrink-0">
                                            <WaitingCard players={waitlistPlayers} />
                                        </div>
                                    )}

                                </div>
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
            </div>
        </main>
    );
}