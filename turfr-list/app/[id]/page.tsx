import { supabase } from "@/lib/supabase";
import JoinSection from "@/components/JoinSection";

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

    const activePlayers = players?.filter(p => p.status == "active") || [];
    const waitlistPlayers = players?.filter(p => p.status == "waitlist") || [];

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">

            <h1 className="text-3xl font-bold">{match.title}</h1>

            <p>Total Cost: ₹{match.total_cost}</p>
            <p>Price Per Player: ₹{match.price_per_player}</p>
            <p>Max Players: {match.max_players}</p>
            <p>UPI ID: {match.upi_id}</p>

            <JoinSection players={players || []} matchId={id} />

            <h2 className="text-xl font-semibold">⚽ Playing ({activePlayers.length} / {match.max_players})</h2>

            <ul>
                {activePlayers?.map((p) => (
                    <li key={p.id}>{p.players.name}</li>
                ))}
            </ul>

                <a
                    href={upiLink}
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded mt-4"
                >
                    Pay via UPI
                </a>

            <h2 className="text-xl font-semibold">⏳ Waitlist ({waitlistPlayers.length})</h2>
            <ul>
                {waitlistPlayers?.map((p, index) => (
                    <li key={p.id}>
                        #{index + 1} {p.players.name}
                    </li>
                ))}
            </ul>
        </main>
    );
}