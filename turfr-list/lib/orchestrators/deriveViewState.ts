
export type ViewState = "players" | "payment" | "teams";

type Input = {
    mode: "list" | "payment";
}

export function deriveViewState({ mode }: Input): ViewState {
    if (mode === "payment") return "payment";
    return "players";
}