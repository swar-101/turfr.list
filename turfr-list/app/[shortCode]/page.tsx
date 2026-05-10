import MatchPageClient from "@/components/MatchPageClient";
import {toPlayerView} from "@/lib/mappers/toPlayerView";
import {getMatchWithPlayers} from "@/lib/queries/getMatchWithPlayers";
import {toMatchView} from "@/lib/mappers/toMatchView";
import { notFound } from "next/navigation";

interface MatchPageProps {
    params: Promise<{ shortCode: string }>
}

export default async function MatchPage({ params }:  MatchPageProps) {
    const { shortCode } = await params;

    const result = await getMatchWithPlayers(shortCode);
    if (!result) {
        // TODO: UX Improvement - Create a custom `app/[shortCode]/not-found.tsx` page.
        // Requirements:
        // 1. Branding: Match the "Grass-dark" aesthetic or use your own creativity.
        // 2. Navigation: Provide a "Return to Dashboard" or "Create New Match" button.
        // 3. User Feedback: Clearly explain that the link might be expired or incorrect.
        notFound();
    }

    const { match: rawMatch, players: rawPlayers } = result;

    const matchView = toMatchView(rawMatch);
    const playerViews = (rawPlayers ?? []).map(toPlayerView);

    return (
        <MatchPageClient
            match={matchView}
            players={playerViews}
        />
    );
}