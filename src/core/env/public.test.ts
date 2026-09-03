import {afterEach, describe, expect, it} from 'vitest';
import {publicEnv} from './public';

const original = {...process.env};
afterEach(() => { process.env = {...original}; });

describe('public Supabase environment', () => {
  it('accepts the project base URL and publishable key', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://fdoioaoolkjxvbjlcuxy.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_test';
    expect(publicEnv()).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: 'https://fdoioaoolkjxvbjlcuxy.supabase.co',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
    });
  });

  it('rejects service-role keys', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://fdoioaoolkjxvbjlcuxy.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'service_role_secret';
    expect(() => publicEnv()).toThrow();
  });
});
