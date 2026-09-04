import type {AccessContext, Permission, Persona, OrganizationMembership, SiteAccess, AuthenticatorAssuranceLevel} from './types';
export function resolvePermissions(input:{persona:Persona|null;accountStatus:AccessContext['accountStatus'];aal:AuthenticatorAssuranceLevel;organizations:OrganizationMembership[];siteAccess:SiteAccess[]}): Permission[] {
  if(input.accountStatus!=='active') return [];
  const hasSites=input.siteAccess.length>0, hasCollaborate=input.siteAccess.some(s=>s.accessLevel==='collaborate');
  const out: Permission[]=[];
  if(hasSites) out.push('SITE_VIEW'); if(hasCollaborate) out.push('SITE_COLLABORATE');
  if(input.persona==='admin' && input.aal==='aal2') out.push('ADMIN_ACCESS','ACCESS_REQUEST_REVIEW','USER_ACCESS_MANAGE','PARTNER_SITE_GRANT_MANAGE');
  if(input.persona==='worker') out.push('WORKER_HOME_VIEW');
  if(input.persona==='site_manager') out.push('SITE_MANAGER_HOME_VIEW');
  if(input.persona==='production_manager') out.push('PRODUCTION_HOME_VIEW');
  if(input.persona==='partner' && hasSites) out.push('PARTNER_HOME_VIEW');
  return out;
}
