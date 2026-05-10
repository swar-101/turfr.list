export async function joinMatchAction(input: {
    playerId: string;
    matchId: string;
    name: string;
    role: string;
}) {
    const res = await fetch("api/join", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || "Join failed");
    }

    return data;
}