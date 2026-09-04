import {requirePermission} from '@/core/auth/guards';
export default async function ProductionPage(){await requirePermission('PRODUCTION_HOME_VIEW');return <main><h1>생산</h1></main>}
