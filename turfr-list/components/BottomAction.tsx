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
    const upiLink = `upi://pay?pa=${match.upi_id}&pn=Turfr&am=${match.price_per_player}&cu=INR`;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-zinc-800 backdrop-blur">
            <div className="max-w-md mx-auto p-4">

                {playerName ? (
                    <a
                        href={upiLink}
                        className="block w-full bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl text-center font-medium"
                    >
                        Pay via UPI
                    </a>
                ) : (
                    <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-medium">
                        Join Match
                    </button>
                )}

            </div>
        </div>
    );
}