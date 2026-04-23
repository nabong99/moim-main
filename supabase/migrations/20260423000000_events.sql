create table public.events (
  id          text        primary key,
  owner_id    uuid        not null references auth.users(id) on delete cascade,
  title       text        not null,
  description text,
  starts_at   timestamptz not null,
  location    text,
  host_name   text        not null,
  image_url   text,
  created_at  timestamptz not null default now()
);

alter table public.events enable row level security;

-- 누구나 읽기 가능
create policy "public read"
  on public.events for select
  using (true);

-- 로그인한 사용자가 자신의 이벤트 생성
create policy "authenticated insert"
  on public.events for insert
  to authenticated
  with check (owner_id = auth.uid());

-- 소유자만 수정
create policy "owner update"
  on public.events for update
  to authenticated
  using (owner_id = auth.uid());

-- 소유자만 삭제
create policy "owner delete"
  on public.events for delete
  to authenticated
  using (owner_id = auth.uid());
