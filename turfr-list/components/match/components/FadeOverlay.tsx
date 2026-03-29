type Props = {
    position: "top" | "bottom";
};

export default function FadeOverlay({ position } : Props) {
    return (
        <div
            className={`pointer-events-none absolute left-0 right-0 ${
                position === "top"
                    ? "top-0 h-5 bg-gradient-to-b from-black/80 to-transparent"
                    : "bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent"
            }`}
        />
    );
}