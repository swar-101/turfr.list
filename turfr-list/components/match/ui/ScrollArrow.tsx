type Props = {
    direction: "up" | "down";
    highlight?: boolean;
    visible?: boolean;
};

export default function ScrollArrow({ direction, highlight, visible }: Props) {
    return (
        <div
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px]
                transition-all duration-200
                ${
                    direction === "up"
                        ? "top-0 -translate-y-[30%]"
                        : "bottom-0 translate-y-[30%]"
                }
                ${highlight ? "text-zinc-950" : "text-zinc-800"}
                ${visible ? "opacity-100" : "opacity-0"}
                animate-[arrow-bounce_1.4s_infinite]
            `}
        >
            <span className="material-symbols-outlined">
                {direction === "up" ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
        </div>
    );
}