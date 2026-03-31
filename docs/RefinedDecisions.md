
# Brute Approach

```sql 
-- INSTRUCTIONS: 
-- 1. CONFIGURE VALUES 
-- 2. RUN 'Step 1'  
-- 3. TEST YOUR INTENT 
-- 4. RUN 'Step 2' IMMEDIATELY 

-- Step 1 
-- DE-ACTIVATE waitlist players 
update participation 
set status = 'removed_for_test'
where id in (
  select p.id 
  from participation p 
  join matches m on p.match_id = m.id 
  where m.short_code = 'MARCU'
    and p.status = 'waitlist'
  order by p.joined_at asc 
  limit 6 
);

-- Step 2 
-- RE-ACTIVATE DE-ACTIVATED players 
update participation 
set status = 'waitlist'
where id in (
  select p.id 
  from participation p 
  join matches m on p.match_id = m.id 
    where m.short_code = 'MARCU'
      and p.status = 'removed_for_test'
    order by p.joined_at asc 
    limit 6
);
```

What's bad? 


--- 

# Better Approach

```sql 
-- =====================================================
-- WAITLIST TESTING UTILITY (WINDOW FUNCTION BASED)
-- =====================================================

-- CONFIGURATION
-- Set your values here before running
-- ====================================
-- short_code: match identifier
-- limit_count: number of waitlist players to affect
-- test_status: temporary status used for testing

-- Example:
-- short_code = 'MARCU'
-- limit_count = 6
-- test_status = 'removed_for_test'


-- =====================================================
-- STEP 1: DEACTIVATE FIRST N WAITLIST PLAYERS
-- =====================================================

with ranked_waitlist as (
  select 
    p.id,
    row_number() over (
      partition by p.match_id 
      order by p.joined_at asc
    ) as rn
  from participation p
  join matches m on p.match_id = m.id
  where m.short_code = 'MARCU'
    and p.status = 'waitlist'
)

update participation
set status = 'removed_for_test'
where id in (
  select id 
  from ranked_waitlist 
  where rn <= 6
)
returning id, status;


-- =====================================================
-- STEP 2: REVERT TEST CHANGES
-- =====================================================

update participation
set status = 'waitlist'
where status = 'removed_for_test'
and match_id in (
  select id from matches where short_code = 'MARCU'
)
returning id, status;


-- =====================================================
-- NOTES
-- =====================================================
-- 1. Uses ROW_NUMBER for deterministic selection
-- 2. Partition ensures ranking is per match (not global)
-- 3. Safe to re-run (idempotent revert)
-- 4. No data deletion involved
-- 5. Ideal for UI boundary testing (e.g., waitlist thresholds)
```

