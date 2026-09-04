import {requirePermission} from '@/core/auth/guards';
export default async function PartnerPage(){await requirePermission('PARTNER_HOME_VIEW');return <main><h1>파트너</h1></main>}
