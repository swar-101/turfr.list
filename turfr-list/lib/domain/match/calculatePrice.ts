
export function calculatePrice(total: number, players: number) {
    return players > 0 ? Math.ceil(total / players) : 0;
}