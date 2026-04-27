export type PaymentIntent = {
    pa: string;      // Mandatory (The UPI ID)
    pn?: string;     // Optional (The Payee Name)
    am?: string;     // Optional (The Amount)
    tn?: string;     // Optional (The Note)
    tr?: string;     // Optional (The Transaction Ref)
};

export function getDevice() {
    if (typeof navigator === "undefined") return "desktop";

    const ua = navigator.userAgent;

    if (/Android/i.test(ua)) return "android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    return "desktop";
}

export function buildUpiLink(intent: PaymentIntent, type: string, device: string) {
    // Only include params that actually have values
    const parts = [
        `pa=${intent.pa}`,
        intent.pn ? `pn=${encodeURIComponent(intent.pn)}` : '',
        intent.am ? `am=${intent.am}` : '',
        intent.tn ? `tn=${encodeURIComponent(intent.tn)}` : '',
        intent.tr ? `tr=${intent.tr}` : '',
        `cu=INR`,
        `mode=02` // Trusted intent flag
    ].filter(Boolean); // Removes the empty strings

    const upiParams = parts.join('&');

    if (device === "android" && type !== "generic") {
        const packages: Record<string, string> = {
            gpay: "com.google.android.apps.nbu.paisa.user",
            phonepe: "com.phonepe.app",
            paytm: "net.one97.paytm",
        };
        const pkg = packages[type as keyof typeof packages];

        return `intent://pay?${upiParams}#Intent;scheme=upi;package=${pkg};S.browser_fallback_url=https://play.google.com/store/apps/details?id=${pkg};end`;
    }

    const scheme = resolveScheme(type, device);
    return `${scheme}${upiParams}`;
}


// export function buildUpiLink(intent: PaymentIntent, scheme: string) {
//     const params = new URLSearchParams({
//         pa: intent.pa,
//         pn: intent.pn,
//         am: intent.am,
//         tn: intent.tn,
//         cu: "INR",
//     });
//
//     return `${scheme}${params.toString()}`;
// }

export function resolveScheme(type: string, device: string) {
    if (device === "ios") {
        if (type === "gpay") return "gpay://upi/pay?";
        if (type === "phonepe") return "phonepe://pay?";
        if (type === "paytm") return "paytmmp://pay?";
        return "upi://pay?";
    }

    // Android Logic: Using the Intent scheme to bypass Chrome's security blocks
    if (device === "android") {
        const pkg = {
            gpay: "com.google.android.apps.nbu.paisa.user",
            phonepe: "com.phonepe.app",
            paytm: "net.one97.paytm",
            generic: "upi://pay" // Fallback
        }[type] || "upi://pay";

        // We return a special flag or the whole prefix
        return `intent://pay?`;
    }

    return "upi://pay?";
}
