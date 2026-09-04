import {requireAdminAal2,requirePermission} from '@/core/auth/guards';import {AppCard} from '@/design-system';
export default async function AccessPage(){await requireAdminAal2();await requirePermission('ACCESS_REQUEST_REVIEW');return <main style={{maxWidth:920,margin:'40px auto',padding:'0 16px'}}><AppCard><h1>파트너 접근 승인</h1><p>대기 중인 요청을 검토합니다.</p></AppCard></main>}
