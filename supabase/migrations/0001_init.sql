-- VibeTalk English — initial schema
-- Run once in Supabase Dashboard → SQL Editor (or `supabase db push`).
--
-- Make the first admin AFTER that person has signed up in the app:
--   update public.profiles set role = 'admin'
--   where id = (select id from auth.users where email = 'admin@example.com');


-- ───────────────────────── helpers ─────────────────────────

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ───────────────────────── profiles ─────────────────────────

create table public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  email            text,
  display_name     text not null default 'Học viên VibeTalk' check (char_length(display_name) between 1 and 60),
  avatar           text not null default '👨‍🎓' check (char_length(avatar) <= 16),
  role             text not null default 'user' check (role in ('user', 'admin')),
  is_pro           boolean not null default false,
  pro_plan         text check (pro_plan in ('1_month', '6_months', '1_year', 'lifetime')),
  pro_until        timestamptz,
  xp               integer not null default 100 check (xp >= 0),
  streak_days      integer not null default 1 check (streak_days >= 0),
  last_active_date date,
  migrated_at      timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- Role check used by RLS policies. SECURITY DEFINER so it can read profiles
-- without recursing into the profiles policies.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- ───────────────────────── progress ─────────────────────────

create table public.progress (
  user_id           uuid primary key references public.profiles (id) on delete cascade,
  current_level     text not null default 'lv0' check (current_level in ('lv0', 'lv1', 'lv2', 'lv3')),
  unlocked_levels   text[] not null default '{lv0}',
  completed_lessons text[] not null default '{}',
  saved_lessons     text[] not null default '{}',
  test_results      jsonb not null default '{}'::jsonb,
  updated_at        timestamptz not null default now()
);

create trigger progress_updated_at before update on public.progress
  for each row execute function public.set_updated_at();

-- ───────────────────────── notebook ─────────────────────────

create table public.notebook_entries (
  id       bigint generated always as identity primary key,
  user_id  uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  word_id  text not null,
  word     jsonb not null,
  saved_at timestamptz not null default now(),
  unique (user_id, word_id)
);

-- ───────────────────────── orders ─────────────────────────
-- Orders are created by the server (/api/orders) so the amount always comes
-- from the server-side price list; clients can only read their own orders.

create table public.orders (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  user_id     uuid not null references public.profiles (id) on delete cascade,
  plan_id     text not null check (plan_id in ('1_month', '6_months', '1_year', 'lifetime')),
  plan_name   text not null,
  amount      integer not null check (amount > 0),
  status      text not null default 'pending' check (status in ('pending', 'paid', 'cancelled')),
  paid_via    text check (paid_via in ('admin', 'webhook')),
  payment_ref text,
  created_at  timestamptz not null default now(),
  paid_at     timestamptz
);

create index orders_user_id_idx on public.orders (user_id, created_at desc);
create index orders_status_idx on public.orders (status, created_at desc);

-- ───────────────────────── app_config ─────────────────────────

create table public.app_config (
  key        text primary key,
  value      jsonb not null,
  updated_at timestamptz not null default now()
);

create trigger app_config_updated_at before update on public.app_config
  for each row execute function public.set_updated_at();

insert into public.app_config (key, value) values (
  'bank',
  '{"bankId":"techcombank","bankName":"Techcombank (Ngân hàng Kỹ Thương)","accountNumber":"19036888999018","accountName":"NGUYEN THI KIM ANH","qrTemplate":"compact2"}'::jsonb
);

-- ───────────────────────── signup trigger ─────────────────────────

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, display_name, avatar, last_active_date)
  values (
    new.id,
    new.email,
    coalesce(nullif(left(trim(new.raw_user_meta_data ->> 'display_name'), 60), ''), 'Học viên VibeTalk'),
    coalesce(nullif(left(new.raw_user_meta_data ->> 'avatar', 16), ''), '👨‍🎓'),
    current_date
  );
  insert into public.progress (user_id) values (new.id);
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────────────────── Pro activation ─────────────────────────
-- Only callable with the service-role key (server routes / webhook).

create or replace function public.plan_duration(p_plan text)
returns interval language sql immutable as $$
  select case p_plan
    when '1_month'  then interval '30 days'
    when '6_months' then interval '180 days'
    when '1_year'   then interval '365 days'
    when 'lifetime' then interval '100 years'
  end;
$$;

create or replace function public.grant_pro(p_user_id uuid, p_plan text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.plan_duration(p_plan) is null then
    raise exception 'unknown plan %', p_plan;
  end if;
  update public.profiles
     set is_pro    = true,
         pro_plan  = case when pro_plan = 'lifetime' then 'lifetime' else p_plan end,
         pro_until = greatest(coalesce(pro_until, now()), now()) + public.plan_duration(p_plan)
   where id = p_user_id;
  update public.progress
     set unlocked_levels = '{lv0,lv1,lv2,lv3}'
   where user_id = p_user_id;
end $$;

-- Marks a pending order as paid and grants Pro, atomically.
-- Returns the order row, or nothing if the order was not pending.
create or replace function public.mark_order_paid(p_code text, p_via text, p_ref text default null)
returns setof public.orders language plpgsql security definer set search_path = public as $$
declare
  o public.orders;
begin
  update public.orders
     set status = 'paid', paid_at = now(), paid_via = p_via, payment_ref = p_ref
   where code = p_code and status = 'pending'
  returning * into o;
  if not found then
    return;
  end if;
  perform public.grant_pro(o.user_id, o.plan_id);
  return next o;
end $$;

revoke execute on function public.grant_pro(uuid, text) from public, anon, authenticated;
revoke execute on function public.mark_order_paid(text, text, text) from public, anon, authenticated;

-- ───────────────────────── leaderboard ─────────────────────────
-- Exposes only public fields; never emails or ids.

create or replace function public.get_leaderboard(p_limit integer default 50)
returns table (
  rank integer,
  display_name text,
  avatar text,
  xp integer,
  streak_days integer,
  completed_count integer,
  current_level text,
  is_pro boolean,
  is_me boolean
) language sql stable security definer set search_path = public as $$
  select
    (row_number() over (order by p.xp desc, p.created_at))::integer,
    p.display_name,
    p.avatar,
    p.xp,
    p.streak_days,
    coalesce(cardinality(g.completed_lessons), 0)::integer,
    coalesce(g.current_level, 'lv0'),
    (p.is_pro and coalesce(p.pro_until > now(), false)),
    p.id = auth.uid()
  from public.profiles p
  left join public.progress g on g.user_id = p.id
  order by p.xp desc, p.created_at
  limit least(greatest(p_limit, 1), 200);
$$;

grant execute on function public.get_leaderboard(integer) to anon, authenticated;

-- ───────────────────────── Row Level Security ─────────────────────────

alter table public.profiles         enable row level security;
alter table public.progress         enable row level security;
alter table public.notebook_entries enable row level security;
alter table public.orders           enable row level security;
alter table public.app_config       enable row level security;

-- profiles: read own (admins read all); users may only change harmless columns.
create policy "profiles: read own" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());
create policy "profiles: update own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name, avatar, xp, streak_days, last_active_date, migrated_at)
  on public.profiles to authenticated;

-- progress: own row only (admins read all).
create policy "progress: read own" on public.progress
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
create policy "progress: insert own" on public.progress
  for insert to authenticated with check (user_id = auth.uid());
create policy "progress: update own" on public.progress
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

-- notebook: own rows only.
create policy "notebook: read own" on public.notebook_entries
  for select to authenticated using (user_id = auth.uid());
create policy "notebook: insert own" on public.notebook_entries
  for insert to authenticated with check (user_id = auth.uid());
create policy "notebook: update own" on public.notebook_entries
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "notebook: delete own" on public.notebook_entries
  for delete to authenticated using (user_id = auth.uid());

-- orders: read own (admins read all). No client writes; server uses service role.
create policy "orders: read own" on public.orders
  for select to authenticated using (user_id = auth.uid() or public.is_admin());
revoke insert, update, delete on public.orders from anon, authenticated;

-- app_config: public read, admin write.
create policy "app_config: read all" on public.app_config
  for select to anon, authenticated using (true);
create policy "app_config: admin write" on public.app_config
  for all to authenticated using (public.is_admin()) with check (public.is_admin());
