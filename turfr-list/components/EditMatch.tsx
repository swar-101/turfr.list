"use client";

import {useState} from "react";
import {VENUES } from "@/lib/data/venues";
import {MapPin, ChevronDown, Check} from "lucide-react";
import {useRef, useEffect} from "react";
import { createPortal } from "react-dom";

const formatDisplayDate = (dateStr: string | null) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    // Logic for the ordinal (st, nd, rd, th)
    const suffix = (day: number) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    return `${day}${suffix(day)} ${month}, ${year}`;
};

const formatDisplayTime = (timeStr: string | null) => {
    if (!timeStr) return "--:--";
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayHours = h % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
};

export type EditMatchForm = {
    venue: string; // This will store the VenueId string
    date: string | null;
    startTime: string | null;
    endTime: string | null;
    totalCost: number;
    maxPlayers: number;
    turfConfirmed: boolean;
}

type EditMatchProps = {
    initialData: EditMatchForm;
    onSubmitAction: (data: EditMatchForm) => void;
    onCloseAction: () => void;

    isDropdownOpen: boolean;
    setIsDropdownOpen: (value: boolean) => void;
}

export default function EditMatch({
                                      initialData,
                                      onSubmitAction,
                                      onCloseAction,
                                      isDropdownOpen,
                                      setIsDropdownOpen,
                                  }: EditMatchProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [form, setForm] = useState(initialData);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    // const { isDropdownOpen, setIsDropdownOpen } = props;
    const dropdownRef = useRef<HTMLDivElement | null>(null);



    function handleChange<K extends keyof EditMatchForm>(key: K, value: EditMatchForm[K]) {
        setForm((prev) => ({...prev, [key]: value}));
    }

    function isValid() {
        if (!form.venue || !form.date || !form.startTime || !form.endTime) return false;
        const start = new Date(`${form.date}T${form.startTime}`);
        const end = new Date(`${form.date}T${form.endTime}`);
        if (end <= start) end.setDate(end.getDate() + 1);
        return end > start;
    }

    return (
        <div className="flex flex-col gap-4 p-4 pt-6">

            {/* VENUE ROW */}
{/*            <div*/}
{/*                ref={dropdownRef}*/}
{/*                className="flex items-center gap-3 relative"*/}
{/*            >*/}
{/*                /!* Icon *!/*/}
{/*                <MapPin className="text-zinc-400" size={18} />*/}

{/*                /!* Button *!/*/}
{/*                <button*/}
{/*                    onClick={(e) => {*/}
{/*                        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();*/}

{/*                        setDropdownPos({*/}
{/*                            top: rect.bottom + window.scrollY,*/}
{/*                            left: rect.left + window.scrollX,*/}
{/*                            width: rect.width,*/}
{/*                        });*/}

{/*                        setIsDropdownOpen(!isDropdownOpen);*/}
{/*                    }}*/}
{/*                    className={`flex-1 p-3 border bg-zinc-900 border-white/5 text-white flex items-center justify-between*/}
{/*  ${isDropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"}*/}
{/*`}*/}
{/*  */}

{/*                >*/}
{/*    <span>*/}
{/*      {form.venue*/}
{/*          ? VENUES[form.venue as keyof typeof VENUES].shortName*/}
{/*          : "Select a Turf"}*/}
{/*    </span>*/}
{/*                    <ChevronDown size={18} className="text-zinc-400" />*/}
{/*                </button>*/}

{/*                /!* DROPDOWN *!/*/}
{/*                {mounted && isDropdownOpen &&*/}
{/*                    createPortal(*/}
{/*                        <div*/}
{/*                            className="fixed z-50 bg-zinc-800 border border-zinc-700 border-t-0 rounded-b-xl shadow-lg overflow-hidden"*/}
{/*                            style={{*/}
{/*                                top: dropdownPos.top,*/}
{/*                                left: dropdownPos.left,*/}
{/*                                width: dropdownPos.width,*/}
{/*                            }}*/}
{/*                        >*/}
{/*                            /!* 🔥 HEADER (Selected + Clear) *!/*/}
{/*                            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-700 bg-zinc-800">*/}
{/*                                <span className="text-sm font-medium text-white">*/}
{/*                                  {form.venue*/}
{/*                                      ? VENUES[form.venue as keyof typeof VENUES].shortName*/}
{/*                                      : "No Turf Selected"}*/}
{/*                                </span>*/}

{/*                                {form.venue && (*/}
{/*                                    <button*/}
{/*                                        onClick={() => {*/}
{/*                                            handleChange("venue", "");*/}
{/*                                            setIsDropdownOpen(false);*/}
{/*                                        }}*/}
{/*                                        className="text-xs text-zinc-400 hover:text-zinc-200"*/}
{/*                                    >*/}
{/*                                        Clear*/}
{/*                                    </button>*/}
{/*                                )}*/}
{/*                            </div>*/}

{/*                            /!* 🔹 SCROLLABLE OPTIONS *!/*/}
{/*                            <div*/}
{/*                                style={{*/}
{/*                                    maxHeight: 220,*/}
{/*                                    overflowY: "auto",*/}
{/*                                }}*/}
{/*                            >*/}
{/*                                {Object.entries(VENUES).map(([id, info]) => {*/}
{/*                                    const isSelected = form.venue === id;*/}

{/*                                    return (*/}
{/*                                        <div*/}
{/*                                            key={id}*/}
{/*                                            onClick={() => {*/}
{/*                                                handleChange("venue", id);*/}
{/*                                                setIsDropdownOpen(false);*/}
{/*                                            }}*/}
{/*                                            className={`p-3 text-base cursor-pointer flex items-center justify-between*/}
{/*                                                         ${*/}
{/*                                                            isSelected*/}
{/*                                                        ? "bg-zinc-700 text-white"*/}
{/*                                                        : "text-zinc-300 hover:bg-zinc-700"*/}
{/*                                                }*/}
{/*                                            `}*/}
{/*                                        >*/}
{/*                                            {info.shortName}*/}

{/*                                            {isSelected && (*/}
{/*                                                <Check size={16} className="text-green-400" />*/}
{/*                                            )}*/}
{/*                                        </div>*/}
{/*                                    );*/}
{/*                                })}*/}
{/*                            </div>*/}
{/*                        </div>,*/}
{/*                        document.body*/}
{/*                    )}*/}
{/*            </div>*/}

            <div className="flex items-center gap-3">
                <MapPin className="text-zinc-400" size={18} />


                <div className="flex-1 rounded-xl border border-white/5 overflow-hidden bg-zinc-900 relative z-20">

                    {/* BUTTON */}
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full p-3 text-white flex items-center justify-between"
                    >
                          <span>
                              {
                                  form.venue
                                  ? VENUES[form.venue as keyof typeof VENUES].shortName
                                  : "Select a Turf"
                              }
                          </span>
                        <ChevronDown size={18} className="text-zinc-400" />
                    </button>

                    {/* DROPDOWN */}
                    {isDropdownOpen && (
                        <div className="bg-zinc-800 border-t border-zinc-700">

                            {/* HEADER */}
                            <div className="bg-blue px-3 py-2 border-b border-zinc-700">

                                {/* 🔹 LABEL */}
                                <div className="text-[10px] uppercase tracking-wide text-zinc-500 text-sm mb-1">
                                    Selected Turf
                                </div>

                                {/* 🔹 VALUE + CLEAR */}
                                <div className="flex items-center justify-between">
    <span className="text-white">
      {
          form.venue
              ? VENUES[form.venue as keyof typeof VENUES].shortName
              : "None"
      }
    </span>

                                    {form.venue && (
                                        <button
                                            onClick={() => handleChange("venue", "")}
                                            className="text-xs text-zinc-400 hover:text-zinc-200"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>

                            </div>

                            {/* OPTIONS */}
                            <div className="max-h-56 overflow-y-auto divide-y divide-red-500">
                                { Object.entries(VENUES)
                                    .filter(([id]) => id !== form.venue)
                                    .map(([id, info]) => {
                                    const isSelected = form.venue === id;

                                    return (
                                        <div
                                            key={id}
                                            onClick={() => {
                                                handleChange("venue", id);
                                                 setIsDropdownOpen(false);
                                            }}
                                            className={`w-full border-t p-3 flex justify-between cursor-pointer
                                               ${
                                                    isSelected
                                                        ? "bg-blue-600 text-white"
                                                        : "text-zinc-300 active:bg-zinc-700"
                                               }
                                            `}
                                        >
                                            {info.shortName}
                                            {isSelected && <Check size={16} className="text-green-400" />}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}