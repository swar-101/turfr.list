"use client";

import { useEffect, useState } from "react";

export default function BottomAction({ match, players } : any) {

    // const [ playerName, setPlayerName ] = useState<string | null>(null);
    const [playerName, setPlayerName] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem("turfr_player_name");
        if (stored) setPlayerName(stored);
    }, []);

    const participation = players?.find((p : any) => {
        const name = p.players?.name;
        return (
            playerName &&
            name &&
            name.toLowerCase() === playerName.toLowerCase()
        );
    });

    const alreadyJoined = !!participation;

    /*
    * TODO: Check if we can create a message description while making the payment
    *       so that it's convenient for the organizer to track.
    * */
    const upiLink = `upi://pay?pa=${match.upi_id}&pn=Turfr&am=${match.price_per_player}&cu=INR`;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-zinc-800 backdrop-blur">
            <div className="max-w-md mx-auto p-4">

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
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                        />

                        <button
                            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg"
                        >
                            Join
                        </button>
                    </form>
                )}

                {alreadyJoined && !match.turf_confirmed && (
                    <div className="text-center text-green-400 font-medium">
                        ✓ You joined as {playerName}
                    </div>
                )}

                {alreadyJoined && match.turf_confirmed && (
                    <a
                        href={upiLink}
                        className="block w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-center font-medium"
                    >
                        Pay via UPI
                    </a>
                )}
            </div>
        </div>
    );
}