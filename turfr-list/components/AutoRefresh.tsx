"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ enabled = true }) {
    const router = useRouter();

    useEffect(() => {
        if (!enabled) return;

        const interval = setInterval(() => {
            router.refresh();

        }, 3000); // refresh every 3s

        return () => clearInterval(interval);
    }, [router, enabled]);

    return null;
}