import {describe, it, expect} from "vitest";
import {normalizePlayers} from "@/lib/boundary/normalizePlayers";

describe("normalizePlayers", () => {
    it("returns empty array when input is null", () => {
        const result = normalizePlayers(null);

        expect(result).toEqual([]);
    });

    it("returns empty array when input is undefined", () => {
        const result = normalizePlayers(undefined);

        expect(result).toEqual([]);
    });

    it("returns empty array when input is empty array", () => {
        const result = normalizePlayers([]);

        expect(result).toEqual([]);
    });

    it("maps valid player name correctly", () => {
        const input = [
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                players: {
                    name: "Swar",
                },
            },
        ];

        const result = normalizePlayers(input);

        expect(result).toEqual([
            {
                id: "1",
                status: "active",
                payment_status: null,
                joined_at: "2026-01-01",
                players: {
                    name: "Swar",
                },
                playerName: "Swar",
            },
        ])
    })

    it("returns 'Unknown' when player name is null", () => {
        const input = [
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                players: {
                    name: null,
                },
            },
        ];

        const result = normalizePlayers(input);

        expect(result).toEqual([
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                payment_status: null,
                players: {
                    name: null,
                },
                playerName: "Unknown",
            },
        ]);
    })

    it("returns 'Unknown' when players object is null", () => {
        const input = [{
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                players: null
            },
        ];

        const result = normalizePlayers(input);

        expect(result).toEqual([
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                payment_status: null,
                players: null,
                playerName: "Unknown",
            }
        ])
    })

    it("maps multiple players correctly", () => {
        const input = [
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                players: { name: "Swar" },
            },
            {
                id: "2",
                status: "waitlist",
                joined_at: "2026-01-02",
                players: { name: "Arkan" },
            },
        ];

        const result = normalizePlayers(input);

        expect(result).toEqual([
            {
                id: "1",
                status: "active",
                payment_status: null,
                joined_at: "2026-01-01",
                players: { name: "Swar" },
                playerName: "Swar",
            },
            {
                id: "2",
                status: "waitlist",
                joined_at: "2026-01-02",
                payment_status: null,
                players: { name: "Arkan" },
                playerName: "Arkan",
            },
        ]);
    });

    it("does not mutate input", () => {
        const input = [
            {
                id: "1",
                status: "active",
                joined_at: "2026-01-01",
                players: { name: "Swar" },
            },
        ];

        const original = JSON.parse(JSON.stringify(input));

        normalizePlayers(input);

        expect(input).toEqual(original);
    });
});