
export function normalizePaymentStatus(status: string | null | undefined) {
    if (status === "pending") return "pending";
    if (status === "pending_verification") return "pending_verification";
    if (status === "confirmed") return "confirmed";

    return "pending";
}