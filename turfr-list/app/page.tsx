"use client";

import CreateMatchCard from "@/components/match/CreateMatchCard";

export default function Home() {

    return (
        <main className="min-h-[100dvh] flex items-center justify-center px-4 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">
            <CreateMatchCard />
        </main>
    );
}