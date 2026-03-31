export function isYou(
    playerName: string | undefined,
    currentUser: string | null
): boolean {
    if (!playerName || !currentUser) return false;

    return (
        playerName.trim().toLowerCase() ===
        currentUser.trim().toLowerCase()
    );
}

export function getYouPlayer(players: any[], currentUserName: string | null) {
    return players.find((p) => isYou(p.playerName, currentUserName));
}

export function getYouPlayerIndex(players: any[], currentUserName: string | null) {
    return players.findIndex((p) => isYou(p.playerName, currentUserName));
}