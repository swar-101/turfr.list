import {MatchRow} from "@/types/db/match";
import {MatchView} from "@/lib/types/match";

export function toMatchView(match: MatchRow): MatchView {
    return {
        id: match.id,
        organizerId: match.organizer_id,
        organizerName: match.organizer_name,

        maxPlayers: match.max_players,
        activeCount: match.active_count ?? 0,

        totalCost: match.total_cost,
        pricePerPlayer: match.price_per_player,

        venueId: null,
        venue: null,
        turfConfirmed: false,

        startTime: match.start_time ?? null,
        endTime: match.end_time ?? null,

        state: deriveMatchState(match)
    }
}

// TODO: Add state column in DB later
function deriveMatchState(match: MatchRow) {
    const now = new Date();

    if (!match.start_time) return "NOT_CONFIRMED";

    const start = new Date(match.start_time);
    const end = match.end_time ? new Date(match.end_time) : null;

    if (end && now > end) return "COMPLETED";

    if (now < start) return "CONFIRMED";

    return "LIVE";
}