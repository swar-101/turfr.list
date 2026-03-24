"use client";

import { useState } from "react";

export default function PaymentSection({
    upiId,
    amount,
    onBackAction,
} : {
    upiId: string;
    amount: number;
    onBackAction: () => void;
}){
    const [copied, setCopied] = useState(false);

    async function copyUpi() {
        try {
            await navigator.clipboard.writeText(upiId);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (err) {
            console.error("Failed to copy UPI ID", err);
        }
    }

    return (
        <div className="
            mt-6 p-5 rounded-2xl
            bg-zinc-900/60 backdrop-blur-xl
            border border-zinc-700
            shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.9)]
            "
        >
            <button onClick={onBackAction}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white mb-3"
            >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                {/*Back*/}
            </button>

            {/* TODO: Change hardcoded 'Swar' to actual organizer name */}
            <h2 className="mt-2 ml-1 text-lg font-semibold text-zinc-300">
                Pay ₹{amount}
            </h2>

            {/* UPI ID */}
            <div
                onClick={copyUpi}
                className="
                    mt-4 p-4 rounded-xl
                    bg-zinc-800/80 backdrop-blur
                    border border-zinc-700
                    cursor-pointer
                    flex items-center justify-between
                    select-none
                  "
            >
                <div>
                    <p className="text-xs text-zinc-500">UPI ID</p>
                    <p className="font-semibold text-zinc-200 tracking-wide">
                        {upiId}
                    </p>
                    {copied && (
                        <p className="text-green-400 text-xs mt-1">Copied</p>
                    )}
                </div>

                <span className="material-symbols-outlined text-zinc-400">
                    content_copy
                </span>
            </div>

            {/* Steps */}
            <div className="ml-1">
            <div className="mt-5 text-sm text-zinc-300 space-y-1">
                <p>1. Open any UPI app</p>
                <p>2. Pay to the UPI ID above</p>
                <p>3. Tap &#34;I&#39;ve Paid&#34; after payment</p>
            </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                Or scan QR from another device (coming soon)
            </div>
        </div>
    );
}