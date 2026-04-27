"use client";

import { usePayment } from "./usePayment";
import {useMemo, useState} from "react";

export function PaymentSheet() {
    // Stable intent object: only changes if the component remounts

    // 1. Generate a stable ID that ONLY runs once on mount
    const [transactionId] = useState(() => `TURF${Date.now()}`);

    // 2. Stable intent object using that ID
    const intent = useMemo(() => ({
        pa: "wisehackers07-1@okhdfcbank",
        am: "",
        tr: transactionId,
        tn: "Payment to Tarang",
    }), [transactionId]);

    const { pay, isOpening } = usePayment(intent);

    return (
        <div className="p-4 space-y-4 border rounded-md">
            <h2 className="text-lg font-semibold">
                Pay ₹500 to Organizer
            </h2>

            <div className="space-y-2">
                <button onClick={() => pay("gpay")} className="w-full border p-2">
                    Pay with GPay
                </button>

                <button onClick={() => pay("phonepe")} className="w-full border p-2">
                    Pay with PhonePe
                </button>

                <button onClick={() => pay("paytm")} className="w-full border p-2">
                    Pay with Paytm
                </button>

                <button onClick={() => pay("generic")} className="w-full border p-2">
                    Other UPI Apps
                </button>
            </div>

            {isOpening && (
                <p className="text-sm text-gray-500">
                    Opening your UPI app... If nothing happens, try another option.
                </p>
            )}

            <button className="w-full bg-black text-white p-2">
                I’ve Paid
            </button>

            <p className="text-sm">Status: Not Paid</p>
        </div>
    );
}