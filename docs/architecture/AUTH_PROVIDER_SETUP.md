# Authentication Provider Setup

Configure Kakao Login in Kakao Developers and Supabase Authentication Providers.

- Enable Kakao Login and configure the REST API key as the client ID.
- Enable the Kakao client secret in Supabase, never in this repository.
- Register the Supabase callback: `https://fdoioaoolkjxvbjlcuxy.supabase.co/auth/v1/callback`.
- Add the deployed application callback `https://<APP_DOMAIN>/auth/callback` and the local callback to Supabase redirect allow lists.
