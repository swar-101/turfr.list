
"use client";

export default function CopyLinkButton() {
    return (
        <button
            className="absolute right-10 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Match link copied!");
            }}
        >
            <span className="material-symbols-outlined">
                share
            </span>
        </button>
    );
}