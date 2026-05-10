"use client";

import {useMemo, useState} from "react";
import MatchHeader from "@/components/MatchHeader";
import BottomAction from "@/components/match/BottomAction";
import PlayingCard from "@/components/match/PlayingCard";
import WaitingCard from "@/components/match/WaitingCard";
import MatchCard from "@/components/MatchCard";
import PaymentSection from "@/components/PaymentSection";
import {Modal} from "@mui/material";
import {useJoinMatch} from "@/components/match/hooks/useJoinMatch";
import {useIdentity} from "@/components/match/hooks/useIdentity";
import {PlayerView} from "@/lib/types/participation";
import {MatchView} from "@/lib/types/match";
import {formatMatchTime} from "@/lib/formatters/formatMatchTime";
import {VENUES} from "@/lib/data/venues";
import {calculatePrice} from "@/lib/domain/match/calculatePrice";
import {updateMatchAction} from "@/lib/domain/match/updateMatch";
import AutoRefresh from "@/components/AutoRefresh";
import {extractDateTimeParts, formatMatchPayload} from "@/lib/utils/date";
import { debug, debugGroup } from "@/lib/utils/debug";
import EditMatch, {EditMatchForm} from "@/components/EditMatch";

type MatchPageClientProps = {
    match: MatchView;
    players: PlayerView[];
};

export type MatchUIState =
    | "players"
    | "edit"
    | "payment"
    | "info"
    | "teams";

type BottomActionState =
    | "join"
    | "pay"
    | "back"
    | "organizer_manage"
    | "organizer_rejoin"
    | "edit_submit"
    | "idle";

function getInitialView(
    match: MatchView,
    role: "organizer" | "player"
): MatchUIState {
        if (role === "organizer") return "players";
        if (match.state === "CONFIRMED") return "players";

        // future
        // if (match.state === "TEAMING") return "teams";
        return "players";
}

function resolveBottomActionState({
    view,
    isOrganizer,
    isOrganizerInPlayers,
    canJoin,
    canPay,
}: {
    view: MatchUIState;
    isOrganizer: boolean;
    isOrganizerInPlayers: boolean;
    canJoin: boolean;
    canPay: boolean;
}): BottomActionState {

    if (view === "edit") return "edit_submit";

    if (isOrganizer) {
        if (!isOrganizerInPlayers) return "organizer_rejoin";
        return "organizer_manage";
    }

    if (canPay) {
        if (view === "payment") return "back";
        return "pay";
    }

    return "idle";
}

export default function MatchPageClient({
                                            match,
                                            players,
                                        }: MatchPageClientProps) {

    console.log("match", match);
    const playerId = useIdentity();
    const role = playerId === match.organizerId ? "organizer" : "player";


    const [view, setView] = useState<MatchUIState>(() => getInitialView(match, role));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { handleJoin, error, loading } = useJoinMatch(match.id);

    const activePlayers = useMemo(
        () => players.filter(p => p.status === "active"),
        [players]
    );
    const isOrganizerInPlayers = activePlayers.some(p => p.playerId === playerId);


    const waitlistPlayers = useMemo(
        () => players.filter(p => p.status === "waitlist"),
        [players]
    );

    // We use memoization to ensure these UI strings are only
// recalculated if the match object itself changes.
    const displayDetails = useMemo(() => {
        // 1. Resolve Venue
        const venue = match.venueId ? VENUES[match.venueId] : null;

        // 2. Return an object with all our pre-formatted labels
        return {
            timeLabel: match.startTime && match.endTime
                ? formatMatchTime(match.startTime, match.endTime)
                : null,

            venueDisplay: venue?.shortName ?? null,

            venueUrl: venue
                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + " " + venue.address)}`
                : null,

            priceLabel: match.pricePerPlayer != null
                ? `₹${match.pricePerPlayer}`
                : "₹-",
        };
    }, [match]); // <--- This is the "Dependency Array". It only reruns if match changes.

    const isAlreadyJoined = players.some(p => p.playerId === playerId);
    const isInActivePlayers = activePlayers.some(p => p.playerId === playerId);

    if (!playerId) return null;


    console.log("START | END", match.startTime + " " + match.endTime + " ");

    const venue = match.venueId ? VENUES[match.venueId] : null;

    const canJoin =
        !isAlreadyJoined &&
        match.state !== "LIVE" &&
        match.state !== "COMPLETED";

    const canPay =
        isInActivePlayers &&
        match.state === "CONFIRMED";

    const canEdit = role === "organizer" && match.state !== "COMPLETED";

    async function handleUpdateMatch(form: EditMatchForm) {
        const pricePerPlayer = calculatePrice(form.totalCost, form.maxPlayers);

        const {start_time, end_time} = formatMatchPayload(
            form.date!,
            form.startTime!,
            form.endTime!
        );

        const payload = {
            venue: form.venue,
            start_time,
            end_time,
            total_cost: form.totalCost,
            price_per_player: pricePerPlayer,
            max_players: form.maxPlayers,
            turf_confirmed: form.turfConfirmed,
        };

        try {
            await updateMatchAction(match.id, payload);
            setView("players");
        } catch (err) {
            console.error("Update failed", err);
        }
    }


    const startParts = extractDateTimeParts(match.startTime);
    const endParts = extractDateTimeParts(match.endTime);

    const initialData = {
        venue: match.venueId ? VENUES[match.venueId]?.shortName : "",

        date: startParts.date,
        startTime: startParts.time,
        endTime: endParts.time,

        totalCost: match.totalCost ?? 0,
        maxPlayers: match.maxPlayers ?? 0,
        turfConfirmed: match.turfConfirmed ?? false,
    };

    const youPlayer = players.find(p => p.playerId === playerId);
    const otherPlayers = players.filter(p => p.playerId !== playerId);

    const waitlistYou = waitlistPlayers.find(p => p.playerId === playerId);
    const waitlistOthers = waitlistPlayers.filter(p => p.playerId !== playerId);
    const yourIndex = waitlistPlayers.findIndex(p => p.playerId === playerId);

    const isOrganizer = role === "organizer";

    const actionState = resolveBottomActionState({
        view,
        isOrganizer,
        isOrganizerInPlayers,
        canJoin,
        canPay,
    });
    console.log("BottomActionState:", actionState);

    console.log({
        state: match.state,
        startTime: match.startTime,
        endTime: match.endTime,
        role
    });
    console.log("View", view);
    console.log("Can Edit?", canEdit);

    console.log("DEBUG EDIT:", {
        isOrganizer: role === "organizer",
        matchState: match.state,
        playerId,
        organizerId: match.organizerId
    });

    debugGroup("MatchPageClient", () => {
        debug("view", view);
        debug("role", role);

        debug("match.state", match.state);
        debug("playerId", playerId);
        debug("organizerId", match.organizerId);

        debug("isOrganizerInPlayers", isOrganizerInPlayers);
        debug("activePlayers", activePlayers.length);
        debug("waitlistPlayers", waitlistPlayers.length);

        debug("canJoin", canJoin);
        debug("canPay", canPay);
        debug("canEdit", canEdit);
    });

    return (
        <main className="min-h-[100dvh] max-h-[100vh] flex flex-col text-zinc-300">
            <div
                className={`relative flex flex-col flex-1 min-h-0 transition-colors duration-200 ${
                    isDropdownOpen ? "bg-black/90" : "bg-black/70"
                }`}
                style={{
                    backgroundImage: "url('/grass-dark.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* AUTO REFRESH (For state-synchronization) */}
                <AutoRefresh enabled={view !== "edit"}/>
                {isDropdownOpen && (
                    <div
                        className="absolute inset-0 bg-black/50 z-10"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
                {/* HEADER */}
                <MatchHeader
                    timeLabel={displayDetails.timeLabel}
                    venueDisplay={displayDetails.venueDisplay}
                    venueUrl={displayDetails.venueUrl}
                    priceLabel={displayDetails.priceLabel}
                    canEdit={canEdit}
                    onEditAction={() => setView("edit")}
                    onInfoAction={() => setView("info")}
                />

                <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">
                    <div className="w-full max-w-lg mx-auto px-4 flex flex-col pb-[100px]">

                        {/* SCROLL AREA */}
                        {/* Edit View for Organizers only */}
                        {view === "edit" && (
                            <EditMatch
                                initialData={initialData}
                                onSubmitAction={handleUpdateMatch}
                                onCloseAction={() => setView("players")}
                                isDropdownOpen={isDropdownOpen}
                                setIsDropdownOpen={setIsDropdownOpen}
                            />
                        )}

                        {/* Info View for Match Details */}
                        {view === "info" && (
                            <Modal
                                open={["players", "edit", "info"].includes(view)}
                                onClose={() => setView("players")}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <MatchCard match={match}
                                           onCloseAction={() => setView("players")}/>
                            </Modal>
                        )}

                        {view === "players" && (
                            <div className="flex flex-col flex-1 min-h-0 gap-0">
                                {/* Playing */}
                                <PlayingCard
                                    you={youPlayer}
                                    otherPlayers={otherPlayers}
                                    totalPlayers={activePlayers.length}
                                    maxPlayers={match.maxPlayers}
                                />

                                {/* Waitlist */}
                                {waitlistPlayers.length > 0 && (
                                    <div className="flex-shrink-0">
                                        <WaitingCard
                                            you={waitlistYou}
                                            otherPlayers={waitlistOthers}
                                            yourIndex={yourIndex}
                                            totalPlayers={waitlistPlayers.length}
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TODO: Change the hardcoded UPI ID to Organizer's input */}
                        {view === "payment" && (
                            <PaymentSection
                                upiId="swar.kunwar8@okhdfcbank"
                                amount={match.pricePerPlayer ?? 0}
                                onBackAction={() => setView("players")}
                            />
                        )}

                        {view === "teams" && (
                            <>
                                {/* Scaffold for Team List */}
                            </>
                        )}
                    </div>
                </div>

                {/* BOTTOM ACTION */}
                <BottomAction
                    isOrganizer={role === "organizer"}
                    isOrganizerInPlayers={isOrganizerInPlayers}

                    canJoin={canJoin}
                    canPay={canPay}

                    view={view}

                    onJoinAction={(name) =>{
                        if (!name.trim()) return Promise.resolve();
                        return handleJoin({ name });
                    }}

                    onRejoinAction={() => {
                        if (!match.organizerName) return Promise.resolve();
                        return handleJoin({
                            name: match.organizerName,
                            role: "organizer",
                        });
                    }}

                    onPayClickAction={() => setView("payment")}
                    onBackAction={() => setView("players")}

                    joinLoading={loading}
                    joinError={error}
                    priceLabel={displayDetails.priceLabel}
                />

            </div>
        </main>
    );
}