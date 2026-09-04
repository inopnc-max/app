import 'server-only';
import {createClient} from '@/core/database/supabase/server';
import type {AccessContext, Permission, Persona, AccountStatus} from './types';

const permissions: Record<Persona, Permission[]> = { admin:['ADMIN_ACCESS','ACCESS_REQUEST_REVIEW','USER_ACCESS_MANAGE','PARTNER_SITE_GRANT_MANAGE'], site_manager:['SITE_VIEW','SITE_COLLABORATE','SITE_MANAGER_HOME_VIEW'], worker:['SITE_VIEW','WORKER_HOME_VIEW'], production_manager:['SITE_VIEW','SITE_COLLABORATE','PRODUCTION_HOME_VIEW'], partner:['SITE_VIEW','PARTNER_HOME_VIEW'] };
export async function resolveAccessContext(userId: string): Promise<AccessContext | null> {
  const client=createClient(); if(!client) return null;
  const {data: profile}=await client.from('profiles').select('id,persona,account_status').eq('id',userId).maybeSingle();
  if(!profile) return null;
  const {data: memberships}=await client.from('organization_memberships').select('organization_id,membership_type,status').eq('profile_id',userId).eq('status','active');
  const {data: direct}=await client.from('site_memberships').select('site_id,access_level,status,sites!inner(id,code,name,status)').eq('profile_id',userId).eq('status','active').eq('sites.status','active');
  const organizations=(memberships??[]).map(m=>({organizationId:m.organization_id,membershipType:m.membership_type,status:m.status}));
  const sites=(direct??[]).map((m)=>{const s=m.sites as unknown as {id:string;code:string;name:string}; return {siteId:s.id,code:s.code,name:s.name,accessLevel:m.access_level};});
  const {data:{session}}=await client.auth.getSession();
  const aal=((session?.user as unknown as {aal?: string} | undefined)?.aal) ?? null;
  return {userId,persona:profile.persona as Persona|null,accountStatus:profile.account_status as AccountStatus,aal,organizations,sites,permissions:profile.persona?permissions[profile.persona as Persona]:[]};
}
export async function resolveCurrentAccessContext(){const client=createClient(); if(!client) return null; const {data:{user}}=await client.auth.getUser(); return user?resolveAccessContext(user.id):null;}
