import {Database} from "@/types/generated/supabase";

import { updateMatchRepo } from "@/lib/repository/match";

type MatchUpdate = Database["public"]["Tables"]["matches"]["Update"];

export async function updateMatchAction(
    id: string,
    payload: MatchUpdate
) {
    return await updateMatchRepo(id, payload);
}