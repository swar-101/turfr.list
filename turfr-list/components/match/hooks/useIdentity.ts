"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function useIdentity() {
    const [playerId, setPlayerId] = useState<string | null>(null);

    useEffect(() => {
        let id = localStorage.getItem("player_id");

        if (!id) {
            id = uuidv4();
            localStorage.setItem("player_id", id);
        }

        setPlayerId(id);
    }, []);

    return playerId;
}