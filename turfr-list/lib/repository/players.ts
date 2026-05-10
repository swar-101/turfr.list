import {supabase} from "@/lib/supabase";

export async function findPlayerByDeviceId(deviceId: string) {
    const { data } = await supabase
        .from("players")
        .select("*")
        .eq("device_id", deviceId)
        .maybeSingle();

    return data;
}

export async function insertPlayer(deviceId: string, name: string, nameKey: string) {
    const { data, error } = await supabase
        .from("players")
        .insert([{ device_id: deviceId, name, name_key: nameKey }])
        .select()
        .single();

    if (error || !data) throw new Error("Player creation failed");

    return data;
}