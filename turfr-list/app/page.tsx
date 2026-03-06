"use client";

import { useState } from "react";
import Image from "next/image";
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
        <main className="min-h-screen flex justify-center px-4 py-10">
            <div className="w-full max-w-md flex flex-col gap-6">

            <header className="flex items-center justify-center gap-2">
                <Image
                    src="/turfr-logo.svg"
                    alt="Turfr logo"
                    width={220}
                    height={60}
                    className="mx-auto"
                />
            </header>
            <form
                onSubmit={createMatch}
                className="flex flex-col gap-4 bg-zinc-900 p-6 rounded-xl shadow"
            >

                <h1 className="text-2xl font-semibold">
                    Create Match
                </h1>

                <input
                    placeholder="Match title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-zinc-700 bg-zinc-950 p-3 rounded-lg"
                    required
                />

                <input
                    placeholder="Max players"
                    type="number"
                    value={maxPlayers}
                    onChange={(e) => setMaxPlayers(e.target.value)}
                    className="border border-zinc-700 bg-zinc-950 p-3 rounded-lg"
                    required
                />

                <input
                    placeholder="Total cost"
                    type="number"
                    value={totalCost}
                    onChange={(e) => setCost(e.target.value)}
                    className="border border-zinc-700 bg-zinc-950 p-3 rounded-lg"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-green-500 text-white py-3 rounded-lg font-semibold"
                >
                    Create Match
                </button>
            </form>
            </div>
        </main>
    )
}