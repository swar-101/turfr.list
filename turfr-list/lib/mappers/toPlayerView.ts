import {PlayerView, RawParticipation} from "@/lib/types/participation";

export function toPlayerView(participation: RawParticipation) : PlayerView {
    return {
        id: participation.id,
        playerId: participation.player_id,
        playerName: Array.isArray(participation.players)
            ? participation.players[0]?.name ?? null
            : participation.players?.name ?? null,

        status: participation.status,
        joinedAt: participation.joined_at,
    };
}