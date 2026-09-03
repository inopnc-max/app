-- Additive privilege alignment: RLS remains the authorization boundary.
grant select, insert, update, delete on public.invitations, public.audit_events to authenticated;
revoke all on function private.current_profile_active(uuid), private.is_admin_aal2(uuid), private.can_access_site(uuid,uuid), private.can_view_org(uuid,uuid) from public, anon, authenticated;
grant usage on schema private to authenticated;
grant execute on function private.current_profile_active(uuid), private.is_admin_aal2(uuid), private.can_access_site(uuid,uuid), private.can_view_org(uuid,uuid) to authenticated;
