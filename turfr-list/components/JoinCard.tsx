import JoinSection, { PlayerParticipation } from "@/components/JoinSection";

export default function JoinCard({
                                     players,
                                     matchId,
                                 }: {
    players: PlayerParticipation[];
    matchId: string;
}) {
    return (
        <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">
            <JoinSection players={players} matchId={matchId} />
        </div>
    );
}