"use client";

import { useEffect, useState } from "react";

export default function PlayerList({ players }: { players: any[] }) {
    const [storedName, setStoredName] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setStoredName(name);
    }, []);

    return (
        <ul className="mt-0 mb-0">
            {players.map((p, i) => {

                const isYou =
                    storedName?.trim().toLowerCase() === p.playerName?.trim().toLowerCase();
                console.log("storedName:", storedName, "player:", p.playerName);

                return (
                    <li
                        key={p.id}
                        className={`flex items-center px-3 text-sm transition-all duration-300 ease-out transform hover:translate-y-[-1px]
  ${isYou
                            ? "player-you"
                            : i % 2 === 0
                                ? "bg-zinc-900/60 hover:bg-zinc-700"
                                : "bg-black-90 hover:bg-zinc-700"
                        }`}
                    >
                        {/* LEFT SIDE */}
                        <div className="flex-1">
                            {p.playerName} {isYou && "(You)"}
                        </div>

                        {/* RIGHT SIDE */}
                        {isYou && (
                            <form action="/api/leave" method="POST" className="ml-3">
                                <input type="hidden" name="participation_id" value={p.id} />
                                {/*<button className="bg-red-500 hover:bg-red-400 text-white text-xs px-3 py-1 rounded-md font-semibold transition">*/}

                                {/*    Leave*/}
                                {/*</button>*/}
                                <button
                                    className="text-red-400 hover:text-red-300 transition flex items-center"
                                >
                                    <span className="material-symbols-outlined text-[16px] leading-none">
                                      logout
                                    </span>
                                </button>

                            </form>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}