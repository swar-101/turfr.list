
"use client";

export default function CopyLinkButton() {
    return (
        <button
            className="text-sm text-zinc-400 underline"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Match link copied!");
            }}
        >
            <span className="material-symbols-outlined text-zinc-400">
                share
            </span>
        </button>
    );
}