-- Players table
create table players (
                         id uuid primary key default gen_random_uuid(),
                         google_id text unique,
                         name text,
                         avatar_url text,
                         created_at timestamp default now()
);

alter table players add column name_key text;
alter table players add column device_id text;

alter table players alter column id drop default;
alter table players drop column if exists device_id;
alter table players drop column if exists name_key;

alter table players alter column name set not null;
alter table player add column updated_at text;

-- Matches table
create table matches (
                         id uuid primary key default gen_random_uuid(),
                         title text not null,
                         total_cost integer,
                         price_per_player integer,
                         max_players integer not null,
                         organizer_id uuid references players(id),
                         upi_id text,
                         created_at timestamp default now()
);

alter table matches add column organizer_name text;
alter table matches add column venue text;
alter table matches add column start_time timestamp;
alter table matches add column end_time timestamp;
alter table matches add column turf_confirmed boolean default false;
alter table matches add column short_code text unique;

alter table matches drop column title;

alter table matches add column active_count integer default 0;

-- Participation table
create table participation (
                               id uuid primary key default gen_random_uuid(),
                               match_id uuid references matches(id) on delete cascade,
                               player_id uuid references players(id),
                               payment_status text default 'pending',
                               joined_at timestamp default now(),
                               unique(match_id, player_id)
);

alter table participation add column status text default 'active';
alter table participation add column role text default 'player';
alter table participation alter column player_id set not null;
alter table participation alter column match_id set not null;

alter table participation add constraint check_status
    check (status in ('active', 'waitlist'));

alter table participation add constraint check_payment
    check (payment_status in ('pending', 'paid', 'verified'));

create index idx_participation_match on participation(match_id);