"use client";

import {useEffect, useRef} from "react";
import { useScrollIndicators } from "@/components/match/hooks/useScrollIndicators";
import { useCurrentUser } from "@/components/match/hooks/useCurrentUser";
import {isYou} from "@/components/match/utils/you";
import FadeOverlay from "@/components/match/components/FadeOverlay";
import ScrollArrow from "@/components/match/components/ScrollArrow";

function PlayerListFixedYou({ players }: { players: any[] }) {

    const storedName = useCurrentUser();

    const youPlayer = players.find(
        (p) =>
            isYou(p.playerName, storedName)
    );

    if (!youPlayer) return null;

    return (
        <div className="flex items-center px-3 py-0.3 text-sm player-list-you">
            <div className="flex-1">
                {youPlayer.playerName}
                <span className="text-zinc-400 ml-1">(You)</span>
            </div>

            <form action="/api/leave" method="POST" className="ml-3">
                <input type="hidden" name="participation_id" value={youPlayer.id} />
                <button className="text-red-400 hover:text-red-300 transition flex items-center">
                    <span className="material-symbols-outlined text-[16px]">
                        logout
                    </span>
                </button>
            </form>
        </div>
    );
}

function PlayerListOthers({ players }: { players: any[] }) {
    const storedName = useCurrentUser();

    const others = players.filter(
        (p) => !isYou(p.playerName, storedName)
    );

    return (
        <ul className="mt-0 mb-0">
            {others.map((p, i) => (
                <li
                    key={p.id}
                    className={`flex items-center px-3 py-0.3 text-sm
            ${i % 2 === 0
                        ? "bg-zinc-900/50"
                        : "bg-black/50"
                    }`}
                >
                    <div className="flex-1">{p.playerName}</div>
                </li>
            ))}
        </ul>
    );
}


export default function PlayingCard({
                                        players,
                                        maxPlayers,
                                    }: {
    players: any[];
    maxPlayers: number;
}) {

    const ratio = players.length / maxPlayers;

    let barColor = "#22c55e";
    if (ratio > 0.7) barColor = "#eab308";
    if (ratio >= 1) barColor = "#ef4444";


    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { atTop, atBottom, isScrollable } = useScrollIndicators(scrollRef, players);

    const storedName = useCurrentUser();

    const hasYou = players.some(
        (p) => isYou(p.playerName, storedName)
    );

    // const ROW_HEIGHT = 30;
    const ROW_HEIGHT = 20; // same as waitlist (keep consistency)
    const PLAYING_CAP = 14;
    const visibleOthers = hasYou
        ? PLAYING_CAP - 1
        : PLAYING_CAP;
    const FADE_HEIGHT = 24;


    return (
        <div className="bg-black/90 mt-1 mb-0 flex flex-col min-h-0">

            {/* Header */}
            <div className="grid grid-cols-3 items-center text-sm text-zinc-300 px-3 py-1">
                <div />
                <div className="text-center font-medium">
                    Playing
                </div>
                <div className="text-right text-xs text-zinc-500">
                    {players.length}/{maxPlayers}
                </div>
            </div>

            {/* Progress bar (separate visual layer) */}
            <div className="px-3 py-0.5 mb-2.5">
                <div
                    style={{
                        height: "4px",
                        background: "#1f1f23",
                        borderRadius: "999px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${Math.min((players.length / maxPlayers) * 100, 100)}%`,
                            background: barColor,
                            transition: "width 0.35s ease",
                        }}
                    />
                </div>
            </div>

            {/* Player list */}
            <div className="relative flex flex-col flex-1 min-h-0">

                {/* 🔥 Fixed YOU (untouched) */}
                <PlayerListFixedYou players={players} />

                {/* 🔽 Scroll zone */}
                <div className="relative">

                    <div
  ref={scrollRef}
  style={{
    maxHeight: `${visibleOthers * ROW_HEIGHT}px`
  }}
  className="overflow-y-auto"
>
                        <PlayerListOthers players={players} />
                    </div>

                    {/* 🔼 TOP FADE + ARROW */}
                    {isScrollable && !atTop && (
                        <>
                            <FadeOverlay position="top" />
                            <ScrollArrow direction="up" visible={isScrollable && !atTop} />
                        </>
                    )}

                    {/* 🔽 BOTTOM FADE + ARROW */}
                    {isScrollable && !atBottom && (
                        <>
                            <FadeOverlay position="bottom" />
                            <ScrollArrow direction="down" visible={isScrollable && !atBottom} />
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}