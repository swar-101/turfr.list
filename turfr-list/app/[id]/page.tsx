import { supabase } from "@/lib/supabase";

export default async function MatchPage({ params, }: { params: Promise<{ id: string }>; }) {

    const { id } = await params;

    const { data: match } = await supabase
        .from("matches")
        .select("*")
        .eq("id", id)
        .single();

    const { data: players } = await supabase
        .from("participation")
        .select("*")
        .eq("match_id", id);

    if (!match) {
        return <div>Match not found</div>;
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center gap-4">

            <h1 className="text-3xl font-bold">{match.title}</h1>

            <p>Total Cost: ₹{match.total_cost}</p>
            <p>Price Per Player: ₹{match.price_per_player}</p>
            <p>Max Players: {match.max_players}</p>
            <p>UPI ID: {match.upi_id}</p>

            <form action="/api/join" method="POST">
                <input type="hidden" name="match_id" value={id} />

                <input
                    name="name"
                    placeholder="Your name"
                    className="border p-2 rounded"
                    required
                />

                <button className="bg-black text-white p-2 rounded">
                    Join Match
                </button>
            </form>

            <h2 className="text-xl font-semibold">Players</h2>

            <ul>
                {players?.map((p) => (
                    <li key={p.id}>{p.player_id}</li>
                ))}
            </ul>

        </main>
    );
}