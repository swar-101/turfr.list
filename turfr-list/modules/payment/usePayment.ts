"use client";

import { useState } from "react";

import {
    PaymentIntent,
    getDevice,
    buildUpiLink,
    resolveScheme,
} from "./payment";

export function usePayment(intent: PaymentIntent) {
    const [isOpening, setIsOpening] = useState(false);

    function pay(type: "gpay" | "phonepe" | "paytm" | "generic") {
        const device = getDevice();
        // UPDATED: Pass type and device to buildUpiLink
        const link = buildUpiLink(intent, type, device);

        console.log("Opening Link:", link); // Debugging tip: check this in console

        setIsOpening(true);
        window.location.href = link;

        setTimeout(() => {
            setIsOpening(false);
        }, 1500);
    }

    return { pay, isOpening };
}