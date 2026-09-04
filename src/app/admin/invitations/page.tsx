import {requireAdminAal2,requirePermission} from '@/core/auth/guards';import {AppCard} from '@/design-system';
export default async function InvitationsPage(){await requireAdminAal2();await requirePermission('USER_ACCESS_MANAGE');return <main style={{maxWidth:920,margin:'40px auto',padding:'0 16px'}}><AppCard><h1>내부 사용자 초대</h1><p>초대 생성과 철회는 서버 RPC를 통해 처리됩니다.</p></AppCard></main>}
