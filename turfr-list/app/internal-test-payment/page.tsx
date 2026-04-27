"use client";

import { PaymentSheet } from "@/modules/payment/TestPaymentSheet";

export default function InternalTestPaymentPage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Internal Payment Testing
            </h1>

            <PaymentSheet />
        </div>
    );
}