create or replace function join_match_transaction(
    p_player_id uuid,
    p_name text,
    p_match_id uuid,
    p_role text
)
returns table (
    out_player_id uuid,
    out_status text,
    out_role text
)
language plpgsql
as $$
declare
    v_match record;
    v_existing record;
    v_status text;
    v_inserted boolean := false;
begin
    -- 1. Upsert player: Keep the name fresh!
    insert into players (id, name)
    values (p_player_id, p_name)
    on conflict (id) do update
    set name = EXCLUDED.name,
        updated_at = now();

    -- 2. Lock & Check Match
    select * into v_match from matches where id = p_match_id for update;
    if v_match is null then
       raise exception 'Match not found';
    end if;

    -- 3. Decide status
    if v_match.active_count >= v_match.max_players then
        v_status := 'waitlist';
    else
        v_status := 'active';
    end if;

    -- 4. Insert or catch existing participation
    insert into participation (match_id, player_id, status, role)
    values (p_match_id, p_player_id, v_status, p_role)
    on conflict (match_id, player_id) do nothing
    returning * into v_existing;

    if v_existing is not null then
        v_inserted := true;
    else
        -- Fetch existing if we didn't just insert it
        select * into v_existing
        from participation
        where match_id = p_match_id and player_id = p_player_id;
    end if;

    -- 5. Organizer assignment (Safety first)
    if p_role = 'organizer' then
        update matches
        set organizer_id = p_player_id
        where id = p_match_id and organizer_id is null;
    end if;

    -- 6. Atomic Increment
    if v_inserted and v_status = 'active' then
        update matches
        set active_count = active_count + 1
        where id = p_match_id;
    end if;

    -- 7. Return with explicit mapping
    return query
    select
        v_existing.player_id,
        v_existing.status,
        v_existing.role;
end;
$$;