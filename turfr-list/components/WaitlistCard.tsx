"use client";

import { useState } from "react";
import WaitList from "@/components/WaitList";

export default function WaitlistCard({ players }: { players: any[] }) {

    const [open, setOpen] = useState(false);

    return (
        <div className="bg-black/90 backdrop-blur py-2">

            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center text-sm text-zinc-300 px-3 w-full"
            >
                <div className="h-px bg-zinc-800"></div>

                    <span className="font-medium flex-1">
                      Waiting ({players.length})
                    </span>
                    <span
                        className={`material-symbols-outlined text-zinc-500 text-[18px] transition-transform ${
                            open ? "rotate-180" : ""
                        }`}
                    >
                      expand_more
                    </span>
            </button>

            {open && (
                <>

                    <div className="max-h-[40vh] overflow-y-auto pt-1.5">
                        <WaitList players={players} />
                    </div>
                </>
            )}
        </div>
    );
}