import { describe, it, expect } from "vitest";
import { canUserPay } from "@/lib/boundary/canUserPay";

describe("canUserPay", () => {
    const base = {
        isJoined: true,
        isOrganizer: false,
        turfConfirmed: true,
        participationStatus: "active",
        paymentStatus: "pending",
    };

    it("allows payment for valid pending player", () => {
        expect(canUserPay(base)).toBe(true);
    });

    it("blocks if payment already in verification", () => {
        expect(
            canUserPay({ ...base, paymentStatus: "pending_verification" })
        ).toBe(false);
    });

    it("blocks if payment already confirmed", () => {
        expect(
            canUserPay({ ...base, paymentStatus: "confirmed" })
        ).toBe(false);
    });

    it("blocks if player is waitlisted", () => {
        expect(
            canUserPay({ ...base, participationStatus: "waitlist" })
        ).toBe(false);
    });

    it("blocks if turf not confirmed", () => {
        expect(
            canUserPay({ ...base, turfConfirmed: false })
        ).toBe(false);
    });

    it("blocks if organizer", () => {
        expect(
            canUserPay({ ...base, isOrganizer: true })
        ).toBe(false);
    });

    it("blocks if user not joined", () => {
        expect(
            canUserPay({ ...base, isJoined: false })
        ).toBe(false);
    });

    it("allows payment when DB returns null payment_status", () => {
        const nullStatus = {
            isJoined: true,
            isOrganizer: false,
            turfConfirmed: true,
            participationStatus: "active",
            paymentStatus: null,
        };

        expect(
            canUserPay({
                ...nullStatus,
                paymentStatus: "pending",
            })
        ).toBe(true);
    });
});