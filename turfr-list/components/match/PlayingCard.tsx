"use client";

import {useRef} from "react";
import {useScrollIndicators} from "@/components/match/hooks/useScrollIndicators";
import FadeOverlay from "@/components/match/ui/FadeOverlay";
import ScrollArrow from "@/components/match/ui/ScrollArrow";
import {PlayerView} from "@/lib/types/participation";

type PlayingCardProps = {
    you?: PlayerView;
    otherPlayers: PlayerView[];
    totalPlayers: number;
    maxPlayers: number;
};

export default function PlayingCard({
                                        you,
                                        otherPlayers,
                                        totalPlayers,
                                        maxPlayers,
                                    }: PlayingCardProps) {

    const ratio = totalPlayers / maxPlayers;

    let barColor = "#22c55e";
    if (ratio > 0.7) barColor = "#eab308";
    if (ratio >= 1) barColor = "#ef4444";

    const scrollRef = useRef<HTMLDivElement | null>(null);

    const {atTop, atBottom, isScrollable} =
        useScrollIndicators(scrollRef, otherPlayers);

    const ROW_HEIGHT = 20;
    const PLAYING_CAP = 14;

    const visibleOthers = you ? PLAYING_CAP - 1 : PLAYING_CAP;

    const totalCapacity = maxPlayers || 0;
    const filledSlots = otherPlayers.length + (you ? 1 : 0);
    const emptySlotsCount = Math.max(0, totalCapacity - filledSlots);

    const emptySlots = Array.from({ length: emptySlotsCount });

    return (
        <div className="bg-black/90 mt-1 mb-0 flex flex-col min-h-0">

            {/* Header */}
            <div className="grid grid-cols-3 items-center text-sm text-zinc-300 px-3 py-1">
                <div/>
                <div className="text-center font-medium">Playing</div>
                <div className="text-right text-xs text-zinc-500">
                    {totalPlayers}/{maxPlayers}
                </div>
            </div>

            {/* Progress */}
            <div className="px-3 py-0.5 mb-2.5">
                <div className="h-[4px] bg-[#1f1f23] rounded-full overflow-hidden">
                    <div
                        style={{
                            width: `${Math.min((totalPlayers / maxPlayers) * 100, 100)}%`,
                            background: barColor,
                        }}
                        className="h-full transition-all duration-300"
                    />
                </div>
            </div>

            {/* YOU */}
            {/* 1. Add the form back into the YOU section */}
            {/* YOU SECTION */}
            {you && (
                <div className="flex items-center px-3 py-0.3 text-sm bg-blue-900/20 border-l-2 border-blue-500 player-list-you min-h-[20px]">
                    {/* We lock the height to exactly 20px to match your list logic */}

                    <div className="flex-1">
                        {you.playerName}
                        <span className="text-zinc-500 ml-1">(You)</span>
                    </div>

                    <form action="/api/leave" method="POST" className="m-0 flex items-center h-full">
                        <input type="hidden" name="participation_id" value={you.id} />
                        <button
                            type="submit"
                            className="text-red-400 hover:text-red-300 transition flex items-center"
                        >
                            {/* leading-none is the secret to stopping the icon from pushing the height */}
                            <span className="material-symbols-outlined text-[18px] leading-none">
                    logout
                </span>
                        </button>
                    </form>
                </div>
            )}

            {/* LIST */}
            <div className="relative">
                <div
                    ref={scrollRef}
                    style={{maxHeight: `${visibleOthers * ROW_HEIGHT}px`}}
                    className="overflow-y-auto"
                >
                    {otherPlayers.map((p, i) => (
                        <div
                            key={p.playerId}
                            className={`flex px-3 text-sm ${
                                i % 2 === 0 ? "bg-zinc-900/50" : "bg-black/50"
                            }`}
                        >
                            {p.playerName}
                        </div>
                    ))}

                </div>

                {isScrollable && !atTop && (
                    <>
                        <FadeOverlay position="top"/>
                        <ScrollArrow direction="up" visible/>
                    </>
                )}

                {isScrollable && !atBottom && (
                    <>
                        <FadeOverlay position="bottom"/>
                        <ScrollArrow direction="down" visible/>
                    </>
                )}


            </div>
        </div>
    );
}