# Vercel Preview Infrastructure

- Project: `inopnc-app`
- Project ID: `prj_X9EgX7rHdiK3NL61Xbs0hVh3S8Ld`
- Team/Org ID: `team_XIt6dlEuRqZrlOixFExarip9`
- Repository: `inopnc-max/app`
- Framework: Next.js
- Root directory: repository root
- Preview strategy: `vercel deploy` (manual until GitHub integration is connected)
- Production deployment: prohibited for this phase
- Supabase project ref: `fdoioaoolkjxvbjlcuxy`
- Required environments: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Secrets prohibited: service-role keys, `sb_secret_*`, database passwords
- Rollback: promote a known-good Vercel deployment; do not merge to `main` in this phase

The Preview deployment URL is recorded in the deployment output and is intentionally not treated as a production URL.
