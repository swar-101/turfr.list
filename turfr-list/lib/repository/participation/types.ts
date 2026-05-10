export type InsertParticipationInput = {
    matchId: string;
    playerId: string;
    status: "active" | "waitlist";
    role: "player" | "organizer";
};
