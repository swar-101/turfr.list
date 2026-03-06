"use client";

import PlayerNameInput from "@/components/PlayerNameInput";
import { useState, useEffect } from "react";

export type PlayerParticipation = {
    id: string;
    status: string;
    joined_at: string;
    players: { name: string };
};

export default function JoinSection({
                                        players,
                                        matchId,
                                    }: {
    players: PlayerParticipation[];
    matchId: string;
}) {
    const [playerName, setPlayerName] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("turfr_player_name");
        setPlayerName(stored || "");
    }, []);

    // Prevent hydration mismatch
    if (playerName === null) return null;

    const participation = players.find((p) => {
        const name = p.players?.name;
        return (
            playerName &&
            name &&
            name.toLowerCase() === playerName.toLowerCase()
        );
    });

    const alreadyJoined = !!participation;
    const participationId = participation?.id || null;

    if (alreadyJoined) {
        return (
            <div className="flex flex-col items-center gap-4 mt-2">
                <div className="text-green-500 font-semibold">
                    You joined as {playerName} ✅
                </div>

                <form action="/api/leave" method="POST">
                    <input
                        type="hidden"
                        name="participation_id"
                        value={participationId || ""}
                    />

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center bg-red-500 text-white px-5 py-2 rounded-lg font-medium shadow hover:bg-red-600"
                    >
                        Leave Match
                    </button>
                </form>
            </div>
        );
    }

    return (
        <form action="/api/join" method="POST">
            <input type="hidden" name="match_id" value={matchId} />

            <PlayerNameInput />

            <button
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg transition"
            >
                Join Match
            </button>
        </form>
    );
}