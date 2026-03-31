"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh() {
    const router = useRouter();

    useEffect(() => {
        const interval = setInterval(() => {
            router.refresh();

        }, 3000); // refresh every 3s
        return () => clearInterval(interval);
    }, [router]);

    return null;
}