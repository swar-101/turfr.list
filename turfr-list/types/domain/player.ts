export type PlayerParticipation = {
    id: string;
    status: string;
    joined_at?: string;
    payment_status?: string | null;
    players: {
        name: string | null;
    } | null;
};