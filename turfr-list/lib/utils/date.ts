
/**
 * Splits an ISO string back into YYYY-MM-DD and HH:mm for HTML inputs.
 */
export function extractDateTimeParts(iso: string | null) {
    if (!iso) return { date: null, time: null };

    const d = new Date(iso);
    const date = d.toISOString().split("T")[0]; // YYYY-MM-DD
    const time = d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return { date, time };
}

/**
 * Creates ISO strings for start and end times, handling timezone logic
 * and midnight crossovers.
 */
export function formatMatchPayload(date: string, startTime: string, endTime: string) {
    const [year, month, day] = date.split("-").map(Number);

    const createDate = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(":").map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const start = createDate(startTime);
    const end = createDate(endTime);

    // Handle midnight crossover (e.g., 11 PM to 1 AM)
    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    return {
        start_time: start.toISOString(),
        end_time: end.toISOString(),
    };
}