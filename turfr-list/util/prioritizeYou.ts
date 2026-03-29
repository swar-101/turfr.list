
export function prioritizeYou(players: any[], storedName: string | null) {
    if (!storedName) return players;

    const result = [];
    let you = null;

    for (const p of players) {
        const isYou =
            storedName.trim().toLowerCase() === p.playerName?.trim().toLowerCase();

        if (isYou) you = p;
        else result.push(p);
    }

    if (you) result.unshift(you);

    return result;
}