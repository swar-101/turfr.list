type CanUserPayInput = {
    isJoined: boolean;
    isOrganizer: boolean;
    turfConfirmed: boolean;
    participationStatus: string;
    paymentStatus: string;
}

export function canUserPay(input: CanUserPayInput): boolean {
    const {
        isJoined,
        isOrganizer,
        turfConfirmed,
        participationStatus,
        paymentStatus,
    } = input;

    if (!isJoined) return false;
    if (isOrganizer) return false;
    if (!turfConfirmed) return false;
    if (participationStatus !== "active") return false;
    if (paymentStatus !== "pending") return false;

    return true;
}