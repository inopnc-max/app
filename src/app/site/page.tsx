import {requirePermission} from '@/core/auth/guards';
export default async function SitePage(){await requirePermission('SITE_MANAGER_HOME_VIEW');return <main><h1>현장</h1></main>}
