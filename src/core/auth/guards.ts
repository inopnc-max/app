import 'server-only';
import {redirect} from 'next/navigation';
import {resolveCurrentAccessContext} from './resolver';
import type {Permission} from './types';
export async function requireAuthenticatedUser(){const c=await resolveCurrentAccessContext();if(!c) redirect('/login');return c;}
export async function requireActiveAccount(){const c=await requireAuthenticatedUser();if(c.accountStatus!=='active') redirect(`/account/${c.accountStatus}`);return c;}
export async function requirePermission(permission: Permission){const c=await requireActiveAccount();if(!c.permissions.includes(permission)) redirect('/');return c;}
export async function requireAdminAal2(){const c=await requireActiveAccount();if(c.persona!=='admin'||c.aal!=='aal2') redirect('/admin/mfa');return c;}
