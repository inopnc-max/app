import {NextResponse} from 'next/server';import {createClient} from '@/core/database/supabase/server';
export async function POST(request:Request){const c=createClient();if(c)await c.auth.signOut();return NextResponse.redirect(new URL('/login',request.url));}
