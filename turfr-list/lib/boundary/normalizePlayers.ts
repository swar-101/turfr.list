import { PlayerParticipation } from "@/types/domain/player";

type NormalizedPlayer = {
    id: string;
    joined_at: string;
    payment_status: string | null;
    players: {
        name: string | null;
    } | null;
    playerName: string;
    status: string;
};

export function normalizePlayers(
    players: PlayerParticipation[] | null | undefined
): NormalizedPlayer[] {
    if (!players) return [];

    return players.map((p) => ({
        id: p.id,
        status: p.status,
        joined_at: p.joined_at ?? "", // ✅ guarantee
        payment_status: p.payment_status ?? null, // optional normalize
        players: p.players,
        playerName: p.players?.name ?? "Unknown",
    }));
}