import {NextResponse} from "next/server";
import {joinMatch} from "@/lib/domain/match/joinMatch";

export async function POST(req: Request) {
    try {
        const input = await parseJoinRequest(req);
        validateJoinInput(input);

        const result = await joinMatch(input);

        return NextResponse.json(result);

    } catch (err: unknown) {
        console.error("JOIN API ERROR:", err);

        const message = err instanceof Error
            ? err.message
            : "Internal server error"

        return NextResponse.json({ error: message }, { status : 500 });
    }
}

async function parseJoinRequest(req: Request) {
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        const body = await req.json().catch(() => null);

        return {
            playerId: body?.playerId ?? null,
            matchId: body?.matchId ?? null,
            name: body?.name ?? null,
            role: body?.role ?? "player",
        }
    }

    const formData = await req.formData();

    return {
        playerId: formData.get("player_id") as string | null,
        matchId: formData.get("match_id") as string | null,
        name: formData.get("name") as string | null,
        role: "player",
    }
}

function validateJoinInput(input: {
    playerId: string | null;
    matchId: string | null;
    name: string | null;
}) {
    if (!input.playerId) {
        throw new Error("Player ID is missing");
    }

    if (!input.matchId) {
        throw new Error("Match ID is required");
    }

    if (!input.name) {
        throw new Error("Player name is required");
    }
}