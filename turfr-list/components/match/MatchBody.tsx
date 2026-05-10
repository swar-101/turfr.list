import {PlayerView} from "@/lib/types/participation";

type MatchBodyProps = {
    match: MatchRow;
    players: PlayerView[];
    mode: "list" | "payment";
    view: "default" | "edit" | "info";
    setMode: (mode: "list" | "payment") => void;
    setView: (view: "default" | "edit" | "info") => void;
}

export function MatchBody() {


    return ();
}