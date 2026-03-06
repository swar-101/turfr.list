import Image from "next/image";
import { supabase } from "@/lib/supabase";
import JoinSection from "@/components/JoinSection";
import CopyLinkButton from "@/components/CopyLinkButton";

export default async function MatchPage({ params, }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    const { data: match } = await supabase
        .from("matches")
        .select("*")
        .eq("id", id)
        .single();

    if (!match) {
        return <div>Match not found</div>;
    }

    const upiLink = `upi://pay?pa=${match.upi_id}&pn=Turfr&am=${match.price_per_player}&cu=INR`;
    // const upiLink = `upi://pay?pa=test@upi&pn=Turfr&am=100&cu=INR`;

    const { data: players } = await supabase
        .from("participation")
        .select("id, status, joined_at, players(name)")
        .eq("match_id", id)
        .order("joined_at", { ascending: true });

    const normalizedPlayers =
        players?.map((p) => ({
            ...p,
            playerName: p.players?.[0]?.name ?? "Unknown",
        })) || [];

    const activePlayers = normalizedPlayers.filter(p => p.status === "active");
    const waitlistPlayers = normalizedPlayers.filter(p => p.status === "waitlist");

    return (
        <main className="min-h-screen flex justify-center px-4 py-10 bg-gradient-to-b from-zinc-950 via-black to-zinc-950">

            <div className="w-full max-w-md flex flex-col gap-6">
                <header className="mb-4">
                    <Image
                        src="/turfr-logo.svg"
                        alt="Turfr logo"
                        width={220}
                        height={60}
                        className="mx-auto"
                    />
                </header>

                <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">
                    <h1 className="text-xl font-semibold mb-3">{match.title}</h1>
                    <div className="text-sm text-zinc-400 space-y-1">
                        <p>Total Cost: ₹{match.total_cost}</p>
                        <p>Price Per Player: ₹{match.price_per_player}</p>
                        <p>Max Players: {match.max_players}</p>
                        <p>UPI ID: {match.upi_id}</p>
                    </div>
                </div>

                <CopyLinkButton />

                <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">
                    <JoinSection players={players || []} matchId={id} />
                </div>

                <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">

                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <span className="material-symbols-outlined text-zinc-400">
                            sports_soccer
                        </span>
                        Playing ({activePlayers.length} / {match.max_players})
                    </h2>
                    <div className="h-px bg-zinc-800 my-3"></div>

            <ul className="mt-3 space-y-3">
                {activePlayers?.map((p) => (
                    <li
                        key={p.id}
                        className="px-3 py-2 rounded-md bg-zinc-800/70 border border-zinc-700/50 hover:bg-zinc-700 transition"
                    >
                        {p.playerName || "Unknown"}
                    </li>
                ))}
            </ul>

                </div>

                <a
                    href={upiLink}
                    className="w-full bg-green-600 hover:bg-green-500 active:scale-[0.98] transition text-white py-3 rounded-xl font-medium mt-2 text-center block"
                >
                    Pay via UPI
                </a>

                <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">

                    <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                        ⏳ Waitlist ({waitlistPlayers.length})
                    </h2>
                    <div className="h-px bg-zinc-800 my-3"></div>


                    <ul className="mt-3 space-y-3">
                        {waitlistPlayers.map((p, index) => (
                            <li
                                key={p.id}
                                className="px-3 py-2 rounded-md bg-zinc-800/70 border border-zinc-700/50 hover:bg-zinc-700 transition"
                            >
                                #{index + 1} {p.playerName || "Unknown"}
                            </li>
                        ))}
                    </ul>

                </div>

            </div>
        </main>
    );
}