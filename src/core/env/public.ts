import {z} from 'zod';
const schema=z.object({
  NEXT_PUBLIC_SUPABASE_URL:z.string().url().refine(value=>/^https:\/\/[^/]+\.supabase\.co$/.test(value),'Supabase URL must be the project base URL'),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:z.string().min(1).refine(value=>!/(service_role|sb_secret|여기에_실제)/i.test(value),'A publishable key is required'),
});
export function publicEnv(){return schema.parse({NEXT_PUBLIC_SUPABASE_URL:process.env.NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY});}
