"use client";

import { useEffect, useState } from "react";
import {prioritizeYou} from "@/util/prioritizeYou";



export default function PlayerList({ players }: { players: any[] }) {
    const [storedName, setStoredName] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setStoredName(name);
    }, []);

    const sortedPlayers = prioritizeYou(players, storedName);

    const youPlayer = players.find(
        (p) =>
            storedName?.trim().toLowerCase() ===
            p.playerName?.trim().toLowerCase()
    );

    const otherPlayers = players.filter(
        (p) =>
            storedName?.trim().toLowerCase() !==
            p.playerName?.trim().toLowerCase()
    );

    return (
        <ul className="mt-0 mb-0 pb-2">

            <ul className="mt-0 mb-0 pb-2">

                {/* 🔥 FIXED YOU */}
                {youPlayer && (
                    <li className="flex items-center px-3 py-0.3 text-sm player-you">
                        <div className="flex-1">
                            {youPlayer.playerName}
                            <span className="text-zinc-400 ml-1">(You)</span>
                        </div>

                        <form action="/api/leave" method="POST" className="ml-3">
                            <input type="hidden" name="participation_id" value={youPlayer.id} />
                            <button className="text-red-400 hover:text-red-300 transition flex items-center">
          <span className="material-symbols-outlined text-[16px] leading-none">
            logout
          </span>
                            </button>
                        </form>
                    </li>
                )}

                {/* 🔽 SCROLLABLE LIST */}
                {otherPlayers.map((p, i) => (
                    <li
                        key={p.id}
                        className={`flex items-center px-3 py-0.3 text-sm transition-all duration-300 ease-out transform hover:translate-y-[-1px]
        ${i % 2 === 0
                            ? "bg-zinc-900/50 hover:bg-zinc-800"
                            : "bg-black/50 hover:bg-zinc-800"
                        }`}
                    >
                        <div className="flex-1">{p.playerName}</div>
                    </li>
                ))}

            </ul>
        </ul>
    );
}