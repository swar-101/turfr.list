create or replace function leave_match_transaction(
    p_match_id uuid,
    p_player_id uuid
)
returns void

language plpgsql as $$

declare
    v_participation record;
    v_next_player record;
begin
    -- 1. Lock match row
    perform 1 from matches
    where id = p_match_id
    for update;

    -- 2. Get participation
    select * into v_participation
    from participation
    where match_id = p_match_id
      and player_id = p_player_id;

    if not found then
            return; -- idempotent
    end if;

    -- 3. Delete participation
    delete from participation
    where match_id = p_match_id
      and player_id = p_player_id;

    -- 4. If active → decrement + promote
    if v_participation.status = 'active' then

    -- decrement count
    update matches
    set active_count = active_count - 1
    where id = p_match_id;

    -- find next waitlist player (FIFO)
    select * into v_next_player from participation
    where match_id = p_match_id
      and status = 'waitlist'
    order by joined_at asc
    limit 1;

    if found then
        -- promote
        update participation
        set status = 'active'
        where id = v_next_player.id;

        -- increment count again
        update matches
        set active_count = active_count + 1
        where id = p_match_id;
        end if;
    end if;
end;
$$;