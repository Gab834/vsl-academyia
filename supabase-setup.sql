-- =============================================
-- Academy.iA — Setup completo do banco de dados
-- Cole tudo isso no SQL Editor do Supabase
-- =============================================

-- TABELA: resources
create table if not exists public.resources (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text not null default '',
  cover_image_url text,
  download_url  text,
  tracks        text[] not null default '{}',
  tags          text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- TABELA: lessons
create table if not exists public.lessons (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  description     text not null default '',
  cover_image_url text,
  video_url       text,
  duration        text,
  track           text not null default '',
  locked          boolean not null default true,
  "order"         integer not null default 0,
  created_at      timestamptz not null default now()
);

-- TABELA: events
create table if not exists public.events (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  cover_image_url text,
  date            text not null,
  time            text,
  type            text not null default 'event' check (type in ('event','class')),
  recording_url   text,
  locked          boolean not null default false,
  created_at      timestamptz not null default now()
);

-- RLS: desabilitar para service_role poder tudo
alter table public.resources enable row level security;
alter table public.lessons   enable row level security;
alter table public.events    enable row level security;

-- Policies: leitura pública
create policy "Leitura pública - resources" on public.resources for select using (true);
create policy "Leitura pública - lessons"   on public.lessons   for select using (true);
create policy "Leitura pública - events"    on public.events    for select using (true);
