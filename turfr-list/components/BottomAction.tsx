"use client";

import { useEffect, useState } from "react";

export default function BottomAction({
                                         match,
                                         players,
                                         onPayClick,
                                         onBackAction,
                                         mode,
                                     }: any) {

    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        if (!match.turf_confirmed && mode === "payment") {
            onBackAction();
        }
    }, [match.turf_confirmed, mode, onBackAction]);

    useEffect(() => {
        const stored = localStorage.getItem("turfr_player_name");
        if (stored) setPlayerName(stored);
    }, []);

    const participation = players?.find((p: any) => {
        const name = p.players?.name?.trim().toLowerCase();
        const current = playerName?.trim().toLowerCase();

        return name && current && name === current;
    });

    const isOrganizer =
        match.organizer_name?.toLowerCase() === playerName?.toLowerCase();

    const alreadyJoined = !!participation;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">

            {/* Blur Layer (masked for gradual fade) */}
            <div
                className="absolute inset-0 pointer-events-none backdrop-blur-xl"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 80%)",
                    maskImage:
                        "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 80%)",
                }}
            />

            {/* Subtle darkening (depth, not a wall) */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 via-50% to-transparent" />

            <div className="relative max-w-md mx-auto p-4 pb-4 mt-4">

                {/* Event: Player is yet to join */}
                {!alreadyJoined && (
                    <form action="/api/join" method="POST" className="flex gap-2">
                        <input type="hidden" name="match_id" value={match.id} />

                        <input
                            name="name"
                            value={playerName}
                            onChange={(e)=> {
                                setPlayerName(e.target.value);
                                localStorage.setItem("turfr_player_name", e.target.value)
                            }}
                            placeholder="Your name"
                            className="flex-1 bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-2 text-white"
                        />

                        <button
                            className="bg-zinc-800/80 backdrop-blur-sm hover:bg-zinc-700 text-white px-4 py-2 rounded-lg"
                        >
                            Join
                        </button>
                    </form>
                )}

                {/* Event: Player joins but turf not booked */}
                {alreadyJoined && !match.turf_confirmed && (
                    <div className="text-center text-yellow-400 font-medium">
                        Waiting for organizer to confirm turf
                    </div>
                )}

                {/* Event: Non-organizer Player joins and turf is booked */}
                {alreadyJoined && match.turf_confirmed && !isOrganizer && (
                    <>
                        {mode === "list" && (
                            <button
                                onClick={onPayClick}
                                className="w-full bg-green-700 hover:bg-green-500 text-white py-3 rounded-xl font-medium"
                            >
                                Pay ₹{match.price_per_player}
                            </button>
                        )}

                        {mode === "payment" && (
                            <button
                                onClick={onBackAction}
                                className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-xl font-medium"
                            >
                                I&#39;ve Paid
                            </button>
                        )}
                    </>
                )}

                {/* Event: Organizer Player joins and turf is booked */}
                {isOrganizer && match.turf_confirmed && (
                    <div className="text-center text-blue-400 font-medium">
                        Collect payments from players
                    </div>
                )}
            </div>
        </div>
    );
}