# Phase 1C-3 Identity Onboarding

Internal invitations are created server-side with a 32-byte URL-safe token. Only its SHA-256 hash is stored; the raw token is returned once and transported through a short-lived HttpOnly, SameSite=Lax cookie before Kakao callback acceptance.

The callback accepts an invitation atomically for the current `auth.uid()`. It activates only the signed target persona (`worker`, `site_manager`, or `production_manager`), records `invitation.accepted`, and rejects replay, expiry, revocation, or arbitrary-user targeting.

Unknown Kakao users remain pending and submit a validated partner access request. Admin AAL2 approval atomically resolves an active partner organization, creates the organization membership and active `organization_site_grants`, and activates the profile. Partners never receive direct `site_memberships`. Rejection leaves the profile pending and records `access_request.rejected`.

Audit events are immutable and include only safe identifiers: `invitation.created`, `invitation.revoked`, `invitation.accepted`, `access_request.submitted`, `access_request.approved`, and `access_request.rejected`. Tokens, hashes, credentials, QR data, and contact secrets are excluded.
