

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EditMatch({ match }) {
    const [ venue, setVenue ] = useState(match.venue || "");
    const [ time, setTime ] = useState(match.start_time || "");
    const [ price, setPrice ] = useState(match.price_per_player);
    const [ maxPlayers, setMaxPlayers ] = useState(match.max_players);

    async function updateMatch() {

        await supabase
            .from("matches")
            .update({
                venue,
                start_time: time,
                end_time: time,
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

            {/* TODO: Include end time and also make time selection as frictionless as possible */}
            <input
                type="datetime-local"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <input
                type="number"
                value={price}
                onChange={(e)=>setPrice(Number(e.target.value))}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <button
                onClick={updateMatch}
                className="w-full bg-blue-600 py-2 rounded"
            >
                Save
            </button>

        </div>
    );
}