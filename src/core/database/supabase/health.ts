import {publicEnv} from '@/core/env/public';
import {createClient} from './server';

export type SupabaseHealth = {
  envValid: boolean;
  clientCreated: boolean;
  endpointReachable: boolean;
};

export async function checkSupabaseHealth(): Promise<SupabaseHealth> {
  let env;
  try { env = publicEnv(); } catch { return {envValid:false, clientCreated:false, endpointReachable:false}; }
  const client = createClient();
  if (!client) return {envValid:true, clientCreated:false, endpointReachable:false};
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/health`, {
      method:'GET', headers:{apikey:env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}, cache:'no-store'
    });
    return {envValid:true, clientCreated:true, endpointReachable:response.status === 200};
  } catch { return {envValid:true, clientCreated:true, endpointReachable:false}; }
}
