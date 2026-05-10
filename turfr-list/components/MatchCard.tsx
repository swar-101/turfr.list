"use client";

import { Box } from "@mui/material";
import { MatchView } from "@/lib/types/match";
import { formatMatchTime } from "@/lib/formatters/formatMatchTime";
import { VENUES } from "@/lib/data/venues";

type MatchCardProps = {
    match: MatchView;
    onCloseAction: () => void;
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: 400, lg: 400 },
    boxShadow: 24,
};

export default function MatchCard({ match, onCloseAction }: MatchCardProps) {

    const venue = match.venueId ? VENUES[match.venueId] : null;

    const timeLabel =
        match.startTime && match.endTime
            ? formatMatchTime(match.startTime, match.endTime)
            : "TBD";

    return (
        <Box
            sx={style}
            className="bg-zinc-900 border border-[#515151] rounded-xl p-4 space-y-2"
        >
            {/* CLOSE */}
            <div className="flex justify-end" onClick={onCloseAction}>
        <span className="text-white text-[26px] h-[26px] w-[26px] flex justify-center items-center">
          &times;
        </span>
            </div>

            {/* VENUE */}
            <div className="text-sm text-zinc-400">Venue</div>
            <div className="text-white">{venue?.name ?? "TBD"}</div>

            {/* TIME */}
            <div className="text-sm text-zinc-400 mt-3">Time</div>
            <div className="text-white">{timeLabel}</div>

            {/* TOTAL COST */}
            <div className="text-sm text-zinc-400 mt-3">Total cost</div>
            <div className="text-white">
                {match.totalCost != null ? `₹${match.totalCost}` : "₹-"}
            </div>

            {/* PRICE */}
            <div className="text-sm text-zinc-400 mt-3">Per head</div>
            <div className="text-green-400 font-medium">
                {match.pricePerPlayer != null ? `₹${match.pricePerPlayer}` : "₹-"}
            </div>

            {/* MAX PLAYERS */}
            <div className="text-sm text-zinc-400 mt-3">Max players</div>
            <div className="text-white">{match.maxPlayers}</div>
        </Box>
    );
}