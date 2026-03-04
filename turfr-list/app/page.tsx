"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";


export default function Home() {

    const router = useRouter();

    const [ title, setTitle ] = useState("");
    const [totalCost, setCost] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [upiId, setUpiId] = useState("");

    async function createMatch(e: React.FormEvent) {
        e.preventDefault();

        const pricePerPlayer = Number(totalCost) / Number(maxPlayers);

        const { data, error } = await supabase
            .from("matches")
            .insert([
                { title,
                    total_cost : Number(totalCost),
                    price_per_player : Number(pricePerPlayer),
                    max_players: Number(maxPlayers),
                    upi_id : upiId
                },
            ])
            .select()
            .single();

        if (error) {
            console.error(error);
            alert("Error creating match");
            return;
        }

        router.push(`/${data.id}`);
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={createMatch}
                className="flex flex-col gap-4 w-80"
            >

                <h1 className="text-2xl font-semibold">
                    Create Match
                </h1>

                <input
                    placeholder="Match title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    placeholder="Max players"
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-black text-white p-2 rounded"
                >
                    Create Match
                </button>
            </form>
        </main>
    )
}