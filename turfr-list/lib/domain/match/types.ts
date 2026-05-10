export type CreateMatchInput = {
    organizerName: string;
    maxPlayers: number;
};

export type CreateMatchResult = {
    id: string;
    shortCode: string;
    organizerName: string;
    maxPlayers: number;
};

export type JoinMatchInput = {
    playerId: string;
    name: string;
    matchId: string;
    role?: "player" | "organizer";
};

export type JoinMatchResult = {
    playerId: string;
    status: "active" | "waitlist";
    role: "player" | "organizer";
};