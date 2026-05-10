export function formatMatchTime(start: string, end: string) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const now = new Date();
    const today = now.toDateString();

    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    let dayLabel = startDate.toLocaleDateString("en-US", { weekday: "short" });

    if (startDate.toDateString() === today) dayLabel = "Today";
    if (startDate.toDateString() === tomorrow.toDateString()) dayLabel = "Tomorrow";


    function formatTime(date: Date) {
        const hour = date.getHours();
        const minute = date.getMinutes();

        const hour12 = hour % 12 || 12;

        // if (minute === 0) return `${hour12}`;
        const minutePart =
            minute === 0 ? "" : `:${minute.toString().padStart(2, "0")}`;

        const ampm = hour >= 12 ? "PM" : "AM";

        return {
            time: `${hour12}${minutePart}`,
            ampm
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