"use client";

import Image from "next/image";
import CopyLinkButton from "@/components/CopyLinkButton";

type MatchHeaderProps = {
    timeLabel: string | null;
    venueDisplay: string | null;
    venueUrl: string | null;
    priceLabel: string;

    canEdit: boolean;

    onEditAction: () => void;
    onInfoAction: () => void;
};

export default function MatchHeader({
                                        timeLabel,
                                        venueDisplay,
                                        venueUrl,
                                        priceLabel,
                                        canEdit,
                                        onEditAction,
                                        onInfoAction,
                                    }: MatchHeaderProps) {

    const isUrgent =
        timeLabel?.startsWith("Today") ||
        timeLabel?.startsWith("Tomorrow");

    return (
        <div className="border-b border-zinc-800">

            {/* TOP BAR */}
            <div
                className="bg-black/90 px-4 pt-2 pb-2 flex items-center justify-center relative border-b border-zinc-800">

                <Image
                    src="/turfr-logo.svg"
                    alt="Turfr logo"
                    width={92}
                    height={28}
                    className="opacity-90"
                />

                {/* CONTENT ROW */}

                {/* LEFT (empty for symmetry, future-safe) */}

                {/* RIGHT GROUP */}
                {canEdit && (
                    <button
                        onClick={onEditAction}
                        className="absolute right-17 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                )}

                <CopyLinkButton/>

                <button
                    onClick={onInfoAction}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                    <span className="material-symbols-outlined">info</span>
                </button>

            </div>

            {/* SIGNAL BAR */}
            <div
                className="bg-zinc-900/80 px-4 py-0.5 text-zinc-300 text-sm flex items-center justify-center gap-1 whitespace-nowrap">

                {/* TIME */}
                {timeLabel ? (
                    <span className={isUrgent ? "text-yellow-400 font-medium" : "text-zinc-400"}>
                        {timeLabel}
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-zinc-500">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        TBD
                    </span>
                )}

                <span className="text-zinc-600">•</span>

                {/* VENUE */}
                {venueDisplay ? (
                    <a
                        href={venueUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-venue"
                    >
                        {venueDisplay}
                    </a>
                ) : (
                    <span className="flex items-center gap-1 text-zinc-500">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        TBD
                    </span>
                )}

                <span className="text-zinc-600">•</span>

                {/* PRICE */}
                <span className="text-green-400 font-medium">
                    {priceLabel}
                </span>

            </div>
        </div>
    );
}