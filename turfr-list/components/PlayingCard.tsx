"use client";
import PlayerList from "@/components/PlayerList";

export default function PlayingCard({
                                        players,
                                        maxPlayers,
                                    }: {
    players: any[];
    maxPlayers: number;
}) {
    const ratio = players.length / maxPlayers;

    let barColor = "#22c55e";
    if (ratio > 0.7) barColor = "#eab308";
    if (ratio >= 1) barColor = "#ef4444";

    return (
        <div className="bg-black/90 backdrop-blur mt-2 mb-0">

            {/* Header */}
            <div className="flex items-center text-sm text-zinc-300 px-3 mb-1.5">
                <span className="font-medium flex-1">Playing</span>

                <span className="text-xs text-zinc-500 tracking-wide">
                    {players.length}/{maxPlayers}
                </span>
            </div>

            {/* Progress bar */}
            <div className="px-3 mt-1 mb-2">
                <div
                    style={{
                        height: "4px",
                        background: "#1f1f23",
                        borderRadius: "999px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                            width: `${Math.min((players.length / maxPlayers) * 100, 100)}%`,
                            background: barColor,
                            transition: "width 0.35s ease",
                        }}
                    />
                </div>
            </div>

            {/*<div className="h-px bg-zinc-800"></div>*/}

            {/* Player list */}
            <div className="">
                <PlayerList players={players} />
            </div>

        </div>
    );
}