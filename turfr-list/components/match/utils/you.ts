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