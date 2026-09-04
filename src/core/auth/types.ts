export type Persona = 'admin' | 'site_manager' | 'worker' | 'production_manager' | 'partner';
export type AccountStatus = 'pending' | 'active' | 'suspended' | 'deactivated';
export type Permission = 'ADMIN_ACCESS' | 'ACCESS_REQUEST_REVIEW' | 'USER_ACCESS_MANAGE' | 'PARTNER_SITE_GRANT_MANAGE' | 'SITE_VIEW' | 'SITE_COLLABORATE' | 'WORKER_HOME_VIEW' | 'SITE_MANAGER_HOME_VIEW' | 'PRODUCTION_HOME_VIEW' | 'PARTNER_HOME_VIEW';
export type OrganizationMembership = { organizationId: string; membershipType: string; status: string };
export type SiteAccess = { siteId: string; code: string; name: string; accessLevel: 'view' | 'collaborate' };
export type AccessContext = { userId: string; persona: Persona | null; accountStatus: AccountStatus; aal: string | null; organizations: OrganizationMembership[]; sites: SiteAccess[]; permissions: Permission[] };
