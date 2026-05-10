type Props = {
    position: "top" | "bottom";
    highlight?: boolean;
};

export default function FadeOverlay({ position, highlight }: Props) {
    const base = highlight ? "from-black/40" : "from-black/80";

    return (
        <div
            className={`pointer-events-none absolute left-0 right-0 ${
                position === "top"
                    ? `top-0 h-5 bg-gradient-to-b ${base} to-transparent`
                    : `bottom-0 h-6 bg-gradient-to-t ${base} to-transparent`
            }`}
        />
    );
}