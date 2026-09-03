# Infrastructure

Supabase and Vercel are intentionally configured through environment variables and Git integration. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in local `.env.local` and Vercel Preview/Production settings. Never expose service-role keys to browser code or commit secret values. The SSR client uses `@supabase/ssr`; the service worker only caches the public shell and explicitly excludes auth, API, query-string, and mutation requests.
