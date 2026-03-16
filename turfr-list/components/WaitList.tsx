"use client";

import { useEffect, useState } from "react";
import {toast} from "sonner";

export default function WaitList({ players } : { players: any[]}) {
    const [ storedName, setStoredName ] = useState<string | null>(null);
    const [wasInWaitlist, setWasInWaitlist] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setStoredName(name);

        if (!name) return;

        const currentlyInWaitlist = players.some(
            (p) => p.playerName.toLowerCase() === name.toLowerCase()
        );

        if (wasInWaitlist && !currentlyInWaitlist) {
            toast.success("🎉 You're now playing!");
        }

        setWasInWaitlist(currentlyInWaitlist);
    }, [players]);

    const yourWaitlistIndex = players.findIndex(
        (p) => storedName?.toLowerCase() === p.playerName.toLowerCase()
    );

    return (
        <>
            {yourWaitlistIndex >= 0 && (
                <p className="text-sm text-yellow-400 mb-2 mt-1 px-2">
                    You are #{yourWaitlistIndex + 1} in the waitlist
                </p>
            )}

            <ul className="mt-3">
                {players.map((p, i) => {
                    const isYou =
                        storedName?.toLowerCase() === p.playerName.toLowerCase();

                    return (
                        <li
                            key={p.id}
                            className={`flex items-center px-3 text-sm transition-all duration-300 ease-out transform hover:translate-y-[-1px]
                            ${isYou
                                ? "bg-blue-500/20 border-l-4 border-blue-400 text-blue-200"
                                : i % 2 === 0
                                    ? "bg-zinc-900/60 hover:bg-zinc-700"
                                    : "bg-black-90 hover:bg-zinc-700"
                            }`}
                        >
                            {/* LEFT SIDE */}
                            <div className="flex-1">
                                #{i + 1} {p.playerName} {isYou && <span className="text-zinc-500 ml-1">(You)</span> }
                            </div>
                            {isYou && (
                                <form action="/api/leave" method="POST" className="ml-3">
                                    <input type="hidden" name="participation_id" value={p.id} />
                                    <button
                                        className="text-red-400 hover:text-red-300 transition flex items-center"
                                    >
                                    <span className="material-symbols-outlined text-[18px]">
                                        logout
                                    </span>
                                    </button>
                                </form>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}