
export default function MatchCard({ match, onClose } : any) {
    return (
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 space-y-2">
            <div className="text-sm text-zinc-400">
                Venue
            </div>
            <div className="text-white">
                {match.venue || "TBD"}
            </div>

            <div className="text-sm text-zinc-400 mt-3">
                Time
            </div>
            <div className="text-white">
                {match.start_time || "TBD"} - {match.end_time || "TBD"}
            </div>

            <div className="text-sm text-zinc-400 mt-3">
                Per head
            </div>
            <div className="text-green-400 font-medium">
                ₹{match.price_per_player}
            </div>

            <div className="text-white">
                {match.max_players}
            </div>

            <button
                onClick={onClose}
                className="w-full bg-zinc-700 py-2 rounded"
            >
                Close
            </button>

        </div>
    );
}