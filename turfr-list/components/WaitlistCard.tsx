import WaitList from "@/components/WaitList";

export default function WaitlistCard({ players }: { players: any[] }) {
  return (
    <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-xl p-5 shadow-lg">
      <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
        <span className="material-symbols-outlined text-zinc-400">
          hourglass
        </span>
        Waiting ({players.length})
      </h2>

      <div className="h-px bg-zinc-800 my-3"></div>

      <div className="max-h-[40vh] overflow-y-auto">
        <WaitList players={players} />
      </div>
    </div>
  );
}