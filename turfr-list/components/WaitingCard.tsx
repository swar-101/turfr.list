"use client";

import {useEffect, useRef, useState} from "react";
import WaitList from "@/components/WaitList";
import {useScrollIndicators} from "@/components/match/hooks/useScrollIndicators";
import {useCurrentUser} from "@/components/match/hooks/useCurrentUser";
import {isYou} from "@/components/match/utils/you";
import FadeOverlay from "@/components/match/components/FadeOverlay";
import ScrollArrow from "@/components/match/components/ScrollArrow";

export default function WaitingCard({ players }: { players: any[] }) {

    const [open, setOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const storedName = useCurrentUser();

    const you = players.find(
        (p) =>
            isYou(p.playerName, storedName)
    );

    const yourIndex = players.findIndex(
        (p) =>
            isYou(p.playerName, storedName)
    );

    const { atTop, atBottom, isScrollable } = useScrollIndicators(scrollRef, [players, open]);
    const [isYouInTopFade, setIsYouInTopFade] = useState(false);
    const [isYouInBottomFade, setIsYouInBottomFade] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const check = () => {
            const scrollTop = el.scrollTop;
            const clientHeight = el.clientHeight;

            const children = el.children[0]?.children; // ul → li[]
            if (!children || yourIndex < 0) return;

            const youEl = children[yourIndex] as HTMLElement;
            if (!youEl) return;

            const youTop = youEl.offsetTop;
            const youBottom = youTop + youEl.offsetHeight;

            const fadeZone = 20;

            // setIsYouInTopFade(youTop < scrollTop + fadeZone);
            const topFadeStart = scrollTop;
            const topFadeEnd = scrollTop + fadeZone;

            const isOverlappingTopFade =
                youBottom > topFadeStart && youTop < topFadeEnd;

            setIsYouInTopFade(isOverlappingTopFade);

            const bottomFadeStart = scrollTop + clientHeight - fadeZone;
            const bottomFadeEnd = scrollTop + clientHeight;

            const isOverlappingBottomFade =
                youBottom > bottomFadeStart && youTop < bottomFadeEnd;

            setIsYouInBottomFade(isOverlappingBottomFade);
            // setIsYouInBottomFade(youBottom > scrollTop + clientHeight - fadeZone);
        };

        check();

        el.addEventListener("scroll", check);
        return () => el.removeEventListener("scroll", check);

    }, [players, open, yourIndex]);

    return (
        <div className="bg-black/90 py-0 flex flex-col">

            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="grid grid-cols-3 items-center text-sm text-zinc-300 px-3 h-8 w-full"
            >

                {/* Left spacer */}
                <div />

                {/* Center title */}
                <div className="flex items-center justify-center gap-2 font-medium tracking-wide">
                    <span>Waiting</span>
                    <span className="text-zinc-500 font-normal">
                        ({players.length})
                    </span>
                </div>

                {/* Right icon */}
                <div className="flex justify-end">
                    <span
                        className={`material-symbols-outlined text-zinc-500 text-[18px] transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                    >
                        arrow_drop_down
                    </span>
                </div>

            </button>

            <div className="relative">

                <div className="relative">
                    <div
                        ref={scrollRef}
                        className={`${open && players.length > 0 ? "max-h-[108px] overflow-y-auto" : "max-h-0 overflow-hidden"}`}
                    >
                        <WaitList players={players} />
                    </div>
                </div>

                    {!open && you && (
                        <>
                            {/*<div className="px-3 py-0.3 text-sm bg-yellow-500/20 border-l-4 border-yellow-400 text-yellow-200">*/}
                            <div className="flex items-center px-3 py-0.3 text-sm wait-list-you">
                                <div className="flex-1">
                                    #{yourIndex + 1} {you.playerName}
                                    <span className="text-yellow-200 ml-1">(You)</span>
                                </div>


                                <form action="/api/leave" method="POST" className="ml-3">
                                    <input type="hidden" name="participation_id" value={you.id} />
                                    <button className="text-zinc-200 hover:text-red-300 transition flex items-center">
                                        <span className="material-symbols-outlined text-[16px]">
                                            logout
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </>
                    )}

                {open && isScrollable && !atTop && (
                    <>
                        <FadeOverlay position="top" />
                        <ScrollArrow
                            direction="up"
                            highlight={isYouInTopFade}
                            visible={open && isScrollable && !atTop}
                        />
                    </>
                )}

                {open && isScrollable && !atBottom && (
                    <>
                        <FadeOverlay position="bottom" />
                        <ScrollArrow
                            direction="down"
                            highlight={isYouInBottomFade}
                            visible={open && isScrollable && !atBottom}
                        />
                    </>
                )}

            </div>
        </div>
    );
}