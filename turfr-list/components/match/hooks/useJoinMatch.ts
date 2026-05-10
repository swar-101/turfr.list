"use client";

import { useState } from "react";
import { joinMatchAction } from "@/lib/actions/joinMatchAction";
import { useIdentity } from "@/components/match/hooks/useIdentity";

export function useJoinMatch(matchId: string) {
    const playerId = useIdentity();

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "active" | "waitlist">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleJoin({
                                  name,
                                  role = "player",
                              }: {
        name: string;
        role?: "player" | "organizer";
    }) {
        if (!playerId) return;

        setLoading(true);
        setError(null);

        try {
            const result = await joinMatchAction({
                playerId,
                matchId,
                name,
                role,
            });

            setStatus(result.status);

        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Unexpected error");
        } finally {
            setLoading(false);
        }
    }

    return {
        handleJoin,
        loading,
        status,
        error,
    };
}