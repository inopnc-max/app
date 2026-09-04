import type {AccessContext} from './types';
export function resolvePostAuthDestination(context: AccessContext): string {
  if(context.accountStatus==='pending') return '/account/pending';
  if(context.accountStatus==='suspended') return '/account/suspended';
  if(context.accountStatus==='deactivated') return '/account/deactivated';
  if(context.persona==='admin') return context.aal==='aal1'?'/admin/mfa':'/admin';
  return context.persona==='site_manager'?'/site':context.persona==='worker'?'/worker':context.persona==='production_manager'?'/production':context.persona==='partner'?'/partner':'/account/pending';
}
