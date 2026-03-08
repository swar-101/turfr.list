"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function formatMatchTime(dateString: string) {
    const matchDate = new Date(dateString);
    const now = new Date();

    const today = now.toDateString();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const matchDay = matchDate.toDateString();

    let dayLabel = matchDate.toLocaleDateString("en-US", {weekday: "short"});

    if (matchDay === today) dayLabel = "Today";
    if (matchDay === tomorrow.toDateString()) dayLabel = "Tomorrow";

    const time = matchDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return `${dayLabel} ${time}`;
}

export default function MatchHeader({
    match,
    onEdit,
    onInfo
}: {
    match: any;
    onEdit: ()=> void;
    onInfo: ()=> void
}) {

    const timeLabel = match.start_time ? formatMatchTime(match.start_time) : "TBD";

    const venueUrl = `https://maps.google.com/?q=${encodeURIComponent(match.venue)}`;

    const isUrgent =
        timeLabel.startsWith("Today") || timeLabel.startsWith("Tomorrow");

    const [playerName, setPlayerName] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setPlayerName(name);
    }, []);

    const isOrganizer =
        playerName &&
        match.organizer_name?.toLowerCase() === playerName.toLowerCase();

    return (
        <div className="px-4 py-2 border-b border-zinc-800 bg-black/80 backdrop-blur">

            <Image
                src="/turfr-logo.svg"
                alt="Turfr logo"
                width={72}
                height={28}
                className="mx-auto mb-1 opacity-90"
            />

            <div className="text-center text-sm flex items-center justify-center flex-wrap gap-1">

                {/* TIME */}
                {match.start_time ? (
                    <span className={isUrgent ? "text-yellow-400 font-medium" : "text-zinc-400"}>
                    {timeLabel}
                    </span>
                ) : (
                    <span className="flex items-center gap-1 text-zinc-500">
                    <span className="material-symbols-outlined text-sm text-[18px]">schedule</span>
                    TBD
                    </span>
                )}

                <span className="text-zinc-600">•</span>

                {/* VENUE */}
                {match.venue ? (
                    <a
                        href={venueUrl}
                        target="_blank"
                        className="text-zinc-300 hover:text-white underline-offset-2 hover:underline"
                    >
                        {match.venue}
                    </a>
                ) : (
                    <span className="flex items-center gap-1 text-zinc-500">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        TBD
                    </span>
                )}

                <span className="text-zinc-600">•</span>

                {/* PRICE */}
                <span className="material-symbols-outlined text-sm text-[18px]">person</span>
                <span className="text-green-400 font-medium">
                    ₹{match.price_per_player || "0"}
                </span>

                {/* EDIT BUTTON */}
                {isOrganizer && (
                    <button onClick={onEdit}
                        className="absolute right-3 top-2 text-zinc-400 hover:text-white"
                    >
                        <span className="material-symbols-outlined text-zinc-400">edit</span>
                    </button>
                )}

                <button onClick={onInfo}>
                    <span className="material-symbols-outlined">info</span>
                </button>

            </div>
        </div>
    );
}