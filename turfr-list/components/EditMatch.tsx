"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Match = {
    id: string;
    venue?: string;
    start_time?: string;
    end_time?: string;
    total_cost: number;
    max_players: number;
    turf_confirmed: boolean;
};

type EditMatchProps = {
    match: Match
    onCloseAction: () => void
}

export default function EditMatch({ match, onCloseAction } : EditMatchProps) {

    const router = useRouter();

    const [ venue, setVenue ] = useState(match.venue || "");
    const [ startTime, setStartTime ] = useState(match.start_time || "");
    const [ endTime, setEndTime ] = useState(match.end_time || "");
    const [ totalCost, setTotalCost ] = useState(match.total_cost || 0);
    const [ maxPlayers, setMaxPlayers ] = useState(match.max_players || 0);
    const [ turfConfirmed, setTurfConfirmed ] = useState(match.turf_confirmed || false);

    async function updateMatch() {
        console.log("Saving match...");

        const pricePerPlayer =
            maxPlayers > 0 ? Math.ceil(totalCost / maxPlayers) : 0;

        const { data, error } = await supabase
            .from("matches")
            .update({
                venue,
                start_time: startTime || null,
                end_time: endTime || null,
                total_cost: totalCost,
                price_per_player: pricePerPlayer,
                max_players: maxPlayers,
                turf_confirmed: turfConfirmed,
            })
            .eq("id", match.id)
            .select();

        if (error) {
            console.error("SUPABASE ERROR:", error.message, error.details, error.hint);
            return;
        }

        console.log("Updated row:", data);

        router.refresh();
        onCloseAction();
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
                value={totalCost}
                onChange={(e)=>setTotalCost(Number(e.target.value))}
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <input
                type="number"
                value={maxPlayers}
                onChange={(e) => setMaxPlayers(Number(e.target.value))}
                placeholder="Max players"
                className="w-full p-2 bg-zinc-900 border border-zinc-700 rounded"
            />

            <label className="flex items-center gap-2 text-zinc-300 mt-2">
                <input
                    type="checkbox"
                    checked={turfConfirmed}
                    onChange={(e) => setTurfConfirmed(e.target.checked)}
                />
                Turf booked
            </label>

            <button
                type="button"
                onClick={updateMatch}
                className="w-full bg-blue-600 py-2 rounded"
            >
                Save
            </button>

            <button
                onClick={onCloseAction}
                className="w-full bg-zinc-700 py-2 rounded mt-3"
            >
                Close
            </button>

        </div>
    );
}