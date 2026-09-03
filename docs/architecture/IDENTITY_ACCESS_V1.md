# Identity & Access V1

Personas are `admin`, `site_manager`, `worker`, `production_manager`, and `partner`. Persona controls shell/home presentation only; authorization requires an active authenticated user, organization/site membership or grant, permission, and RLS.

Account status: `pending`, `active`, `suspended`, `deactivated`. Only `active` accounts access business data. Partner access is Profile -> OrganizationMembership -> partner Organization -> OrganizationSiteGrant -> Site, with `view` or `collaborate` access levels.

Ordinary users use Kakao through Supabase Auth and invitation/approval. Admin uses email/password with TOTP MFA AAL2; public admin signup is prohibited. Unknown Kakao accounts receive no internal access.

`AccessContext` contains userId, persona, accountStatus, organizations, sites, and permissions. Post-auth destinations are `/admin`, `/site`, `/worker`, `/production`, `/partner`, with pending/suspended holding routes.

Permissions: `ADMIN_ACCESS`, `ACCESS_REQUEST_REVIEW`, `USER_ACCESS_MANAGE`, `PARTNER_SITE_GRANT_MANAGE`, `SITE_VIEW`, `SITE_COLLABORATE`, `WORKER_HOME_VIEW`, `SITE_MANAGER_HOME_VIEW`, `PRODUCTION_HOME_VIEW`, `PARTNER_HOME_VIEW`.

Audit events: `LOGIN_SUCCESS`, `INVITATION_CREATED`, `INVITATION_ACCEPTED`, `PARTNER_ACCESS_REQUESTED`, `PARTNER_ACCESS_APPROVED`, `PARTNER_ACCESS_REJECTED`, `SITE_ACCESS_GRANTED`, `SITE_ACCESS_REVOKED`, `ACCOUNT_SUSPENDED`.
