
import PlayerList from "@/components/PlayerList";

export default function PlayingCard({
        players,
        maxPlayers,
    } : {
        players: any[];
        maxPlayers: number;
    }) {
        return (
            <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">
                <h2 className="flex items-center gap-2 text-lg font-semibold">
        <span className="material-symbols-outlined text-zinc-400">
          sports_soccer
        </span>
                    Playing ({players.length}/{maxPlayers})
                </h2>

                <div className="h-px bg-zinc-800 my-3"></div>

                <div className="max-h-[40vh] overflow-y-auto">
                    <PlayerList players={players} />
                </div>
            </div>
        );
}