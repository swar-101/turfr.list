-- Players table
create table players (
                         id uuid primary key default gen_random_uuid(),
                         google_id text unique,
                         name text,
                         avatar_url text,
                         created_at timestamp default now()
);

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

-- Participation table
create table participation (
                               id uuid primary key default gen_random_uuid(),
                               match_id uuid references matches(id) on delete cascade,
                               player_id uuid references players(id),
                               payment_status text default 'pending',
                               joined_at timestamp default now(),
                               unique(match_id, player_id)
);

alter table participation
    add column status text default 'active';