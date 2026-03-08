"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditMatch({ match, onClose } : any) {
    const [ venue, setVenue ] = useState(match.venue || "");

    // const [ time, setTime ] = useState(match.start_time || "");
    const [ startTime, setStartTime ] = useState(match.start_time || "");
    const [ endTime, setEndTime ] = useState(match.end_time || "");


    const [ price, setPrice ] = useState(match.price_per_player);
    const [ maxPlayers, setMaxPlayers ] = useState(match.max_players);

    async function updateMatch() {

        await supabase
            .from("matches")
            .update({
                venue,
                start_time: startTime,
                end_time: endTime,
                price_per_player: price,
                max_players: maxPlayers
            })
            .eq("id", match.id);

        window.location.reload();
    }

    return (
        <div>
            <input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue"
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            {/* TODO: Make time selection as frictionless as possible */}

            <input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <input
                type="number"
                value={price}
                onChange={(e)=>setPrice(Number(e.target.value))}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                placeholder="Max players"
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <button
                onClick={updateMatch}
                className="w-full bg-blue-600 py-2 rounded"
            >
                Save
            </button>

            <button
                onClick={onClose}
                className="w-full bg-zinc-700 py-2 rounded mt-3"
            >
                Close
            </button>

        </div>
    );
}