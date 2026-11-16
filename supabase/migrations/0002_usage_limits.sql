-- VibeTalk English — daily usage limits for paid AI APIs (AI chat, premium TTS).
-- Run after 0001_init.sql. The limits themselves live in src/lib/server/quota.ts.

create table public.usage_counters (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  day        date not null,            -- calendar day in Vietnam time
  kind       text not null check (kind in ('ai_chat', 'tts')),
  used_count integer not null default 0 check (used_count >= 0),
  primary key (user_id, day, kind)
);

alter table public.usage_counters enable row level security;

create policy "usage: read own" on public.usage_counters
  for select to authenticated using (user_id = auth.uid());
revoke insert, update, delete on public.usage_counters from anon, authenticated;

-- Atomically counts one use for the calling user and says whether it is allowed.
-- The caller passes the free / Pro daily limits; Pro status is read from profiles.
create or replace function public.consume_quota(p_kind text, p_free_limit integer, p_pro_limit integer)
returns table (allowed boolean, used integer, quota integer)
language plpgsql security definer set search_path = public as $$
declare
  v_uid   uuid := auth.uid();
  v_day   date := (now() at time zone 'Asia/Ho_Chi_Minh')::date;
  v_limit integer;
  v_used  integer;
begin
  if v_uid is null or p_kind not in ('ai_chat', 'tts') then
    return query select false, 0, 0;
    return;
  end if;

  select case when p.is_pro and coalesce(p.pro_until > now(), false) then p_pro_limit else p_free_limit end
    into v_limit
    from public.profiles p
   where p.id = v_uid;
  if v_limit is null or v_limit <= 0 then
    return query select false, 0, coalesce(v_limit, 0);
    return;
  end if;

  insert into public.usage_counters as u (user_id, day, kind, used_count)
  values (v_uid, v_day, p_kind, 1)
  on conflict (user_id, day, kind)
    do update set used_count = u.used_count + 1
    where u.used_count < v_limit
  returning u.used_count into v_used;

  if v_used is null then
    -- Limit reached: the conditional update matched no row.
    select u.used_count into v_used
      from public.usage_counters u
     where u.user_id = v_uid and u.day = v_day and u.kind = p_kind;
    return query select false, v_used, v_limit;
    return;
  end if;

  return query select true, v_used, v_limit;
end $$;

revoke execute on function public.consume_quota(text, integer, integer) from public, anon;
grant execute on function public.consume_quota(text, integer, integer) to authenticated;
