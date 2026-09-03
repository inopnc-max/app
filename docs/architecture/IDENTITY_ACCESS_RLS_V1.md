# Identity & Access RLS V1

All exposed Phase 1 tables have RLS enabled. Policies target `authenticated` only and derive access from memberships and grants, never raw JWT metadata. Profiles default to self-read; admin management is separate. Sites are readable through active site membership or organization grant. Partner access is sourced only from `organization_site_grants`.

Updates use paired `USING` and `WITH CHECK` predicates. Service-role bypass is prohibited in client paths. No `SECURITY DEFINER` functions are required for this draft; any future use requires a separate justification.
