"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCurrentUser } from "@/components/match/hooks/useCurrentUser";
import { isYou } from "@/components/match/utils/you";

export default function WaitList({ players }: { players: any[] }) {

    const storedName = useCurrentUser();
    const [wasInWaitlist, setWasInWaitlist] = useState(false);

    useEffect(() => {
        if (!storedName) return;

        const currentlyInWaitlist = players.some((p) =>
            isYou(p.playerName, storedName)
        );

        if (wasInWaitlist && !currentlyInWaitlist) {
            toast.success("🎉 You're now playing!");
        }

        setWasInWaitlist(currentlyInWaitlist);
    }, [players, storedName, wasInWaitlist]);


    return (
        <ul className="mt-0">
            {players.map((p, i) => {
                const isCurrentUser = isYou(p.playerName, storedName);

                return (
                    <li
                        key={p.id}
                        className={`flex items-center px-3 py-0.3 text-sm transition-all duration-300 ease-out transform hover:translate-y-[-1px]
            ${
                            isCurrentUser
                                ? "wait-list-you"
                                : i % 2 === 0
                                    ? "bg-zinc-900/60 hover:bg-zinc-800"
                                    : "bg-black/50 hover:bg-zinc-800"
                        }`}
                    >
                        <div className="flex items-center gap-3 flex-1">

                            {/* Number */}
                            <span
                                className={`w-6 text-xs text-right ${
                                    isCurrentUser ? "text-yellow-400" : "text-zinc-500"
                                }`}
                            >
                                {i + 1}
                            </span>

                            {/* Name */}
                            <span>
                                {p.playerName}
                                {isCurrentUser && (
                                    <span className="text-yellow-200 ml-1">(You)</span>
                                )}
                            </span>

                        </div>


                        {isCurrentUser && (
                            <form action="/api/leave" method="POST" className="ml-3">
                                <input
                                    type="hidden"
                                    name="participation_id"
                                    value={p.id}
                                />
                                <button className="text-zinc-200 hover:text-red-300 transition flex items-center">
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
    );
}