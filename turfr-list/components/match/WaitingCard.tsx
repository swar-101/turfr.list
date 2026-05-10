"use client";

import { useRef, useState } from "react";
import { useScrollIndicators } from "@/components/match/hooks/useScrollIndicators";
import FadeOverlay from "@/components/match/ui/FadeOverlay";
import ScrollArrow from "@/components/match/ui/ScrollArrow";
import { PlayerView } from "@/lib/types/participation";

type WaitingCardProps = {
    you?: PlayerView;
    otherPlayers: PlayerView[];
    yourIndex: number;
    totalPlayers: number;
};

export default function WaitingCard({
                                        you,
                                        otherPlayers,
                                        yourIndex,
                                        totalPlayers,
                                    }: WaitingCardProps) {

    const [open, setOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const { atTop, atBottom, isScrollable } =
        useScrollIndicators(scrollRef, otherPlayers);

    const ROW_HEIGHT = 20;
    const WAITING_CAP = 7;

    const shouldScroll = totalPlayers > WAITING_CAP;

    return (
        <div className="bg-black/90 py-0 flex flex-col">

            {/* HEADER */}
            <button
                onClick={() => setOpen(!open)}
                className="grid grid-cols-3 items-center text-sm text-zinc-300 px-3 h-8 w-full"
            >
                <div />
                <div className="flex justify-center gap-2 font-medium">
                    Waiting ({totalPlayers})
                </div>
                <div className="flex justify-end">
          <span
              className={`material-symbols-outlined text-zinc-500 text-[18px] ${
                  open ? "rotate-180" : ""
              }`}
          >
            arrow_drop_down
          </span>
                </div>
            </button>

            <div className="relative">

                {/* COLLAPSED YOU */}
                {!open && you && (
                    <div className="flex px-3 text-sm bg-yellow-400/40 border-l-4 border-yellow-400 text-yellow-100">
                        <div className="flex-1">
                            #{yourIndex + 1} {you.playerName}
                            <span className="ml-1">(You)</span>
                        </div>
                    </div>
                )}

                {/* LIST */}
                <div
                    ref={scrollRef}
                    style={{
                        maxHeight: open
                            ? shouldScroll
                                ? `${WAITING_CAP * ROW_HEIGHT}px`
                                : "none"
                            : "0px",
                    }}
                    className={open && shouldScroll ? "overflow-y-auto" : "overflow-hidden"}
                >
                    {otherPlayers.map((p, i) => (
                        <div
                            key={p.playerId}
                            className={`px-3 text-sm ${
                                i % 2 === 0 ? "bg-zinc-900/50" : "bg-black/50"
                            }`}
                        >
                            {p.playerName}
                        </div>
                    ))}
                </div>

                {/* SCROLL FX */}
                {open && shouldScroll && isScrollable && !atTop && (
                    <>
                        <FadeOverlay position="top" />
                        <ScrollArrow direction="up" visible />
                    </>
                )}

                {open && shouldScroll && isScrollable && !atBottom && (
                    <>
                        <FadeOverlay position="bottom" />
                        <ScrollArrow direction="down" visible />
                    </>
                )}

            </div>
        </div>
    );
}