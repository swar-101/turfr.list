"use client";

import PlayerNameInput from "@/components/PlayerNameInput";

type PlayerParticipation = {
    id: string,
    status: string,
    joined_at: string,
    players: {
      name: string
    };
};

export default function JoinSection ({ players, matchId }: { players: PlayerParticipation[]; matchId: string; }) {

    let playerName = "";

    if (typeof window !== "undefined") {
        playerName = localStorage.getItem("turfr_player_name") || "";
    }

    const alreadyJoined =
        playerName &&
        players.some(
            (p) => p.players.name.toLowerCase() === playerName.toLowerCase()
        );

    if (alreadyJoined) {
        return (
            <div className="text-green-500 font-semibold">
                ✅ You joined as {playerName}
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