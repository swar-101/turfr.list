"use client";

import { useEffect, useState, RefObject } from "react";

type ScrollIndicators = {
    atTop: boolean;
    atBottom: boolean;
    isScrollable: boolean;
};

export function useScrollIndicators(
    ref: RefObject<HTMLElement | null>,
    trigger?: unknown
): ScrollIndicators {

    const [atTop, setAtTop] = useState(true);
    const [atBottom, setAtBottom] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const check = () => {
            const scrollTop = el.scrollTop;
            const clientHeight = el.clientHeight;
            const scrollHeight = el.scrollHeight;

            setAtTop(scrollTop <= 0);
            setAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
            setIsScrollable(scrollHeight > clientHeight + 1);
        };

        check();

        el.addEventListener("scroll", check);
        return () => el.removeEventListener("scroll", check);
    }, [ref , trigger]);

    return { atTop, atBottom, isScrollable };
}