export type PaymentIntent = {
    pa: string;
    pn: string;
    am: string;
    tn: string;
};

export function getDevice() {
    if (typeof navigator === "undefined") return "desktop";

    const ua = navigator.userAgent;

    if (/Android/i.test(ua)) return "android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
    return "desktop";
}

export function buildUpiLink(intent: PaymentIntent, type: string, device: string) {
    // 1. Construct the query string without the leading '?'
    const upiParams = `pa=${intent.pa}&pn=${encodeURIComponent(intent.pn)}&am=${intent.am}&tn=${encodeURIComponent(intent.tn)}&cu=INR`;

    if (device === "android" && type !== "generic") {
        const packages: Record<string, string> = {
            gpay: "com.google.android.apps.nbu.paisa.user",
            phonepe: "com.phonepe.app",
            paytm: "net.one97.paytm",
        };
        const pkg = packages[type as keyof typeof packages];

        // REMOVE the '?' from intent://pay? and move it into the params
        // This is the most compatible format for Android Chrome
        return `intent://pay?${upiParams}#Intent;scheme=upi;package=${pkg};S.browser_fallback_url=https://play.google.com/store/apps/details?id=${pkg};end`;
    }

    // 2. For iOS/Fallback, resolveScheme usually ends in '?'
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
