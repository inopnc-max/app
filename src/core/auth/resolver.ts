import 'server-only';
import {createClient} from '@/core/database/supabase/server';
import type {AccessContext, Persona, AccountStatus, SiteAccess} from './types';
import {resolvePermissions} from './permissions';

async function resolveValidatedAccessContext(client: NonNullable<ReturnType<typeof createClient>>, userId: string): Promise<AccessContext | null> {
  const {data: profile,error: profileError}=await client.from('profiles').select('id,persona,account_status').eq('id',userId).maybeSingle();
  if(profileError) throw new Error('ACCESS_CONTEXT_RESOLUTION_FAILED');
  if(!profile) return null;
  const {data: memberships,error: membershipError}=await client.from('organization_memberships').select('organization_id,membership_type,job_title,status,organizations!inner(id,name,type,status)').eq('profile_id',userId).eq('status','active').eq('organizations.status','active');
  if(membershipError) throw new Error('ACCESS_CONTEXT_RESOLUTION_FAILED');
  const {data: direct,error: directError}= profile.persona==='partner' ? {data:[],error:null} : await client.from('site_memberships').select('site_id,access_level,status,sites!inner(id,code,name,status)').eq('profile_id',userId).eq('status','active').eq('sites.status','active');
  if(directError) throw new Error('ACCESS_CONTEXT_RESOLUTION_FAILED');
  const organizations=(memberships??[]).map(m=>{const o=m.organizations as unknown as {id:string;name:string;type:string}; return {organizationId:m.organization_id,organizationName:o.name,organizationType:o.type,membershipType:m.membership_type,jobTitle:m.job_title,status:m.status};});
  const sites=(direct??[]).map((m)=>{const s=m.sites as unknown as {id:string;code:string;name:string}; return {siteId:s.id,code:s.code,name:s.name,accessLevel:m.access_level as SiteAccess['accessLevel']};});
  if(profile.persona==='partner') { const partnerIds=organizations.filter(o=>o.organizationType==='partner').map(o=>o.organizationId); if(partnerIds.length){ const {data: grants,error: grantError}=await client.from('organization_site_grants').select('site_id,access_level,organizations!inner(id,type,status),sites!inner(id,code,name,status)').in('organization_id',partnerIds).eq('status','active').eq('organizations.status','active').eq('organizations.type','partner').eq('sites.status','active'); if(grantError) throw new Error('ACCESS_CONTEXT_RESOLUTION_FAILED'); for(const g of grants??[]){const s=g.sites as unknown as {id:string;code:string;name:string}; const existing=sites.find(x=>x.siteId===s.id); if(!existing) sites.push({siteId:s.id,code:s.code,name:s.name,accessLevel:g.access_level as SiteAccess['accessLevel']}); else if(existing.accessLevel==='view'&&g.access_level==='collaborate') existing.accessLevel='collaborate';} } }
  const {data: assurance,error: assuranceError}=await client.auth.mfa.getAuthenticatorAssuranceLevel();
  if(assuranceError) return {userId,persona:profile.persona as Persona|null,accountStatus:profile.account_status as AccountStatus,aal:null,organizations,sites,permissions:resolvePermissions({persona:profile.persona as Persona|null,accountStatus:profile.account_status as AccountStatus,aal:null,organizations,siteAccess:sites})};
  const rawAal=assurance?.currentLevel as string | null | undefined; const aal: AccessContext['aal']=rawAal==='aal1'||rawAal==='aal2'?rawAal:null;
  return {userId,persona:profile.persona as Persona|null,accountStatus:profile.account_status as AccountStatus,aal,organizations,sites,permissions:resolvePermissions({persona:profile.persona as Persona|null,accountStatus:profile.account_status as AccountStatus,aal,organizations,siteAccess:sites})};
}
export async function resolveCurrentAccessContext(){const client=createClient(); if(!client) return null; const {data:{user},error}=await client.auth.getUser(); if(error) throw new Error('ACCESS_CONTEXT_RESOLUTION_FAILED'); return user?resolveValidatedAccessContext(client,user.id):null;}
