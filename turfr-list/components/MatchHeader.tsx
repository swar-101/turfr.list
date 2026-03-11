"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CopyLinkButton from "@/components/CopyLinkButton";

const venueShort: Record<string, string> = {
    "NR Bhagat College, Sec 12, Nerul (W)": "NRB",
    "Ramshet Thakur International Sports Complex, Sec 18, Ulwe": "Ramshet",
    "Fr. Agnel Astroturf, Sec 9, Vashi": "Agnel's",
    "Terna College Turf, Sec 22, Nerul (W)": "Terna",
    "Yashwantrao Chavan Ground, Sec 19A, Nerul (E)": "Yashwantrao",
    "MAEER's MIT PUNE's Vishwashanti Gurukul School, Sec 23, Ulwe": "Gurukul",
    "CP Goenka International School Turf, Sec 5, Ulwe": "CP",
    "Sree Narayana Guru International School, Sec 21, Ulwe": "SNG"
};


function formatMatchTime(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const now = new Date();
    const today = now.toDateString();

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    let dayLabel = startDate.toLocaleDateString("en-US", { weekday: "short" });

    if (startDate.toDateString() === today) dayLabel = "Today";
    if (startDate.toDateString() === tomorrow.toDateString()) dayLabel = "Tomorrow";


    function formatTime(date: Date) {
        let hour = date.getHours();
        const minute = date.getMinutes();

        const hour12 = hour % 12 || 12;

        // if (minute === 0) return `${hour12}`;
        const minutePart =
            minute === 0 ? "" : `:${minute.toString().padStart(2, "0")}`;

        const ampm = hour >= 12 ? "PM" : "AM";

        return {
            time: `${hour12}${minutePart}`,
            ampm
        };
    }

    const startFormatted = formatTime(startDate);
    const endFormatted = formatTime(endDate);

    let timeRange;

    if (startFormatted.ampm === endFormatted.ampm) {
        timeRange = `${startFormatted.time}–${endFormatted.time}${endFormatted.ampm}`;
    } else {
        timeRange = `${startFormatted.time}${startFormatted.ampm}–${endFormatted.time}${endFormatted.ampm}`;
    }

    return `${dayLabel} ${timeRange}`;
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

    const timeLabel = match.start_time ? formatMatchTime(match.start_time, match.end_time) : "TBD";

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
        match.organizer_name &&
        match.organizer_name.toLowerCase() === playerName.toLowerCase();

    const venueDisplay = venueShort[match.venue] || match.venue;

    return (
        <div className="border-b border-zinc-800">

            <div className="bg-black/90 px-4 pt-2 pb-2 flex items-center justify-center relative border-b border-zinc-800">
                <Image
                    src="/turfr-logo.svg"
                    alt="Turfr logo"
                    width={92}
                    height={28}
                    className="opacity-90"
                />

                {/* TODO: Organize code for buttons */}
                {isOrganizer && (
                    <button
                        onClick={onEdit}
                        className="absolute right-17 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                )}

                <button
                    onClick={onInfo}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                    <span className="material-symbols-outlined">info</span>
                </button>

                <CopyLinkButton />

            </div>

            <div className="bg-zinc-900/60 px-4 py-1.5 text-zinc-300 text-sm flex items-center justify-center gap-1 whitespace-nowrap">

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
                {/*<span className="material-symbols-outlined text-sm text-[18px]">person</span>*/}
                <span className="text-green-400 font-medium">
                    ₹{match.price_per_player || "0"}
                </span>


                {/*<button onClick={onInfo}>*/}
                {/*    <span className="material-symbols-outlined">info</span>*/}
                {/*</button>*/}

            </div>
        </div>
    );
}