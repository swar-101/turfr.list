"use client";

import { useState } from "react";

export default function PlayerNameInput() {
    const [name, setName] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("turfr_player_name") || "";
        }
        return "";
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        localStorage.setItem("turfr_player_name", value);
    };

    return (
        <input
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Your name"
            className="border p-2 rounded"
            required
        />
    );
}