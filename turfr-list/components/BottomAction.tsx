
// Join Button
// Pay Button
// Loading State / Disable State

"use client";

import { useEffect, useState } from "react";

export default function BottomAction({ match } : { match : any }) {
    const [ playerName, setPlayerName ] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem("turfr_player_name");
        setPlayerName(name);
    }, []);

    /*
    * TODO: Check if we can create a message description while making the payment
    *       so that it's convenient for the organizer to track.
    * */
    const upiLink = `upi://pay?pa${match.upi_id}&pn=Turfr&am${match.price_per_player}`;

    return (
        <div className="sticky bottom-0 border-t border-zinc-800 bg-black/80 backdrop-blur p-4">
            {playerName
                ? (
                    <a
                        href={upiLink}
                        className="block w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-center font-medium"
                    >
                        Pay via UPI
                    </a>
                 )
                : (
                    <button
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-medium"
                    >
                        Join Match
                    </button>
                )
            }
            {/* TODO: Understanding the states, and what happens after player joins and pays */}
        </div>
    );
}