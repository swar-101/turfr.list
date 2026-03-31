"use client";

import { useEffect, useState } from "react";

export function useCurrentUser() {
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("turfr_player_name");
        setName(stored);
    }, []);

    return name;
}