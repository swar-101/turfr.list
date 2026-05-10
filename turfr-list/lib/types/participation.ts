export type RawParticipation = {
    id: string;
    player_id: string;
    status: string;
    joined_at: string;
    players: { name: string } | { name: string }[] | null;
};

export type PlayerView = {
    id: string;
    playerId: string;
    playerName: string | null;
    status: string;
    joinedAt: string;
};