"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "./lib/supabase";
import { useRouter } from "next/navigation";

function generateShortCode(length = 5) {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }

    return result;
}

export default function Home() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [totalCost, setCost] = useState("");
    const [maxPlayers, setMaxPlayers] = useState("");
    const [upiId, setUpiId] = useState("");

    async function createMatch(e: React.FormEvent) {
        e.preventDefault();

        const pricePerPlayer = Math.ceil(
            Number(totalCost) / Number(maxPlayers)
        );

        const organizer = localStorage.getItem("turfr_player_name");

        const { data, error } = await supabase
            .from("matches")
            .insert([
                {
                    organizer_name: organizer,
                    title,
                    total_cost: Number(totalCost),
                    price_per_player: Number(pricePerPlayer),
                    max_players: Number(maxPlayers),
                    upi_id: upiId,
                    short_code: generateShortCode(),
                },
            ])
            .select()
            .single();

        if (error) {
            console.error("Supabase error:", error.message);
            alert("Error creating match");
            return;
        }

        router.push(`/${data.short_code}`);
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">

            <div className="w-full max-w-sm mx-auto flex flex-col items-center gap-8 -translate-y-12">

                {/* Logo */}
                <Image
                    src="/turfr-logo.svg"
                    alt="Turfr logo"
                    width={180}
                    height={60}
                    className="opacity-90"
                />

                {/* Card */}
                <form
                    onSubmit={createMatch}
                    className="w-full bg-zinc-900/70 backdrop-blur border border-zinc-800 rounded-2xl p-6 shadow-lg"
                >
                    <div className="flex flex-col gap-4">

                        <input
                            placeholder="Max players"
                            type="number"
                            value={maxPlayers}
                            onChange={(e) => setMaxPlayers(e.target.value)}
                            className="w-full border border-zinc-700 bg-zinc-950 p-3 rounded-lg"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition text-white py-3 rounded-xl font-medium"
                        >
                            Create Match
                        </button>

                    </div>
                </form>

            </div>
        </main>
    );
}