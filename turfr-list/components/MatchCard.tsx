import { Box } from "@mui/material";

type MatchCardProps = {
  match: any;
  onClose: () => void;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400, lg: 400 },
  boxShadow: 24,
};

export default function MatchCard({ match, onClose }: MatchCardProps) {
  function formatMatchTime(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const now = new Date();
    const today = now.toDateString();

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    let dayLabel = startDate.toLocaleDateString("en-US", { weekday: "short" });

    if (startDate.toDateString() === today) dayLabel = "Today";
    if (startDate.toDateString() === tomorrow.toDateString())
      dayLabel = "Tomorrow";

    function formatTime(date: Date) {
      let hour = date.getHours();
      const minute = date.getMinutes();

      const hour12 = hour % 12 || 12;

      // if (minute === 0) return `${hour12}`;
      const minutePart =
        minute === 0 ? "" : `:${minute.toString().padStart(2, "0")}`;

      const ampm = hour >= 12 ? "PM" : "AM";

      return {
        time: `${hour12}${minutePart}`,
        ampm,
      };
    }

    const startFormatted = formatTime(startDate);
    const endFormatted = formatTime(endDate);

    let timeRange;

    if (startFormatted.ampm === endFormatted.ampm) {
      timeRange = `${startFormatted.time}–${endFormatted.time}${endFormatted.ampm}`;
    } else {
      timeRange = `${startFormatted.time}${startFormatted.ampm}–${endFormatted.time}${endFormatted.ampm}`;
    }

    return `${dayLabel} ${timeRange}`;
  }
  return (
    <Box
      sx={style}
      className="bg-zinc-900 border border-[#515151] rounded-xl p-4 space-y-2"
    >
      <>
        <div className="flex justify-end" onClick={onClose}>
          <span
            aria-hidden="true"
            className="text-white text-[26px] text-[26px] h-[26px] w-[26px] flex justify-center items-center"
          >
            &times;
          </span>
        </div>
      </>
      <>
        <div className="text-sm text-zinc-400">Venue</div>
        <div className="text-white">{match.venue || "TBD"}</div>

        <div className="text-sm text-zinc-400 mt-3">Time</div>
        <div className="text-white">
          {/* {match.start_time || "TBD"} - {match.end_time || "TBD"} */}
          {formatMatchTime(match.start_time, match.end_time) || "TBD"}
        </div>

        <div className="text-sm text-zinc-400 mt-3">Total cost</div>
        <div className="text-white">₹{match.total_cost}</div>

        <div className="text-sm text-zinc-400 mt-3">Per head</div>
        <div className="text-green-400 font-medium">
          ₹{match.price_per_player}
        </div>

        <div className="text-sm text-zinc-400 mt-3">Max players</div>
        <div className="text-white">{match.max_players}</div>

        {/* <button onClick={onClose} className="w-full bg-zinc-700 py-2 rounded">
          Close
        </button> */}
      </>
    </Box>
  );
}
