-- Run once in Supabase SQL Editor. Does not delete existing tables or user data.
create table if not exists public.voice_flow_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.voice_flow_data enable row level security;
drop policy if exists "voice_select_own" on public.voice_flow_data;
create policy "voice_select_own" on public.voice_flow_data for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "voice_insert_own" on public.voice_flow_data;
create policy "voice_insert_own" on public.voice_flow_data for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "voice_update_own" on public.voice_flow_data;
create policy "voice_update_own" on public.voice_flow_data for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('voice-recordings','voice-recordings',false,52428800,array['audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav','audio/x-m4a'])
on conflict (id) do nothing;
drop policy if exists "voice_upload_own" on storage.objects;
create policy "voice_upload_own" on storage.objects for insert to authenticated with check (bucket_id='voice-recordings' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "voice_read_own" on storage.objects;
create policy "voice_read_own" on storage.objects for select to authenticated using (bucket_id='voice-recordings' and (storage.foldername(name))[1]=(select auth.uid())::text);
drop policy if exists "voice_delete_own" on storage.objects;
create policy "voice_delete_own" on storage.objects for delete to authenticated using (bucket_id='voice-recordings' and (storage.foldername(name))[1]=(select auth.uid())::text);
