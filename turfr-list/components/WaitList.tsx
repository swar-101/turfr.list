"use client";

import { useEffect, useState } from "react";

export default function WaitList({ players } : { players: any[]}) {
    const [ storedName, setStoredName ] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setStoredName(name);

        if (!name) return;



    }, [players]);

    const yourWaitlistIndex = players.findIndex(
        (p) => storedName?.toLowerCase() === p.playerName.toLowerCase()
    );

    return (
        <>
            {yourWaitlistIndex >= 0 && (
                <p className="text-sm text-yellow-400 mb-2">
                    You are #{yourWaitlistIndex + 1} in the waitlist
                </p>
            )}

            <ul className="mt-3 space-y-3">
                {players.map((p, index) => {
                    const isYou =
                        storedName?.toLowerCase() === p.playerName.toLowerCase();

                    return (
                        <li
                            key={p.id}
                            className={`px-3 py-2 rounded-md border transition-all duration-300 ease-out transform hover:translate-y-[-1px] ${
                                isYou
                                    ? "bg-green-950/70 border-green-800 border-l-4 text-green-200"
                                    : "bg-zinc-800/70 border-zinc-700/50 hover:bg-zinc-700"
                            }`}
                        >
                            #{index + 1} {p.playerName} {isYou && "(You)"}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}