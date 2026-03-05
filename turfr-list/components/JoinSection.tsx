"use client";

import PlayerNameInput from "@/components/PlayerNameInput";
import { useState, useEffect } from "react";

type PlayerParticipation = {
    id: string,
    status: string,
    joined_at: string,
    players: {
      name: string
    };
};

export default function JoinSection ({ players, matchId }: { players: PlayerParticipation[]; matchId: string; }) {

    const [playerName, setPlayerName] = useState<string | null>(null);
    const [alreadyJoined, setAlreadyJoined] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("turfr_player_name");

        if(!stored) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setPlayerName("");
            return;
        }

        setPlayerName(stored);

        const joined = players.some(
            (p) => p.players.name.toLowerCase() === stored.toLowerCase()
        );

        setAlreadyJoined(joined);
    }, [players]);

    if (playerName === null) {
        return null;
    }

    if (alreadyJoined) {
        return (
            <div className ="text-green-500 font-semibold">
                You joined as {playerName} ✅
            </div>
        );
    }

    return (
        <form action="/api/join" method="POST">
            <input type="hidden" name="match_id" value={matchId}/>
            <PlayerNameInput />
            <button className="bg-black text-white p-2 rounded ml-2">
                Join Match
            </button>
        </form>
    );
}