import {VenueId} from "@/lib/data/venues";

export type MatchView = {
    // INVARIANTS (AS OF NOW)
    id: string;
    organizerId: string;
    organizerName: string;

    maxPlayers: number;
    activeCount: number;

    totalCost: number | null;
    pricePerPlayer: number | null;

    venueId: VenueId | null;
    venue: string | null;

    startTime: string | null;
    endTime: string | null;

    turfConfirmed: boolean;

    state: "NOT_CONFIRMED" | "CONFIRMED" | "LIVE" | "COMPLETED";
}