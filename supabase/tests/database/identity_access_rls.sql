-- Executed only by `supabase test db` against the local database.
begin;
select plan(4);
select has_table('public','profiles');
select has_table('public','sites');
select has_table('public','access_requests');
select ok((select relrowsecurity from pg_class where oid='public.profiles'::regclass), 'profiles RLS enabled');
select * from finish();
rollback;
