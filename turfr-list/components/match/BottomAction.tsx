"use client";

import {useState} from "react";
import {MatchUIState} from "@/components/MatchPageClient";


type BottomActionProps = {
    isOrganizer: boolean,
    isOrganizerInPlayers: boolean,

    canJoin: boolean;
    canPay: boolean;

    view: MatchUIState;

    onJoinAction: (name: string) => Promise<void>;
    onRejoinAction: () => Promise<void>;

    onPayClickAction: () => void;
    onBackAction: () => void;

    joinLoading?: boolean;
    joinError?: string | null;

    priceLabel?: string;
};

export default function BottomAction({
                                         isOrganizer,
                                         isOrganizerInPlayers,

                                         canJoin,
                                         canPay,
                                         view,

                                         onJoinAction,
                                         onRejoinAction,

                                         onPayClickAction,
                                         onBackAction,

                                         joinLoading,
                                         joinError,
                                         priceLabel,

                                     }: BottomActionProps) {

    const [playerName, setPlayerName] = useState("");

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50">

            {/* Background FX */}
            <div className="absolute inset-0 pointer-events-none backdrop-blur-xl" />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            <div className="relative max-w-md mx-auto p-4 pb-4 mt-4">

                {/* 1. ORGANIZER VIEW (Highest Priority) */}
                {isOrganizer && (
                    <>
                        {!isOrganizerInPlayers && (
                            <button
                                onClick={onRejoinAction}
                                className="text-zinc-400 hover:text-zinc-200 text-sm"
                            >
                                Rejoin Match
                            </button>
                        )}
                        <button
                            onClick={() => {/* Tomorrow's task: open management dashboard */}}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">payments</span>
                            Manage Payments
                        </button>
                    </>
                )}

                {/* 2. JOIN FLOW (If not joined and not organizer) */}
                {!isOrganizer && canJoin && (
                    <div className="flex gap-2">
                        <input
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Your name"
                            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white"
                        />
                        <button
                            onClick={() => onJoinAction(playerName)}
                            disabled={joinLoading || !playerName.trim()}
                            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg"
                        >
                            {joinLoading ? "Joining..." : "Join"}
                        </button>
                    </div>
                )}

                {/* 3. PAY FLOW (If player and needs to pay) */}
                {!isOrganizer && !canJoin && canPay && (
                    <>
                        {view === "players" ? (
                            <button
                                onClick={onPayClickAction}
                                className="w-full bg-green-700 hover:bg-green-600 text-white py-3 rounded-xl font-medium"
                            >
                                {priceLabel || "Pay Now"}
                            </button>
                        ) : (
                            <button
                                onClick={onBackAction}
                                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 rounded-xl font-medium"
                            >
                                Back to List
                            </button>
                        )}
                    </>
                )}

                {/* 4. FALLBACK (If player but nothing to do yet) */}
                {!isOrganizer && !canJoin && !canPay && (
                    <div className="text-center py-2 text-zinc-500 text-sm italic">
                        Waiting for organizer to confirm turf...
                    </div>
                )}

                {joinError && (
                    <p className="text-red-400 text-sm mt-2 text-center">{joinError}</p>
                )}
            </div>
        </div>
    );
}